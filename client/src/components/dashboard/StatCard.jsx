import "./Dashboard.css";

const StatCard = ({
  title,
  value,
  subtitle,
  icon,
  color,
}) => {
  return (
    <div className="stat-card">

      <div
        className="stat-icon"
        style={{
          background: color,
        }}
      >
        {icon}
      </div>

      <div className="stat-content">

        <h2>{value}</h2>

        <h4>{title}</h4>

        <p>{subtitle}</p>

      </div>

    </div>
  );
};

export default StatCard;