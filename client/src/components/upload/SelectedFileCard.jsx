import {
  FileText,
  CheckCircle2,
  X,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

const SelectedFileCard = ({
  file,
  onRemove,
  onAnalyze,
  uploading,
}) => {
  if (!file) return null;

  return (
    <motion.div
      className="selected-file-card"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="selected-file-left">

        <div className="file-icon">
          <FileText size={34} />
        </div>

        <div className="file-details">

          <h3>{file.name}</h3>

          <p>
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>

          <div className="ready-status">
            <CheckCircle2 size={16} />
            Ready for AI Analysis
          </div>

        </div>

      </div>

      <div className="selected-actions">

        <button
          className="remove-btn"
          onClick={onRemove}
          disabled={uploading}
        >
          <X size={18} />
          Remove
        </button>

        <button
          className="analyze-btn"
          onClick={onAnalyze}
          disabled={uploading}
        >
          <Sparkles size={18} />

          {uploading
            ? "Analyzing..."
            : "Analyze Resume"}
        </button>

      </div>
    </motion.div>
  );
};

export default SelectedFileCard;