import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Companies from "./pages/Companies";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Questions from "./pages/Questions";
import Goals from "./pages/Goals";
import Aptitude from "./pages/Aptitude";
import Notes from "./pages/Notes";

const ProtectedLayout = ({ children }) => {
    const { user } = useAuth();

    if (!user) return <Navigate to="/login" replace />;

    return (
        <div className="app-layout">
            <Sidebar />
            <div className="main-area">
                <Navbar />
                <main className="page-content">{children}</main>
            </div>
        </div>
    );
};

function App() {
    const { user } = useAuth();

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
                <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
                <Route path="/forgot-password" element={user ? <Navigate to="/" /> : <ForgotPassword />} />
                <Route path="/" element={<ProtectedLayout><Dashboard /></ProtectedLayout>} />
                <Route path="/companies" element={<ProtectedLayout><Companies /></ProtectedLayout>} />
                <Route path="/questions" element={<ProtectedLayout><Questions /></ProtectedLayout>} />
                <Route path="/goals" element={<ProtectedLayout><Goals /></ProtectedLayout>} />
                <Route path="/aptitude" element={<ProtectedLayout><Aptitude /></ProtectedLayout>} />
                <Route path="/notes" element={<ProtectedLayout><Notes /></ProtectedLayout>} />
                <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
