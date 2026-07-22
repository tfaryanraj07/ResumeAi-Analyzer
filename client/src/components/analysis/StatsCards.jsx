import {
  Award,
  Brain,
  CircleX,
  Lightbulb,
} from "lucide-react";

const StatsCards = ({ analysis }) => {
  const cards = [
    {
      title: "ATS Score",
      value: `${analysis.atsScore}%`,
      icon: <Award size={26} />,
      color: "#7C5CFF",
    },
    {
      title: "Skills",
      value: analysis.skills.length,
      icon: <Brain size={26} />,
      color: "#22C55E",
    },
    {
      title: "Missing",
      value: analysis.missingSkills.length,
      icon: <CircleX size={26} />,
      color: "#EF4444",
    },
    {
      title: "Suggestions",
      value: analysis.suggestions.length,
      icon: <Lightbulb size={26} />,
      color: "#F59E0B",
    },
  ];

  return (
    <div className="stats-cards">
      {cards.map((card) => (
        <div className="stats-card" key={card.title}>
          <div
            className="stats-icon"
            style={{ background: card.color }}
          >
            {card.icon}
          </div>

          <div>
            <p>{card.title}</p>
            <h2>{card.value}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;