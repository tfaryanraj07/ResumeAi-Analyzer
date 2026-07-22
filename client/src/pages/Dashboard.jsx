import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import Loader from "../components/Loader";
import useAuth from "../hooks/useAuth";
import { getResumes } from "../services/resumeService";

import WelcomeCard from "../components/dashboard/WelcomeCard";
import StatsGrid from "../components/dashboard/StatsGrid";
import UploadCard from "../components/dashboard/UploadCard";

import RecentAnalysis from "../components/dashboard/RecentAnalysis";
import PremiumBanner from "../components/dashboard/PremiumBanner";

import QuickActions from "../components/dashboard/QuickActions";


const Dashboard = () => {
  const { user } = useAuth();

  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const data = await getResumes();
        setResumes(data.resumes || []);
      } catch (err) {
        setError("Could not load resumes.");
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <Loader />
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <p className="error-text">{error}</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="dashboard-page">

        <WelcomeCard user={user} />

        <StatsGrid
          resumes={resumes}
        />

        <UploadCard />

        {/* Coming Next */}

        

        <RecentAnalysis resumes={resumes} />

        

        <QuickActions />

        <PremiumBanner />

      </div>
    </DashboardLayout>
  );
};

export default Dashboard;