import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { GraduationCap, User, Mail, Lock, ArrowRight } from "lucide-react";

function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (password.length < 6) {
            setError("Password must contain at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            await register(name, email, password);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Try again.");
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
                    <span className="eyebrow">BUILD YOUR CAREER</span>
                    <h1>Every small step<br />counts towards success.</h1>
                    <p>Create your account and start tracking your placement preparation in one place.</p>
                </div>

                <div className="auth-bottom">
                    <span>Learn. Practice. Track. Succeed.</span>
                </div>
            </div>

            <div className="auth-right">
                <div className="auth-card">
                    <span className="auth-small-title">GET STARTED</span>
                    <h1>Create your account</h1>
                    <p className="auth-description">Join PrepTrack and organize your preparation.</p>

                    {error && <div className="error-message">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <label>Full Name</label>
                        <div className="input-wrapper">
                            <User size={18} />
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <label>Email Address</label>
                        <div className="input-wrapper">
                            <Mail size={18} />
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <label>Password</label>
                        <div className="input-wrapper">
                            <Lock size={18} />
                            <input
                                type="password"
                                placeholder="Minimum 6 characters"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <label>Confirm Password</label>
                        <div className="input-wrapper">
                            <Lock size={18} />
                            <input
                                type="password"
                                placeholder="Re-enter your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button className="auth-submit" disabled={loading}>
                            {loading ? "Creating account..." : "Create Account"}
                            <ArrowRight size={18} />
                        </button>
                    </form>

                    <p className="auth-switch">
                        Already registered? <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;