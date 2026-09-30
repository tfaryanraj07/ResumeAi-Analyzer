import "./../assets/analysis.css";
import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate, Link } from "react-router-dom";
import { getResumeById } from "../services/resumeService";
import StatsCards from "../components/analysis/StatsCards";
import AnalysisHeader from "../components/analysis/AnalysisHeader";
import ATSGauge from "../components/analysis/ATSGauge";
import SummaryCard from "../components/analysis/SummaryCard";
import SkillsCard from "../components/analysis/SkillsCard";
import StrengthsCard from "../components/analysis/StrengthsCard";
import WeaknessesCard from "../components/analysis/WeaknessesCard";
import SuggestionsCard from "../components/analysis/SuggestionsCard";
import InterviewQuestions from "../components/analysis/InterviewQuestions";
import Loader from "../components/Loader";
import { ArrowLeft, AlertCircle } from "lucide-react";

const AnalysisResult = () => {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  const [analysis, setAnalysis] = useState(location.state?.analysis || null);
  const [resume, setResume] = useState(location.state?.resume || null);
  const [loading, setLoading] = useState(!location.state?.analysis && !!params.id);
  const [error, setError] = useState("");

  const resumeId = params.id;

  useEffect(() => {
    // If analysis is already provided via navigation state, do nothing
    if (analysis) return;

    // If an ID is in URL, fetch it from backend
    if (resumeId) {
      const fetchResume = async () => {
        setLoading(true);
        try {
          const data = await getResumeById(resumeId);
          setResume(data.resume);
          setAnalysis(data.analysis || data.resume?.analysis);
        } catch (err) {
          console.error("Error loading resume analysis:", err);
          setError(
            err.response?.data?.message ||
              "Could not load the resume analysis. The record may not exist or has been deleted."
          );
        } finally {
          setLoading(false);
        }
      };

      fetchResume();
    }
  }, [resumeId, analysis]);

  if (loading) {
    return (
      <div className="analysis-page" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Loader />
      </div>
    );
  }

  if (error || (!analysis && !resumeId)) {
    return (
      <div className="analysis-page">
        <div
          className="analysis-container"
          style={{
            maxWidth: "600px",
            margin: "80px auto",
            textAlign: "center",
            background: "var(--card, #151e2e)",
            padding: "40px",
            borderRadius: "16px",
            border: "1px solid var(--border, #1e293b)",
          }}
        >
          <AlertCircle size={48} color="#ef4444" style={{ margin: "0 auto 16px" }} />
          <h2 style={{ color: "#fff", marginBottom: "12px" }}>Analysis Not Available</h2>
          <p style={{ color: "#94a3b8", marginBottom: "24px", lineHeight: "1.6" }}>
            {error || "No analysis data found for this session. Please select a resume from your history or upload a new one."}
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
            <Link to="/dashboard" className="btn btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <ArrowLeft size={16} /> Back to Dashboard
            </Link>
            <Link to="/upload" className="btn btn-secondary">
              Upload Resume
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="analysis-page">
      <div className="analysis-container">
        <AnalysisHeader resumeName={resume?.originalName} />

        <StatsCards analysis={analysis} />

        <div className="analysis-grid">
          <ATSGauge score={analysis.atsScore} />

          <SummaryCard summary={analysis.summary} />

          <SkillsCard
            skills={analysis.skills}
            missingSkills={analysis.missingSkills}
          />

          <StrengthsCard strengths={analysis.strengths} />

          <WeaknessesCard weaknesses={analysis.weaknesses} />

          <SuggestionsCard suggestions={analysis.suggestions} />
        </div>

        <InterviewQuestions questions={analysis.interviewQuestions} />
      </div>
    </div>
  );
};

export default AnalysisResult;