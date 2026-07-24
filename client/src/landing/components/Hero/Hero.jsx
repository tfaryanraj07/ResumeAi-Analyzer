import "./Hero.css";

const Hero = ({ openLogin, openRegister }) => {
  return (
    <section className="hero">

      <div className="container hero-container">

        {/* LEFT */}

        <div className="hero-left">

          <span className="hero-badge">
            🚀 AI Powered Resume Scanner
          </span>

          <h1>

            Land More Interviews With

            <span> AI Resume Analysis</span>

          </h1>

          <p>

            Upload your resume, analyze ATS compatibility,
            receive AI-powered suggestions, and increase
            your chances of getting shortlisted.

          </p>

<div className="hero-buttons">
  <button
    className="primary-btn"
    onClick={openRegister}
  >
    Analyze My Resume
  </button>

  <button
    className="secondary-btn"
    onClick={openLogin}
  >
    Sign In
  </button>
</div>
          <div className="hero-stats">

            <div>

              <h3>50K+</h3>

              <span>Resumes Analyzed</span>

            </div>

            <div>

              <h3>95%</h3>

              <span>ATS Accuracy</span>

            </div>

            <div>

              <h3>4.9★</h3>

              <span>User Rating</span>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="hero-right">

          <div className="scanner-card">

            <div className="resume-card">

              <div className="resume-top"></div>

              <div className="resume-line"></div>

              <div className="resume-line short"></div>

              <div className="resume-line"></div>

              <div className="resume-line medium"></div>

              <div className="resume-line"></div>

            </div>

            <div className="scan-line"></div>

            <div className="score-card">

              <h2>94%</h2>

              <p>ATS Match Score</p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;