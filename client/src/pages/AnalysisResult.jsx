import "./../assets/analysis.css";

import { useLocation, Navigate } from "react-router-dom";
import StatsCards from "../components/analysis/StatsCards";
import AnalysisHeader from "../components/analysis/AnalysisHeader";
import ATSGauge from "../components/analysis/ATSGauge";
import SummaryCard from "../components/analysis/SummaryCard";
import SkillsCard from "../components/analysis/SkillsCard";
import StrengthsCard from "../components/analysis/StrengthsCard";
import WeaknessesCard from "../components/analysis/WeaknessesCard";
import SuggestionsCard from "../components/analysis/SuggestionsCard";
import InterviewQuestions from "../components/analysis/InterviewQuestions";

const AnalysisResult = () => {
  const location = useLocation();

  const analysis = location.state?.analysis;
  const resume = location.state?.resume;

  if (!analysis) {
    return <Navigate to="/dashboard" replace />;
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

        <InterviewQuestions
          questions={analysis.interviewQuestions}
        />

      </div>
    </div>
  );
};

export default AnalysisResult;