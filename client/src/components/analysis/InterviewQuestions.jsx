const InterviewQuestions = ({ questions = [] }) => {
  return (
    <div className="analysis-card">
      <h3 className="analysis-section-title">🎤 Interview Questions</h3>

      {questions.length > 0 ? (
        <ol className="analysis-list">
          {questions.map((question, index) => (
            <li key={index}>{question}</li>
          ))}
        </ol>
      ) : (
        <p>No interview questions generated.</p>
      )}
    </div>
  );
};

export default InterviewQuestions;