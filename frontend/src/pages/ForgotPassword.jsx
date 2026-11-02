import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, GraduationCap, Mail, Lock, ShieldCheck, RefreshCw } from "lucide-react";
import api from "../services/api";

function ForgotPassword() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [step, setStep] = useState(1);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [resendCooldown, setResendCooldown] = useState(0);

    useEffect(() => {
        if (resendCooldown <= 0) return;
        const timer = setInterval(() => {
            setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, [resendCooldown]);

    const handleSendOtp = async (e) => {
        if (e) e.preventDefault();
        setError("");
        setMessage("");

        const trimmedEmail = email.trim().toLowerCase();
        if (!trimmedEmail) {
            setError("Please enter your email address.");
            return;
        }

        setLoading(true);

        try {
            const response = await api.post("/auth/forgot-password", { email: trimmedEmail });
            setMessage(response.data.message || "A 6-digit OTP has been sent to your email.");
            setStep(2);
            setResendCooldown(60);
        } catch (err) {
            const backendError = err.response?.data?.message;
            if (backendError) {
                setError(backendError);
            } else if (err.code === "ERR_NETWORK") {
                setError("Network error: Unable to reach the server. Please check your internet or try again.");
            } else {
                setError("Could not send OTP. Please check your email address and try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        const trimmedOtp = otp.trim();

        if (trimmedOtp.length !== 6) {
            setError("Please enter a valid 6-digit OTP.");
            return;
        }

        if (newPassword.length < 6) {
            setError("Password must contain at least 6 characters.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            const response = await api.post("/auth/reset-password", {
                email: email.trim().toLowerCase(),
                otp: trimmedOtp,
                newPassword
            });
            setMessage(response.data.message || "Password reset successful! Redirecting to login...");
            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } catch (err) {
            setError(err.response?.data?.message || "Could not reset password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-left">
                <div className="auth-brand">
                    <GraduationCap size={34} />
                    <h2>PrepTrack</h2>
                </div>
                <div className="auth-message">
                    <span className="eyebrow">ACCOUNT RECOVERY</span>
                    <h1>Get back to<br />your goals.</h1>
                    <p>Verify your email address and create a new password securely.</p>
                </div>
                <div className="auth-bottom">
                    <span>Learn. Practice. Track. Succeed.</span>
                </div>
            </div>

            <div className="auth-right">
                <div className="auth-card">
                    <span className="auth-small-title">FORGOT PASSWORD</span>
                    <h1>{step === 1 ? "Reset your password" : "Verify OTP"}</h1>
                    <p className="auth-description">
                        {step === 1
                            ? "Enter your registered email. We will send you a 6-digit OTP."
                            : `Enter the 6-digit OTP sent to ${email} and choose a new password.`}
                    </p>

                    {message && <div className="success-message">{message}</div>}
                    {error && <div className="error-message">{error}</div>}

                    {step === 1 ? (
                        <form onSubmit={handleSendOtp}>
                            <label>Email Address</label>
                            <div className="input-wrapper">
                                <Mail size={18} />
                                <input
                                    type="email"
                                    placeholder="Enter your registered email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoFocus
                                />
                            </div>
                            <button className="auth-submit" disabled={loading}>
                                {loading ? "Sending OTP..." : "Send OTP"}
                                <ArrowRight size={18} />
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleResetPassword}>
                            <div className="password-label-row">
                                <label>6-Digit OTP</label>
                                <button
                                    type="button"
                                    className="text-action"
                                    disabled={resendCooldown > 0 || loading}
                                    onClick={() => handleSendOtp()}
                                    style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
                                >
                                    <RefreshCw size={12} />
                                    {resendCooldown > 0 ? `Resend OTP (${resendCooldown}s)` : "Resend OTP"}
                                </button>
                            </div>
                            <div className="input-wrapper">
                                <ShieldCheck size={18} />
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]{6}"
                                    maxLength={6}
                                    placeholder="Enter 6-digit OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                                    required
                                    autoFocus
                                />
                            </div>

                            <label>New Password</label>
                            <div className="input-wrapper">
                                <Lock size={18} />
                                <input
                                    type="password"
                                    placeholder="Minimum 6 characters"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <label>Confirm New Password</label>
                            <div className="input-wrapper">
                                <Lock size={18} />
                                <input
                                    type="password"
                                    placeholder="Re-enter new password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <button className="auth-submit" disabled={loading}>
                                {loading ? "Resetting password..." : "Reset Password"}
                                <ArrowRight size={18} />
                            </button>
                            <button
                                type="button"
                                className="text-action"
                                onClick={() => {
                                    setStep(1);
                                    setOtp("");
                                    setNewPassword("");
                                    setConfirmPassword("");
                                    setMessage("");
                                    setError("");
                                }}
                            >
                                Use a different email
                            </button>
                        </form>
                    )}

                    <p className="auth-switch">
                        <Link to="/login"><ArrowLeft size={13} /> Back to Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
