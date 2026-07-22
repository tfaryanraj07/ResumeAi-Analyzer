import { UploadCloud, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const UploadCard = () => {
  return (
    <section className="upload-card">

      <div className="upload-content">

        <div className="upload-icon">
          <UploadCloud size={42} />
        </div>

        <div className="upload-text">

          <span className="upload-badge">
            Resume Analysis
          </span>

          <h2>Upload Your Resume</h2>

          <p>
            Upload your latest resume and receive an AI-powered ATS
            score, keyword analysis, improvement suggestions and
            interview questions in seconds.
          </p>

          <div className="upload-info">
            PDF Only • Maximum 5 MB
          </div>

        </div>

      </div>

      <Link
        to="/upload"
        className="upload-action"
      >
        Start Analysis

        <ArrowRight size={20} />
      </Link>

    </section>
  );
};

export default UploadCard;