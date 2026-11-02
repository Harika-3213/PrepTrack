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
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
        return null;
    }

    return nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT),
        secure: Number(SMTP_PORT) === 465,
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS
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

        if (!email) {
            return res.status(400).json({ message: "Please enter your email address" });
        }

        const transporter = createMailTransporter();

        if (!transporter || !process.env.SMTP_FROM) {
            return res.status(503).json({
                message: "Email service is not configured yet. Please try again later."
            });
        }

        const user = await User.findOne({ email });

        // Use the same response for unknown accounts to avoid revealing registered emails.
        if (!user) {
            return res.json({
                message: "If an account exists for this email, a password reset OTP has been sent."
            });
        }

        if (user.resetOtpRequestedAt &&
            Date.now() - user.resetOtpRequestedAt.getTime() < 60 * 1000) {
            return res.status(429).json({
                message: "Please wait 60 seconds before requesting another OTP."
            });
        }

        const otp = crypto.randomInt(100000, 1000000).toString();
        user.resetOtpHash = await bcrypt.hash(otp, 10);
        user.resetOtpExpires = new Date(Date.now() + 10 * 60 * 1000);
        user.resetOtpAttempts = 0;
        user.resetOtpRequestedAt = new Date();
        await user.save();

        try {
            await transporter.sendMail({
                from: process.env.SMTP_FROM,
                to: user.email,
                subject: "Your PrepTrack password reset OTP",
                text: `Hello ${user.name},\n\nYour PrepTrack password reset OTP is: ${otp}\n\nThis OTP expires in 10 minutes. Do not share it with anyone.\n\nIf you did not request this, you can ignore this email.\n\nPrepTrack Team`,
                html: `<div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;padding:24px;color:#24324a"><h2 style="color:#3157d5">PrepTrack</h2><p>Hello ${user.name},</p><p>Use this one-time password to reset your PrepTrack account:</p><div style="font-size:30px;font-weight:bold;letter-spacing:8px;background:#f1f4ff;padding:18px;text-align:center;border-radius:8px">${otp}</div><p>This OTP expires in <strong>10 minutes</strong>. Do not share it with anyone.</p><p>If you did not request this, you can ignore this email.</p><p>PrepTrack Team</p></div>`
            });
        } catch (mailError) {
            user.resetOtpHash = undefined;
            user.resetOtpExpires = undefined;
            user.resetOtpAttempts = 0;
            user.resetOtpRequestedAt = undefined;
            await user.save();
            console.error("Password reset email error:", mailError);
            return res.status(502).json({
                message: "Could not send the OTP email. Please try again later."
            });
        }

        return res.json({
            message: "If an account exists for this email, a password reset OTP has been sent."
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

        const user = await User.findOne({ email });

        if (!user || !user.resetOtpHash || !user.resetOtpExpires) {
            return res.status(400).json({ message: "OTP is invalid or expired. Please request a new one." });
        }

        if (user.resetOtpExpires.getTime() < Date.now()) {
            user.resetOtpHash = undefined;
            user.resetOtpExpires = undefined;
            user.resetOtpAttempts = 0;
            await user.save();
            return res.status(400).json({ message: "OTP has expired. Please request a new one." });
        }

        if (user.resetOtpAttempts >= 5) {
            user.resetOtpHash = undefined;
            user.resetOtpExpires = undefined;
            user.resetOtpAttempts = 0;
            await user.save();
            return res.status(429).json({ message: "Too many incorrect attempts. Please request a new OTP." });
        }

        const isOtpValid = await bcrypt.compare(otp, user.resetOtpHash);

        if (!isOtpValid) {
            user.resetOtpAttempts += 1;
            await user.save();
            return res.status(400).json({ message: "Incorrect OTP. Please check and try again." });
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
