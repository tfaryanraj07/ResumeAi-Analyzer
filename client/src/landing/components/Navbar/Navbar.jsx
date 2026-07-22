import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
import {
  Menu,
  X,
  ChevronDown,
  User,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

import useAuth from "../../../hooks/useAuth";
import AuthModal from "../Auth/AuthModal";

import "./Navbar.css";

const resumeTools = [
  {
    title: "ATS Resume Checker",
    description: "Check ATS compatibility instantly",
    path: "/upload",
  },
  {
    title: "Resume Analyzer",
    description: "AI feedback on your resume",
    path: "/upload",
  },
  {
    title: "Resume Parser",
    description: "Extract resume information",
    path: "/upload",
  },
];

const moreTools = [
  {
    title: "Interview Preparation",
    description: "Practice technical interviews",
    path: "/dashboard",
  },
  {
    title: "Resume History",
    description: "View previous resume scans",
    path: "/dashboard",
  },
  {
    title: "Profile",
    description: "Manage your account",
    path: "/profile",
  },
];

// const Dropdown = ({ title, items }) => {
//   const [open, setOpen] = useState(false);
//   const ref = useRef(null);

//   useEffect(() => {
//     const close = (e) => {
//       if (!ref.current?.contains(e.target)) {
//         setOpen(false);
//       }
//     };

//     document.addEventListener("click", close);

//     return () => document.removeEventListener("click", close);
//   }, []);

//   return (
//     <div
//       className="nav-dropdown"
//       ref={ref}
//       onMouseEnter={() => setOpen(true)}
//       onMouseLeave={() => setOpen(false)}
//     >
//       <button className="nav-link dropdown-btn">
//         {title}
//         <ChevronDown
//           size={16}
//           className={open ? "rotate" : ""}
//         />
//       </button>

//       {open && (
//         <div className="dropdown-menu">
//           {items.map((item) => (
//             <Link
//               key={item.title}
//               to={item.path}
//               className="dropdown-item"
//             >
//               {item.title}
//             </Link>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

const Navbar = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [authMode, setAuthMode] = useState("login");

  const [scrolled, setScrolled] = useState(false);

  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener(
      "scroll",
      handleScroll
    );
  }, []);

  const openLogin = () => {
    setAuthMode("login");
    setShowModal(true);
  };

  const openRegister = () => {
    setAuthMode("register");
    setShowModal(true);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <header
        className={`navbar ${
          scrolled ? "navbar-scroll" : ""
        }`}
      >
        <div className="navbar-container">

          <Link to="/" className="logo">
            <span className="logo-circle">
              AI
            </span>

            <div>
              <h3>ResumeAI</h3>
              <p>ATS Resume Scanner</p>
            </div>
          </Link>

          <nav className="desktop-nav">

            <Dropdown
              title="Resume Tools"
              items={resumeTools}
            />

            <Dropdown
              title="More Tools"
              items={moreTools}
            />

            <a href="#pricing" className="nav-link">
  Pricing
</a>

<a href="#testimonials" className="nav-link">
  Testimonials
</a>

          </nav>

          <div className="desktop-actions">

            {!user ? (
              <>
                <button
                  className="login-btn"
                  onClick={openLogin}
                >
                  Sign In
                </button>

                <button
                  className="primary-btn"
                  onClick={openRegister}
                >
                  Get Started
                </button>
              </>
            ) : (
              <div
                className="profile"
                onMouseLeave={() =>
                  setProfileOpen(false)
                }
              >
                <button
                  className="profile-btn"
                  onClick={() =>
                    setProfileOpen(
                      !profileOpen
                    )
                  }
                >
                  <User size={18} />

                  {user.name}
                </button>

                {profileOpen && (
                  <div className="profile-menu">

                    <Link
                      to="/dashboard"
                      className="profile-item"
                    >
                      <LayoutDashboard
                        size={16}
                      />

                      Dashboard
                    </Link>

                    <Link
                      to="/profile"
                      className="profile-item"
                    >
                      <User size={16} />

                      Profile
                    </Link>

                    <button
                      className="profile-item logout"
                      onClick={handleLogout}
                    >
                      <LogOut size={16} />

                      Logout
                    </button>

                  </div>
                )}
              </div>
            )}

          </div>

          <button
            className="mobile-menu-btn"
            onClick={() =>
              setMobileOpen(!mobileOpen)
            }
          >
            {mobileOpen ? (
              <X />
            ) : (
              <Menu />
            )}
          </button>

        </div>

        {mobileOpen && (
          <div className="mobile-menu">

            <Link
              to="/"
              onClick={() =>
                setMobileOpen(false)
              }
            >
              Home
            </Link>

            <Link
              to="/upload"
              onClick={() =>
                setMobileOpen(false)
              }
            >
              ATS Checker
            </Link>

            <Link
              to="/dashboard"
              onClick={() =>
                setMobileOpen(false)
              }
            >
              Dashboard
            </Link>

            {!user ? (
              <>
                <button
                  onClick={openLogin}
                >
                  Sign In
                </button>

                <button
                  onClick={openRegister}
                >
                  Get Started
                </button>
              </>
            ) : (
              <button
                onClick={handleLogout}
              >
                Logout
              </button>
            )}

          </div>
        )}
      </header>

      {showModal && (
        <AuthModal
          mode={authMode}
          onClose={() =>
            setShowModal(false)
          }
        />
      )}
    </>
  );
};

export default Navbar;