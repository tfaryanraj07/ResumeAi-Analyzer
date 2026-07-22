import { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import Loader from '../components/Loader';
import { getProfile } from '../services/authService';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data.user);
      } catch (err) {
        setError('Could not load profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  return (
    <DashboardLayout>
      <h1>Profile</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : (
        <div className="profile-card">
          <p>
            <strong>Name:</strong> {profile.name}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>Joined:</strong> {new Date(profile.createdAt).toLocaleDateString()}
          </p>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Profile;
