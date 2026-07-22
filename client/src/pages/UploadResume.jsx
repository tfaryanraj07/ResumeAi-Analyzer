import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import UploadHero from "../components/upload/UploadHero";
import UploadDropzone from "../components/upload/UploadDropzone";
import SelectedFileCard from "../components/upload/SelectedFileCard";
import ResumeHistory from "../components/upload/ResumeHistory";
import UploadProgressModal from "../components/upload/UploadProgressModal";
import DeleteResumeModal from "../components/upload/DeleteResumeModal";

import {
  uploadResume,
  getResumes,
  deleteResume,
} from "../services/resumeService";

import "../assets/upload.css";

const UploadResume = () => {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [resumes, setResumes] = useState([]);

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [uploadProgress, setUploadProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedResume, setSelectedResume] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =============================
  // Load Resume History
  // =============================

  const loadResumes = async () => {
    setLoading(true);

    try {
      const data = await getResumes();
      setResumes(data.resumes || []);
    } catch (err) {
      console.error(err);
      setError("Could not load resumes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResumes();
  }, []);

  // =============================
  // Upload Resume
  // =============================

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a resume first.");
      return;
    }

    setUploading(true);
    setShowProgress(true);
    setUploadProgress(0);

    setError("");
    setSuccess("");

    try {
      const response = await uploadResume(
        file,
        (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) /
              progressEvent.total
          );

          setUploadProgress(percent);
        }
      );

      setSuccess("Resume analyzed successfully!");

      await loadResumes();

      // Small success delay
      setTimeout(() => {
        setShowProgress(false);
        setFile(null);

        navigate("/analysis", {
          state: {
            analysis: response.analysis,
            resume: response.resume,
          },
        });
      }, 1000);
    } catch (err) {
      console.error(err);

      setShowProgress(false);

      setError(
        err.response?.data?.message ||
          "Upload failed. Please try again."
      );
    } finally {
      setUploading(false);
    }
  };

  // =============================
  // Delete Resume
  // =============================

  const handleDelete = async (id) => {
    try {
      await deleteResume(id);

      setResumes((prev) =>
        prev.filter((resume) => resume._id !== id)
      );

      setShowDeleteModal(false);
      setSelectedResume(null);
    } catch (err) {
      console.error(err);
      setError("Unable to delete resume.");
    }
  };

  return (
    <DashboardLayout>
      <div className="upload-page">

        <UploadHero />

        <UploadDropzone
          file={file}
          setFile={setFile}
          setError={setError}
          setSuccess={setSuccess}
        />

        <SelectedFileCard
          file={file}
          uploading={uploading}
          onRemove={() => setFile(null)}
          onAnalyze={handleUpload}
        />

        {error && (
          <div className="upload-alert error">
            {error}
          </div>
        )}

        {success && (
          <div className="upload-alert success">
            {success}
          </div>
        )}

        <ResumeHistory
          loading={loading}
          resumes={resumes}
          onDelete={(resume) => {
            setSelectedResume(resume);
            setShowDeleteModal(true);
          }}
        />

      </div>

      <UploadProgressModal
        open={showProgress}
        progress={uploadProgress}
      />

      <DeleteResumeModal
        open={showDeleteModal}
        resume={selectedResume}
        onCancel={() => {
          setShowDeleteModal(false);
          setSelectedResume(null);
        }}
        onConfirm={handleDelete}
      />
    </DashboardLayout>
  );
};

export default UploadResume;