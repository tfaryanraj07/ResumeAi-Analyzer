import { useCallback, useState } from "react";
import { UploadCloud, FileText } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";

const UploadDropzone = ({
  file,
  setFile,
  setError,
  setSuccess,
}) => {
  const [dragging, setDragging] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      setDragging(false);

      setError("");
      setSuccess("");

      if (rejectedFiles.length > 0) {
        setError(
          "Only PDF, DOC and DOCX files under 5MB are allowed."
        );
        return;
      }

      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
      }
    },
    [setFile, setError, setSuccess]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,

    maxFiles: 1,

    maxSize: 5 * 1024 * 1024,

    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },

    onDragEnter: () => setDragging(true),

    onDragLeave: () => setDragging(false),
  });

  return (
    <motion.div
      {...getRootProps()}
      className={`dropzone ${dragging ? "dragging" : ""}`}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <input {...getInputProps()} />

      {file ? (
        <>
          <FileText size={60} className="drop-icon success" />

          <h2>{file.name}</h2>

          <p>
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>

          <span className="ready-badge">
            ✓ Ready for AI Analysis
          </span>
        </>
      ) : (
        <>
          <UploadCloud
            size={70}
            className="drop-icon"
          />

          <h2>Drag & Drop Resume Here</h2>

          <p>or click anywhere to browse</p>

          <span className="drop-info">
            PDF • DOC • DOCX • Max 5 MB
          </span>
        </>
      )}
    </motion.div>
  );
};

export default UploadDropzone;