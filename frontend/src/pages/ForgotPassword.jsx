import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, GraduationCap, Mail, Lock, ShieldCheck } from "lucide-react";
import api from "../services/api";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [step, setStep] = useState(1);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");
        setLoading(true);

        try {
            const response = await api.post("/auth/forgot-password", { email });
            setMessage(response.data.message);
            setStep(2);
        } catch (err) {
            setError(err.response?.data?.message || "Could not send OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

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
                email,
                otp,
                newPassword
            });
            setMessage(response.data.message);
            setTimeout(() => {
                window.location.href = "/login";
            }, 1800);
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
                                />
                            </div>
                            <button className="auth-submit" disabled={loading}>
                                {loading ? "Sending OTP..." : "Send OTP"}
                                <ArrowRight size={18} />
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleResetPassword}>
                            <label>6-Digit OTP</label>
                            <div className="input-wrapper">
                                <ShieldCheck size={18} />
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]{6}"
                                    maxLength={6}
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                                    required
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
