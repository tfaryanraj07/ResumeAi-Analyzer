import { useEffect, useState } from "react";
import { X, Eye, EyeOff, Loader2 } from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import "./Auth.css";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const AuthModal = ({ mode = "login", onClose }) => {
  const { login, register } = useAuth();
  
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(mode === "login");

  const [formData, setFormData] = useState(initialState);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    setIsLogin(mode === "login");
  }, [mode]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKey);

    const previousOverflow = document.body.style.overflow;

document.body.style.overflow = "hidden";

return () => {
  document.removeEventListener("keydown", handleKey);
  document.body.style.overflow = previousOverflow;
};
  }, [onClose]);

  const handleChange = (e) => {
    setError("");

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    if (!formData.email.trim())
      return "Email is required.";

    if (!formData.password.trim())
      return "Password is required.";

    if (!isLogin) {
      if (!formData.name.trim())
        return "Name is required.";

      if (formData.password.length < 6)
        return "Password must contain at least 6 characters.";

      if (
        formData.password !==
        formData.confirmPassword
      )
        return "Passwords do not match.";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      if (isLogin) {
        await login({
          email: formData.email,
          password: formData.password,
        });
      } else {
        await register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
      }

      onClose();
      navigate("/dashboard");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div
        className="auth-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="close-btn"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <h2>
          {isLogin
            ? "Welcome Back 👋"
            : "Create Your Account"}
        </h2>

        <p className="subtitle">
          {isLogin
            ? "Login to continue your resume journey."
            : "Start improving your ATS score today."}
        </p>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label>Full Name</label>

              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <div className="password-box">
              <input
                type={
                  showPassword ? "text" : "password"
                }
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />

              <button
                type="button"
                className="eye-btn"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div className="form-group">
              <label>Confirm Password</label>

              <div className="password-box">
                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  className="eye-btn"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="auth-submit-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2
                  size={18}
                  className="spin"
                />
                Please wait...
              </>
            ) : isLogin ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="switch-auth">
          {isLogin ? (
            <>
              Don't have an account?
              <button
                type="button"
                onClick={() => {
                  setError("");
                  setFormData(initialState);
                  setIsLogin(false);
                }}
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?
              <button
                type="button"
                onClick={() => {
                  setError("");
                  setFormData(initialState);
                  setIsLogin(true);
                }}
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;