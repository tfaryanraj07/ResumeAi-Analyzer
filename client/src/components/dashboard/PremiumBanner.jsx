import { Crown, ArrowRight } from "lucide-react";
import "./Dashboard.css";

const PremiumBanner = () => {
  return (
    <section className="premium-banner">

      <div className="premium-left">

        <div className="premium-icon">
          <Crown size={34} />
        </div>

        <div>

          <h2>ResumeAI Pro</h2>

          <p>
            Unlimited resume analysis, premium AI feedback,
            resume comparison and advanced insights.
          </p>

        </div>

      </div>

      <button className="premium-btn">

        Upgrade Now

        <ArrowRight size={18} />

      </button>

    </section>
  );
};

export default PremiumBanner;