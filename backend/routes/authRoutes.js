const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

const createMailTransporter = () => {
    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 465;
    const user = process.env.SMTP_USER || process.env.EMAIL_USER;
    const pass = process.env.SMTP_PASS || process.env.EMAIL_PASS || process.env.SMTP_PASSWORD;
    const service = process.env.SMTP_SERVICE || process.env.EMAIL_SERVICE;

    if (!user || !pass) {
        return null;
    }

    if (service) {
        return nodemailer.createTransport({
            service,
            auth: { user, pass }
        });
    }

    if (!host) {
        // If no explicit host, auto-detect Gmail if user address is @gmail.com
        if (user.endsWith("@gmail.com")) {
            return nodemailer.createTransport({
                service: "gmail",
                auth: { user, pass }
            });
        }
        return null;
    }

    return nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
        tls: {
            rejectUnauthorized: false
        }
    });
};

// REGISTER
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must contain at least 6 characters" });
        }

        const normalizedEmail = email.trim().toLowerCase();
        const existingUser = await User.findOne({ email: normalizedEmail });

        if (existingUser) {
            return res.status(409).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword
        });

        res.status(201).json({
            message: "Registration successful",
            token: generateToken(user._id),
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Registration failed" });
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            email: (email || "").trim().toLowerCase()
        });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password || "", user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        res.json({
            message: "Login successful",
            token: generateToken(user._id),
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Login failed" });
    }
});

// SEND PASSWORD RESET OTP
router.post("/forgot-password", async (req, res) => {
    try {
        const email = (req.body.email || "").trim().toLowerCase();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            return res.status(400).json({ message: "Please enter a valid email address" });
        }

        const transporter = createMailTransporter();
        const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;

        if (!transporter) {
            console.error("Password reset error: SMTP credentials missing (SMTP_USER/SMTP_PASS).");
            return res.status(503).json({
                message: "Email service is not configured on the server. Please check SMTP settings."
            });
        }

        const user = await User.findOne({ email }).select("+resetOtpHash +resetOtpExpires +resetOtpAttempts +resetOtpRequestedAt");

        if (!user) {
            return res.status(404).json({
                message: "No account found with this email address. Please register first."
            });
        }

        if (user.resetOtpRequestedAt) {
            const elapsedMs = Date.now() - user.resetOtpRequestedAt.getTime();
            if (elapsedMs < 60 * 1000) {
                const waitSeconds = Math.ceil((60 * 1000 - elapsedMs) / 1000);
                return res.status(429).json({
                    message: `Please wait ${waitSeconds} seconds before requesting another OTP.`
                });
            }
        }

        const otp = crypto.randomInt(100000, 1000000).toString();
        user.resetOtpHash = await bcrypt.hash(otp, 10);
        user.resetOtpExpires = new Date(Date.now() + 10 * 60 * 1000);
        user.resetOtpAttempts = 0;
        user.resetOtpRequestedAt = new Date();
        await user.save();

        const sender = process.env.SMTP_FROM || `PrepTrack <${smtpUser}>`;

        try {
            await transporter.sendMail({
                from: sender,
                to: user.email,
                subject: "Your PrepTrack password reset OTP",
                text: `Hello ${user.name},\n\nYour PrepTrack password reset OTP is: ${otp}\n\nThis OTP expires in 10 minutes. Do not share it with anyone.\n\nIf you did not request this, you can ignore this email.\n\nPrepTrack Team`,
                html: `
                    <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;padding:24px;color:#24324a;border:1px solid #e0e6ef;border-radius:12px;">
                        <h2 style="color:#3157d5;margin-top:0;">PrepTrack</h2>
                        <p>Hello <strong>${user.name}</strong>,</p>
                        <p>We received a request to reset your password. Use the following 6-digit One-Time Password (OTP) to proceed:</p>
                        <div style="font-size:32px;font-weight:bold;letter-spacing:8px;background:#f1f4ff;color:#3157d5;padding:18px;text-align:center;border-radius:8px;margin:20px 0;">
                            ${otp}
                        </div>
                        <p style="font-size:13px;color:#667085;">This OTP is valid for <strong>10 minutes</strong>. Do not share this OTP with anyone.</p>
                        <p style="font-size:13px;color:#667085;">If you did not request this, you can ignore this email.</p>
                        <hr style="border:none;border-top:1px solid #edf0f5;margin:20px 0;" />
                        <p style="font-size:12px;color:#98a2b3;margin-bottom:0;">PrepTrack Team &bull; Learn. Practice. Track. Succeed.</p>
                    </div>
                `
            });
        } catch (mailError) {
            user.resetOtpHash = undefined;
            user.resetOtpExpires = undefined;
            user.resetOtpAttempts = 0;
            user.resetOtpRequestedAt = undefined;
            await user.save();

            console.error("Password reset email error:", mailError);
            let message = "Could not deliver the OTP email. Please try again later.";
            if (mailError.code === "EAUTH") {
                message = "Email authentication failed. Please verify SMTP credentials.";
            } else if (mailError.code === "ESOCKET" || mailError.code === "ETIMEDOUT") {
                message = "Connection to email server timed out. Please check SMTP host/port.";
            }

            return res.status(502).json({ message });
        }

        return res.json({
            message: "A 6-digit OTP has been sent to your email address."
        });
    } catch (error) {
        console.error("Forgot password error:", error);
        res.status(500).json({ message: "Could not process password reset request" });
    }
});

