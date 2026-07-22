import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileSearch,
  BarChart3,
  Crown,
  User,
  Settings,
  LogOut,
  Sparkles,
} from "lucide-react";

import useAuth from "../../hooks/useAuth";
import "./Sidebar.css";

const menuItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    title: "Analyze Resume",
    path: "/upload",
    icon: <FileSearch size={20} />,
  },
  {
    title: "Analytics",
    path: "/dashboard", // Change later when Analytics page is ready
    icon: <BarChart3 size={20} />,
  },
  {
    title: "Premium",
    path: "/dashboard", // Change later when Premium page is ready
    icon: <Crown size={20} />,
  },
];

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
        />
      )}

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        {/* Logo */}

        <div className="logo">
          <div className="sidebar-user">

    <div className="user-avatar">

        {user?.name?.charAt(0).toUpperCase()}

    </div>

    <div>

        <h4>{user?.name}</h4>

        <span>Free Plan</span>

    </div>

</div>
          <div className="logo-icon">
            <Sparkles size={22} />
          </div>

          {/* <div className="logo-text">
            Resume
            <span className="gradient">AI</span>
          </div> */}
        </div>

        {/* Navigation */}

        <div className="sidebar-links">
          {menuItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                isActive
                  ? "sidebar-link active"
                  : "sidebar-link"
              }
            >
              {item.icon}

              <span>{item.title}</span>
            </NavLink>
          ))}
        </div>

        {/* Storage Card */}

        <div className="storage-card">
          <h4>✨ Free Plan</h4>

          <div className="progress">
            <div className="progress-fill"></div>
          </div>

          <p>2 / 5 Analyses Remaining</p>

          <button
            className="upgrade-btn"
            disabled
          >
            Upgrade to Pro →
          </button>
        </div>

        {/* Footer */}

        <div className="sidebar-footer">
          <NavLink
            to="/profile"
            onClick={onClose}
            className="sidebar-link"
          >
            <User size={20} />
            <span>Profile</span>
          </NavLink>

          <NavLink
            to="/profile"
            onClick={onClose}
            className="sidebar-link"
          >
            <Settings size={20} />
            <span>Settings</span>
          </NavLink>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;