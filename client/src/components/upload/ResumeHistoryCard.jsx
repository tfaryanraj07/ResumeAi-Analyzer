import {
  FileText,
  Eye,
  Trash2,
  Calendar,
  BarChart3,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ResumeHistoryCard = ({
  resume,
  onDelete,
}) => {
  const navigate = useNavigate();

  const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
  const fileURL = `${apiBase}/resumes/${resume._id}/file`;

  const handleViewAnalysis = () => {
    navigate(`/analysis/${resume._id}`, {
      state: {
        analysis: resume.analysis,
        resume: resume,
      },
    });
  };

  const atsScore = resume.analysis?.atsScore;

  return (
    <motion.div
      className="history-card"
      whileHover={{
        y: -4,
        transition: {
          duration: 0.2,
        },
      }}
    >
      <div className="history-top">
        <div className="history-icon">
          <FileText size={28} />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <h3
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            title={resume.originalName}
          >
            {resume.originalName}
          </h3>

          <div
            className="history-date"
            style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "4px" }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <Calendar size={14} />
              {new Date(resume.createdAt).toLocaleDateString()}
            </span>

            {typeof atsScore === "number" && (
              <span
                style={{
                  background:
                    atsScore >= 75
                      ? "rgba(16, 185, 129, 0.15)"
                      : atsScore >= 50
                      ? "rgba(245, 158, 11, 0.15)"
                      : "rgba(239, 68, 68, 0.15)",
                  color:
                    atsScore >= 75 ? "#10b981" : atsScore >= 50 ? "#f59e0b" : "#ef4444",
                  padding: "2px 8px",
                  borderRadius: "12px",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                ATS {atsScore}%
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="history-actions" style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <button
          type="button"
          className="view-btn"
          onClick={handleViewAnalysis}
          style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px" }}
          title="View full AI Analysis & Score"
        >
          <BarChart3 size={16} />
          Analysis
        </button>

        <a
          href={fileURL}
          target="_blank"
          rel="noreferrer"
          className="view-btn"
          style={{
            background: "rgba(255, 255, 255, 0.08)",
            color: "#e2e8f0",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
          }}
          title="Open uploaded PDF in new tab"
        >
          <ExternalLink size={15} />
          PDF
        </a>

        <button
          type="button"
          className="delete-btn"
          onClick={() => onDelete(resume)}
          style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
          title="Delete Resume"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default ResumeHistoryCard;