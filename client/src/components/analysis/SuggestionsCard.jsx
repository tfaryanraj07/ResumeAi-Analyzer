const SuggestionsCard = ({ suggestions = [] }) => {
  return (
    <div className="analysis-card">
      <h3 className="analysis-section-title">💡 AI Suggestions</h3>

      {suggestions.length > 0 ? (
        <ul className="analysis-list">
          {suggestions.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>No suggestions available.</p>
      )}
    </div>
  );
};

export default SuggestionsCard;