import {
  FileText,
  Trophy,
  Activity,
  Clock3,
} from "lucide-react";

import StatCard from "./StatCard";
import "./Dashboard.css";

const StatsGrid = ({ resumes }) => {
  const latest = resumes[0];

  return (
    <section className="stats-grid">

      <StatCard
        title="Total Resumes"
        value={resumes.length}
        subtitle={
          resumes.length
            ? `${resumes.length} uploaded`
            : "No resumes yet"
        }
        icon={<FileText size={28} />}
        color="linear-gradient(135deg,#7C6CF6,#5F46FF)"
      />

      <StatCard
        title="Best ATS Score"
        value={
          latest?.atsScore
            ? `${latest.atsScore}%`
            : "--"
        }
        subtitle="Highest score"
        icon={<Trophy size={28} />}
        color="linear-gradient(135deg,#F59E0B,#F97316)"
      />

      <StatCard
        title="AI Analyses"
        value={resumes.length}
        subtitle="Completed"
        icon={<Activity size={28} />}
        color="linear-gradient(135deg,#10B981,#22C55E)"
      />

      <StatCard
        title="Last Analysis"
        value={
          latest
            ? "Today"
            : "--"
        }
        subtitle={
          latest
            ? latest.originalName
            : "No analysis"
        }
        icon={<Clock3 size={28} />}
        color="linear-gradient(135deg,#06B6D4,#3B82F6)"
      />

    </section>
  );
};

export default StatsGrid;