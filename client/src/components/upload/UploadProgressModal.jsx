import { AnimatePresence, motion } from "framer-motion";
import {
  UploadCloud,
  FileSearch,
  Award,
  Brain,
  Lightbulb,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";
import { useEffect, useState } from "react";

const UploadProgressModal = ({ open, progress }) => {
  const [step, setStep] = useState(0);

const steps = [
  "Uploading Resume",
  "Parsing Resume",
  "Checking ATS Score",
  "Extracting Skills",
  "Generating Suggestions",
  "Preparing Interview Questions",
  "Analysis Complete",
];

  useEffect(() => {
    if (!open) {
      setStep(0);
      return;
    }

    const timer = setInterval(() => {
      setStep((prev) => {
        if (prev >= steps.length - 1) return prev;
        return prev + 1;
      });
    }, 900);

    return () => clearInterval(timer);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="progress-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="progress-modal"
            initial={{
              scale: 0.8,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 0.8,
              opacity: 0,
            }}
          >
            <h2>AI Resume Analyzer</h2>

            <p>
              Please wait while AI analyzes your
              resume.
            </p>

            <div className="progress-bar">

              <div
                className="progress-fill"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

            <div className="progress-percent">
              {progress}%
            </div>

            <div className="step-list">

  {steps.map((item,index)=>{

    const completed=index<step;
    const current=index===step;

    return(

      <div
        key={index}
        className="step-row"
      >

        <div
          className={`step-circle
          ${
            completed
            ? "completed"
            : current
            ? "current"
            : ""
          }`}
        >
          {completed ? "✓" : ""}
        </div>

        <span className="step-text">
          {item}
        </span>

        <div className="step-status">

          {completed && (
            <span className="done">
              Completed
            </span>
          )}

          {current && (
            <span className="working">
              In Progress
            </span>
          )}

          {!completed && !current && (
            <span className="pending">
              Pending
            </span>
          )}

        </div>

      </div>

    );

  })}

</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UploadProgressModal;