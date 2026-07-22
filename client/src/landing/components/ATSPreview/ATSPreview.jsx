import {
  CheckCircle2,
  XCircle,
  TrendingUp,
  FileText,
} from "lucide-react";
import "./ATSPreview.css";

const ATSPreview = () => {
  return (
    <section className="ats section">
      <div className="container ats-container">

        {/* Left */}

        <div className="ats-left">

          <span className="section-tag">
            LIVE DEMO
          </span>

          <h2>
            See What You'll Get
            After Uploading
            Your Resume
          </h2>

          <p>
            Our AI analyzes your resume against modern
            Applicant Tracking Systems and generates a
            complete report with ATS score, strengths,
            weaknesses and improvement suggestions.
          </p>

          <div className="ats-list">

            <div>
              <CheckCircle2 />
              ATS Compatibility Score
            </div>

            <div>
              <CheckCircle2 />
              AI Suggestions
            </div>

            <div>
              <CheckCircle2 />
              Keyword Optimization
            </div>

            <div>
              <CheckCircle2 />
              Resume Parsing
            </div>

          </div>

        </div>

        {/* Right */}

        <div className="ats-demo">

          <div className="demo-header">

            <FileText size={22} />

            Resume Analysis

          </div>

          <div className="score-circle">

            <div className="circle">

              <span>94%</span>

            </div>

            <p>ATS Score</p>

          </div>

          <div className="analysis-grid">

            <div className="analysis-box">

              <h4>

                <CheckCircle2 />

                Strengths

              </h4>

              <ul>

                <li>Relevant Skills</li>

                <li>ATS Friendly Format</li>

                <li>Strong Experience</li>

              </ul>

            </div>

            <div className="analysis-box">

              <h4>

                <XCircle />

                Weaknesses

              </h4>

              <ul>

                <li>Missing Keywords</li>

                <li>Weak Summary</li>

                <li>No Metrics</li>

              </ul>

            </div>

          </div>

          <div className="improvement-card">

            <TrendingUp />

            <div>

              <h4>AI Suggestion</h4>

              <p>

                Add more measurable achievements and
                include role-specific keywords.

              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ATSPreview;