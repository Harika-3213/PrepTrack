import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <header className="navbar">
            <div>
                <h3>Welcome back, {user?.name}!</h3>
                <p>Let's make today productive.</p>
            </div>

            <button className="logout-btn" onClick={handleLogout}>
                <LogOut size={17} />
                Logout
            </button>
        </header>
    );
}

export default Navbar;