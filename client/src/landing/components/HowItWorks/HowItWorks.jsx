import {
  UploadCloud,
  BrainCircuit,
  Award,
  ArrowRight,
} from "lucide-react";

import "./HowItWorks.css";

const steps = [
  {
    icon: <UploadCloud size={42} />,
    number: "01",
    title: "Upload Resume",
    description:
      "Securely upload your resume in PDF or DOCX format after logging into your dashboard.",
  },
  {
    icon: <BrainCircuit size={42} />,
    number: "02",
    title: "AI Analysis",
    description:
      "Gemini AI analyzes your resume, extracts information, and evaluates ATS compatibility.",
  },
  {
    icon: <Award size={42} />,
    number: "03",
    title: "Get Results",
    description:
      "Receive your ATS score, strengths, weaknesses, keyword analysis, and personalized suggestions.",
  },
];

const HowItWorks = () => {
  return (
    <section className="how section">
      <div className="container">

        <div className="section-heading">

          <span>HOW IT WORKS</span>

          <h2>
            Three Simple Steps
          </h2>

          <p>
            Get professional AI-powered resume feedback in
            just a few clicks.
          </p>

        </div>

        <div className="steps">

          {steps.map((step, index) => (
            <div
              className="step-card"
              key={step.number}
            >
              <div className="step-number">
                {step.number}
              </div>

              <div className="step-icon">
                {step.icon}
              </div>

              <h3>{step.title}</h3>

              <p>{step.description}</p>

              {index !== steps.length - 1 && (
                <ArrowRight
                  className="step-arrow"
                  size={34}
                />
              )}
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default HowItWorks;