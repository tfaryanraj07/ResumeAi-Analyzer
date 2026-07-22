import { FileText, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const RecentAnalysis = ({ resumes }) => {
  return (
    <section className="recent-section">

      <div className="section-header">
        <h2>Recent Analyses</h2>

        <Link to="/upload">
          View All
        </Link>
      </div>

      <div className="recent-grid">

        {resumes.length === 0 ? (

          <div className="empty-card">

            <FileText size={40} />

            <h3>No Resume Found</h3>

            <p>
              Upload your first resume to start
              analyzing it with AI.
            </p>

          </div>

        ) : (

          resumes.slice(0, 3).map((resume) => (

            <div
              key={resume._id}
              className="resume-card"
            >

              <div className="resume-top">

                <div className="resume-icon">
                  <FileText size={24} />
                </div>

                <span className="resume-score">
                  ATS {resume.atsScore || "--"}%
                </span>

              </div>

              <h3>
                {resume.originalName}
              </h3>

              <p>
                {new Date(
                  resume.createdAt
                ).toLocaleDateString()}
              </p>

              <div className="resume-status">

                <CheckCircle2 size={18} />

                Analysis Completed

              </div>

              <Link
                to={`/resume/${resume._id}`}
                className="view-analysis"
              >

                {/* <Link to="/upload">
          View Analysis
        </Link> */}

                {/* <ArrowRight size={18} /> */}

              </Link>

            </div>

          ))

        )}

      </div>

    </section>
  );
};

export default RecentAnalysis;