const SkillsCard = ({ skills = [], missingSkills = [] }) => {
  return (
    <div className="analysis-card">
      <h3>💻 Skills Detected</h3>

      {skills.length > 0 ? (
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <span key={index} className="skill-chip">
              {skill}
            </span>
          ))}
        </div>
      ) : (
        <p>No skills detected.</p>
      )}

      <h3 style={{ marginTop: "30px" }}>❌ Missing Skills</h3>

      {missingSkills.length > 0 ? (
        <div className="skills-grid">
          {missingSkills.map((skill, index) => (
            <span key={index} className="skill-chip missing">
              {skill}
            </span>
          ))}
        </div>
      ) : (
        <p>No missing skills detected.</p>
      )}
    </div>
  );
};

export default SkillsCard;