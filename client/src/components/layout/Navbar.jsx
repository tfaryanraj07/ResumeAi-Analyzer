import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import useAuth from "../../hooks/useAuth";
import ProfileDropdown from "./ProfileDropdown";

import "./Navbar.css";

const Navbar = ({ onMenuClick }) => {

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="top-navbar">

      <div className="navbar-left">

        <button
          className="menu-btn"
          onClick={onMenuClick}
        >
          <FaBars />
        </button>

        <h2 className="brand">
          Resume<span>AI</span>
        </h2>

      </div>

      <div className="navbar-right">

        <div
          className="avatar"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {user?.name?.charAt(0).toUpperCase()}
        </div>

        <ProfileDropdown
          open={dropdownOpen}
          onClose={() => setDropdownOpen(false)}
        />

      </div>

    </header>
  );
};

export default Navbar;