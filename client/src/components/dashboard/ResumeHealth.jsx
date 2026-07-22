import {
  CheckCircle2,
  AlertTriangle,
  Target,
  Brain,
} from "lucide-react";

import "./Dashboard.css";

const ResumeHealth = ({ resumes }) => {
  const latest = resumes[0];

  const ats = latest?.atsScore || 0;

  const strengths = latest?.strengths || [];

  const weaknesses = latest?.weaknesses || [];

  return (
    <section className="health-card">

      <div className="health-header">

        <Brain size={22} />

        <h2>AI Resume Health</h2>

      </div>

      <div className="health-score">

        <span>{ats}%</span>

        <p>Overall ATS Score</p>

      </div>

      <div className="health-section">

        <h4>

          <CheckCircle2 size={18} />

          Strengths

        </h4>

        {strengths.length ? (

          strengths.slice(0,3).map((item,index)=>(

            <div
              key={index}
              className="health-item success"
            >
              {item}
            </div>

          ))

        ) : (

          <div className="health-item success">
            Resume Uploaded
          </div>

        )}

      </div>

      <div className="health-section">

        <h4>

          <AlertTriangle size={18} />

          Needs Improvement

        </h4>

        {weaknesses.length ? (

          weaknesses.slice(0,3).map((item,index)=>(

            <div
              key={index}
              className="health-item warning"
            >
              {item}
            </div>

          ))

        ) : (

          <div className="health-item warning">
            Analyze a resume to see suggestions
          </div>

        )}

      </div>

      <div className="health-footer">

        <Target size={18} />

        AI recommendations update after every analysis.

      </div>

    </section>
  );
};

export default ResumeHealth;