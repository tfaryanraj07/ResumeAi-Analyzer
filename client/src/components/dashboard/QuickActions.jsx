import { Link } from "react-router-dom";
import {
  UploadCloud,
  History,
  BarChart3,
  Crown,
} from "lucide-react";

import "./Dashboard.css";

const actions = [
  {
    title: "Upload Resume",
    desc: "Analyze a new resume",
    icon: <UploadCloud size={24} />,
    path: "/upload",
    color: "#7C6CF6",
  },
  {
    title: "Resume History",
    desc: "View previous analyses",
    icon: <History size={24} />,
    path: "/upload",
    color: "#22C55E",
  },
  {
    title: "Analytics",
    desc: "Track ATS performance",
    icon: <BarChart3 size={24} />,
    path: "/dashboard",
    color: "#06B6D4",
  },
  {
    title: "Upgrade Pro",
    desc: "Unlock premium features",
    icon: <Crown size={24} />,
    path: "/dashboard",
    color: "#F59E0B",
  },
];

const QuickActions = () => {
  return (
    <section className="quick-actions">

      <div className="section-header">
        <h2>Quick Actions</h2>
      </div>

      <div className="quick-grid">

        {actions.map((action) => (

          <Link
            key={action.title}
            to={action.path}
            className="quick-card"
          >

            <div
              className="quick-icon"
              style={{
                background: action.color,
              }}
            >
              {action.icon}
            </div>

            <h3>{action.title}</h3>

            <p>{action.desc}</p>

          </Link>

        ))}

      </div>

    </section>
  );
};

export default QuickActions;