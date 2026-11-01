import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Code,
    Target,
    Brain,
    NotebookPen,
    GraduationCap,
    Building2
} from "lucide-react";

const menuItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Coding Questions", path: "/questions", icon: Code },
    { name: "Daily Goals", path: "/goals", icon: Target },
    { name: "Aptitude Tracker", path: "/aptitude", icon: Brain },
    { name: "Interview Notes", path: "/notes", icon: NotebookPen },
    { name: "Companies", path: "/companies", icon: Building2 },
];

function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="brand">
                <div className="brand-icon">
                    <GraduationCap size={25} />
                </div>
                <div>
                    <h2>PrepTrack</h2>
                    <span>Placement Preparation</span>
                </div>
            </div>

            <p className="menu-heading">MENU</p>

            <nav className="sidebar-menu">
                {menuItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === "/"}
                            className={({ isActive }) =>
                                isActive ? "menu-link active" : "menu-link"
                            }
                        >
                            <Icon size={19} />
                            <span>{item.name}</span>
                        </NavLink>
                    );
                })}
            </nav>

            <div className="sidebar-footer">
                <p>Your Placement Journey</p>
                <strong>Starts Here.</strong>
            </div>
        </aside>
    );
}

export default Sidebar;