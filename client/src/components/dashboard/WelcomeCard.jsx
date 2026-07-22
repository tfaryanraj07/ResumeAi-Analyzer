import { Link } from "react-router-dom";
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

import "./Dashboard.css";

const WelcomeCard = ({ user }) => {
  return (
    <section className="welcome-card">

      {/* Left */}

      <div className="welcome-left">

        <div className="welcome-badge">
          <Sparkles size={16} />
          AI Resume Analyzer
        </div>

        <h1>
          Welcome back,
          <span> {user?.name || "User"} 👋</span>
        </h1>

        <p className="welcome-description">
          Get an ATS score, discover missing skills, and receive AI-powered feedback in seconds.
        </p>

        <div className="feature-list">

          <div className="feature-item">
            <CheckCircle2 size={18} />
            ATS Score Analysis
          </div>

          <div className="feature-item">
            <CheckCircle2 size={18} />
            Missing Skills Detection
          </div>

          <div className="feature-item">
            <CheckCircle2 size={18} />
            AI Resume Suggestions
          </div>

          <div className="feature-item">
            <CheckCircle2 size={18} />
            Interview Questions
          </div>

        </div>

        <Link
          to="/upload"
          className="welcome-btn"
        >
          Upload Resume

          <ArrowRight size={18} />
        </Link>

      </div>

      {/* Right */}

      <div className="welcome-right">

        <div className="hero-glow"></div>

        <div className="hero-circle hero-circle-1"></div>

        <div className="hero-circle hero-circle-2"></div>

      </div>

    </section>
  );
};

export default WelcomeCard;