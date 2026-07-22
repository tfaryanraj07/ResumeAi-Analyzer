import { FileText, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";

const AnalysisHeader = ({ resumeName }) => {
  const navigate = useNavigate();

  return (
    <div className="analysis-header-card">
      <div className="analysis-header-left">
        <h1>Resume Analysis</h1>

        <div className="resume-info">
          <div className="resume-name">
            <FileText size={18} />
            <span>{resumeName}</span>
          </div>

          <div className="resume-status">
            <CheckCircle size={16} />
            Successfully analyzed with AI
          </div>
        </div>
      </div>

      <Button onClick={() => navigate("/upload")}>
        Analyze Another Resume
      </Button>
    </div>
  );
};

export default AnalysisHeader;