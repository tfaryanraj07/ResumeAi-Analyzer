import { Check } from "lucide-react";
import "./Pricing.css";

const plans = [
  {
    title: "Free",
    price: "₹0",
    period: "/month",
    popular: false,
    features: [
      "1 Resume Analysis",
      "Basic ATS Score",
      "AI Suggestions",
      "Resume Parsing",
    ],
    button: "Get Started",
  },
  {
    title: "Pro",
    price: "₹49",
    period: "/month",
    popular: true,
    features: [
      "Unlimited Resume Analysis",
      "Advanced ATS Report",
      "Keyword Optimization",
      "Resume History",
      "Priority AI Analysis",
      "Future Updates",
    ],
    button: "Choose Pro",
  },
  {
    title: "Enterprise",
    price: "Custom",
    period: "",
    popular: false,
    features: [
      "Unlimited Users",
      "Company Dashboard",
      "Bulk Resume Analysis",
      "Admin Controls",
      "Priority Support",
    ],
    button: "Contact Us",
  },
];

const Pricing = () => {
  return (
    <section
  id="pricing"
  className="pricing section"
>
      <div className="container">

        <div className="section-heading">
          <span>PRICING</span>

          <h2>Simple & Transparent Pricing</h2>

          <p>
            Start for free and upgrade whenever you need
            more AI-powered resume analysis.
          </p>
        </div>

        <div className="pricing-grid">

          {plans.map((plan) => (
            <div
              key={plan.title}
              className={`price-card ${
                plan.popular ? "popular" : ""
              }`}
            >
              {plan.popular && (
                <div className="popular-badge">
                  Most Popular
                </div>
              )}

              <h3>{plan.title}</h3>

              <div className="price">

                <span className="amount">
                  {plan.price}
                </span>

                <span className="period">
                  {plan.period}
                </span>

              </div>

              <ul>

                {plan.features.map((item) => (
                  <li key={item}>
                    <Check size={18} />
                    {item}
                  </li>
                ))}

              </ul>

              <button>
                {plan.button}
              </button>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Pricing;