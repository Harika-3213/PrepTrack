import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { GraduationCap, Mail, Lock, ArrowRight } from "lucide-react";

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await login(email, password);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed. Try again.");
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
                    <span className="eyebrow">YOUR FUTURE STARTS HERE</span>
                    <h1>Prepare smarter.<br />Achieve bigger.</h1>
                    <p>Organize your placement preparation, track your progress and move closer to your dream career.</p>
                </div>

                <div className="auth-bottom">
                    <span>Learn. Practice. Track. Succeed.</span>
                </div>
            </div>

            <div className="auth-right">
                <div className="auth-card">
                    <span className="auth-small-title">WELCOME BACK</span>
                    <h1>Login to your account</h1>
                    <p className="auth-description">Continue your placement preparation journey.</p>

                    {error && <div className="error-message">{error}</div>}

                    <form onSubmit={handleSubmit}>
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
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button className="auth-submit" disabled={loading}>
                            {loading ? "Logging in..." : "Login to PrepTrack"}
                            <ArrowRight size={18} />
                        </button>
                    </form>

                    <p className="auth-switch">
                        Don't have an account? <Link to="/register">Create Account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;