// VERIFY OTP AND RESET PASSWORD
router.post("/reset-password", async (req, res) => {
    try {
        const email = (req.body.email || "").trim().toLowerCase();
        const otp = (req.body.otp || "").trim();
        const newPassword = req.body.newPassword || "";

        if (!email || !otp || !newPassword) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        if (!/^\d{6}$/.test(otp)) {
            return res.status(400).json({ message: "Enter a valid 6-digit OTP" });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ message: "Password must contain at least 6 characters" });
        }

        const user = await User.findOne({ email }).select("+resetOtpHash +resetOtpExpires +resetOtpAttempts +resetOtpRequestedAt");

        if (!user || !user.resetOtpHash || !user.resetOtpExpires) {
            return res.status(400).json({ message: "No active OTP request found. Please request a new OTP." });
        }

        if (user.resetOtpExpires.getTime() < Date.now()) {
            user.resetOtpHash = undefined;
            user.resetOtpExpires = undefined;
            user.resetOtpAttempts = 0;
            user.resetOtpRequestedAt = undefined;
            await user.save();
            return res.status(400).json({ message: "OTP has expired. Please request a new one." });
        }

        if (user.resetOtpAttempts >= 5) {
            user.resetOtpHash = undefined;
            user.resetOtpExpires = undefined;
            user.resetOtpAttempts = 0;
            user.resetOtpRequestedAt = undefined;
            await user.save();
            return res.status(429).json({ message: "Too many incorrect attempts. Please request a new OTP." });
        }

        const isOtpValid = await bcrypt.compare(otp, user.resetOtpHash);

        if (!isOtpValid) {
            user.resetOtpAttempts += 1;
            await user.save();
            const remaining = 5 - user.resetOtpAttempts;
            return res.status(400).json({
                message: remaining > 0
                    ? `Incorrect OTP. ${remaining} attempt${remaining === 1 ? "" : "s"} remaining.`
                    : "Incorrect OTP. Maximum attempts exceeded. Please request a new OTP."
            });
        }

        user.password = await bcrypt.hash(newPassword, 12);
        user.resetOtpHash = undefined;
        user.resetOtpExpires = undefined;
        user.resetOtpAttempts = 0;
        user.resetOtpRequestedAt = undefined;
        await user.save();

        return res.json({ message: "Password reset successful. Please log in with your new password." });
    } catch (error) {
        console.error("Reset password error:", error);
        res.status(500).json({ message: "Could not reset password" });
    }
});

// GET LOGGED-IN USER
router.get("/me", authMiddleware, (req, res) => {
    res.json({ user: req.user });
});

module.exports = router;
