import Loader from "../Loader";
import ResumeHistoryCard from "./ResumeHistoryCard";

const ResumeHistory = ({
  resumes,
  loading,
  onDelete,
}) => {
  return (
    <section className="history-section">

      <div className="history-header">
        <h2>Recent Analyses</h2>

        <p>
          View or manage your previously analyzed
          resumes.
        </p>
      </div>

      {loading ? (
        <Loader />
      ) : resumes.length === 0 ? (
        <div className="empty-history">

          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="empty"
          />

          <h3>No Resume Yet</h3>

          <p>
            Upload your first resume to begin
            AI analysis.
          </p>

        </div>
      ) : (
        <div className="history-grid">

          {resumes.map((resume) => (
            <ResumeHistoryCard
              key={resume._id}
              resume={resume}
              onDelete={onDelete}
            />
          ))}

        </div>
      )}
    </section>
  );
};

export default ResumeHistory;