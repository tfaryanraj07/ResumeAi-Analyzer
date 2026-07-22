import "./Dashboard.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const ATSChart = ({ resumes }) => {

  const chartData = resumes
    .slice(0, 6)
    .reverse()
    .map((resume, index) => ({
      name: `R${index + 1}`,
      score: resume.atsScore || 0,
    }));

  return (
    <section className="chart-card">

      <div className="chart-header">

        <h2>ATS Score Trend</h2>

        <span>Last 6 Analyses</span>

      </div>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <LineChart data={chartData}>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,.05)"
          />

          <XAxis
            dataKey="name"
            stroke="#9CA7C3"
          />

          <YAxis
            stroke="#9CA7C3"
            domain={[0, 100]}
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="score"
            stroke="#7C6CF6"
            strokeWidth={4}
            dot={{
              r: 6,
              fill: "#7C6CF6",
            }}
          />

        </LineChart>

      </ResponsiveContainer>

    </section>
  );
};

export default ATSChart;