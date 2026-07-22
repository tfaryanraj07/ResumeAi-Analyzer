import { useEffect, useRef } from "react";
import { FaUser, FaCog, FaHistory, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./ProfileDropdown.css";

const ProfileDropdown = ({ open, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!open) return null;

  return (
    <div className="profile-dropdown" ref={dropdownRef}>
      <div className="profile-header">
        <div className="profile-avatar">
          {user?.name?.charAt(0).toUpperCase()}
        </div>

        <div>
          <h4>{user?.name}</h4>
          <p>{user?.email}</p>
        </div>
      </div>

      <div className="dropdown-divider" />

      <button onClick={() => navigate("/profile")}>
        <FaUser />
        Profile
      </button>

      <button onClick={() => navigate("/upload")}>
        <FaHistory />
        Resume History
      </button>

      <button onClick={() => navigate("/profile")}>
        <FaCog />
        Settings
      </button>

      <button onClick={handleLogout}>
        <FaSignOutAlt />
        Logout
      </button>
    </div>
  );
};

export default ProfileDropdown;