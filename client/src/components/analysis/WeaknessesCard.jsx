const WeaknessesCard = ({ weaknesses = [] }) => {
  return (
    <div className="analysis-card">
      <h3 className="analysis-section-title">⚠️ Weaknesses</h3>

      {weaknesses.length > 0 ? (
        <ul className="analysis-list">
          {weaknesses.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>No weaknesses found.</p>
      )}
    </div>
  );
};

export default WeaknessesCard;