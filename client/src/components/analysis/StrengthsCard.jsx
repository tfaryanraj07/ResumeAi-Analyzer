const StrengthsCard = ({ strengths = [] }) => {
  return (
    <div className="analysis-card">
      <h3 className="analysis-section-title">💪 Strengths</h3>

      {strengths.length > 0 ? (
        <ul className="analysis-list">
          {strengths.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>No strengths available.</p>
      )}
    </div>
  );
};

export default StrengthsCard;