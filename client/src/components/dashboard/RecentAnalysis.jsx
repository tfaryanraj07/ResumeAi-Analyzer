import { FileText, ArrowRight, CheckCircle2, BarChart2 } from "lucide-react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const RecentAnalysis = ({ resumes }) => {
  return (
    <section className="recent-section">
      <div className="section-header">
        <h2>Recent Analyses</h2>

        <Link to="/upload" className="view-all-link">
          View All <ArrowRight size={16} />
        </Link>
      </div>

      <div className="recent-grid">
        {resumes.length === 0 ? (
          <div className="empty-card">
            <FileText size={40} />
            <h3>No Resume Found</h3>
            <p>Upload your first resume to start analyzing it with AI.</p>
            <Link to="/upload" className="btn btn-primary" style={{ marginTop: "12px" }}>
              Upload Resume
            </Link>
          </div>
        ) : (
          resumes.slice(0, 3).map((resume) => {
            const score = resume.analysis?.atsScore ?? resume.atsScore;
            return (
              <div key={resume._id} className="resume-card">
                <div className="resume-top">
                  <div className="resume-icon">
                    <FileText size={24} />
                  </div>

                  <span
                    className="resume-score"
                    style={{
                      background:
                        score >= 75
                          ? "rgba(16, 185, 129, 0.15)"
                          : score >= 50
                          ? "rgba(245, 158, 11, 0.15)"
                          : "rgba(239, 68, 68, 0.15)",
                      color:
                        score >= 75 ? "#10b981" : score >= 50 ? "#f59e0b" : "#ef4444",
                    }}
                  >
                    ATS {score !== undefined && score !== null ? `${score}%` : "--"}
                  </span>
                </div>

                <h3 title={resume.originalName}>{resume.originalName}</h3>

                <p>{new Date(resume.createdAt).toLocaleDateString()}</p>

                <div className="resume-status">
                  <CheckCircle2 size={16} />
                  Analysis Completed
                </div>

                <Link
                  to={`/analysis/${resume._id}`}
                  state={{ analysis: resume.analysis, resume }}
                  className="view-analysis"
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <BarChart2 size={16} />
                  <span>View Analysis</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default RecentAnalysis;