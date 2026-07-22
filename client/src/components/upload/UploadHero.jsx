import { motion } from "framer-motion";

const UploadHero = () => {
  return (
    <motion.div
      className="upload-heading"
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1>Resume Upload</h1>

      <p>
        Upload your resume to receive an ATS score, AI-powered feedback,
        missing skills, and interview questions.
      </p>
    </motion.div>
  );
};

export default UploadHero;