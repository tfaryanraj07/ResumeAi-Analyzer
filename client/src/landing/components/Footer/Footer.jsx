import { FaGithub, FaLinkedin, FaArrowUp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import "./Footer.css";

const Footer = () => {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">

      <div className="container">

        <div className="footer-top">

          <div className="footer-brand">

            <div className="footer-logo">

              AI

            </div>

            <div>

              <h2>ResumeAI</h2>

              <p>
                AI Powered Resume Scanner &
                ATS Resume Analyzer.
              </p>

            </div>

          </div>

          <div className="footer-links">

            <div>

              <h4>Product</h4>

              <a href="#">Features</a>

              <a href="#">ATS Checker</a>

              <a href="#">Pricing</a>

            </div>

            <div>

              <h4>Company</h4>

              <a href="#">About</a>

              <a href="#">Contact</a>

              <a href="#">Privacy</a>

            </div>

            <div>

              <h4>Resources</h4>

              <a href="#">Documentation</a>

              <a href="#">Support</a>

              <a href="#">Blog</a>

            </div>

          </div>

        </div>

        <div className="footer-bottom">

          <p>

            © {new Date().getFullYear()} ResumeAI.
            All Rights Reserved.

          </p>

          <div className="social-icons">

            <a href="https://github.com/tfaryanraj07">

              <FaGithub />

            </a>

            <a href="https://www.linkedin.com/in/rajkumar-solanki07/">

              <FaLinkedin />

            </a>

            <a href="mailto:rsolanki9235@gmail.com">

              <MdEmail />

            </a>

          </div>

        </div>

      </div>

      <button
        className="scroll-top"
        onClick={scrollTop}
      >

        <FaArrowUp />

      </button>

    </footer>
  );
};

export default Footer;