const SummaryCard = ({ summary }) => {
  return (
    <div className="analysis-card">
      <h3>🤖 AI Summary</h3>

      <p>
        {summary || "No summary available."}
      </p>
    </div>
  );
};

export default SummaryCard;