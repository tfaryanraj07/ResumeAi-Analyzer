import { useEffect, useState } from "react";

const ATSGauge = ({ score = 0 }) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let current = 0;

    const timer = setInterval(() => {
      current++;

      setAnimatedScore(current);

      if (current >= score) {
        clearInterval(timer);
      }
    }, 20);

    return () => clearInterval(timer);
  }, [score]);

  const radius = 90;
  const circumference = 2 * Math.PI * radius;

  const offset =
    circumference -
    (animatedScore / 100) * circumference;

  const getBadge = () => {
    if (score >= 90) return "Excellent Resume";
    if (score >= 75) return "Good Resume";
    if (score >= 60) return "Average Resume";
    return "Needs Improvement";
  };

  return (
    <div className="analysis-card ats-card">
      <svg
        className="progress-ring"
        width="220"
        height="220"
      >
        <circle
          className="progress-bg"
          r={radius}
          cx="110"
          cy="110"
        />

        <circle
          className="progress"
          r={radius}
          cx="110"
          cy="110"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
          }}
        />
      </svg>

      <div className="progress-content">
        <h1>{animatedScore}%</h1>

        <p>ATS SCORE</p>

        <span className="score-badge">
          {getBadge()}
        </span>
      </div>
    </div>
  );
};

export default ATSGauge;