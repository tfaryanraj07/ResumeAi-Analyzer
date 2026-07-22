import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <h1>404</h1>
      <p>Page not found.</p>
      <Link to="/dashboard">Go back to Dashboard</Link>
    </div>
  );
};

export default NotFound;
