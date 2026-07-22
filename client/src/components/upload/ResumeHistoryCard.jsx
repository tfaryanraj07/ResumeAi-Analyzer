import {
  FileText,
  Eye,
  Trash2,
  Calendar,
} from "lucide-react";

import { motion } from "framer-motion";

const ResumeHistoryCard = ({
  resume,
  onDelete,
}) => {
  const viewURL = `${
    import.meta.env.VITE_API_BASE_URL.replace(
      "/api",
      ""
    )
  }${resume.filePath}`;

  return (
    <motion.div
      className="history-card"
      whileHover={{
        y: -6,
        transition: {
          duration: .2
        }
      }}
    >
      <div className="history-top">

        <div className="history-icon">
          <FileText size={32} />
        </div>

        <div>

          <h3>
            {resume.originalName}
          </h3>

          <div className="history-date">

            <Calendar size={15} />

            {new Date(
              resume.createdAt
            ).toLocaleDateString()}

          </div>

        </div>

      </div>

      <div className="history-actions">

        <a
          href={viewURL}
          target="_blank"
          rel="noreferrer"
          className="view-btn"
        >
          <Eye size={17} />
          View
        </a>

        <button
          className="delete-btn"
          onClick={() =>
            onDelete(resume)
          }
        >
          <Trash2 size={17} />
          Delete
        </button>

      </div>

    </motion.div>
  );
};

export default ResumeHistoryCard;