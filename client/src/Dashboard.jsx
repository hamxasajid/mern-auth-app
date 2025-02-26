import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    if (localStorage.getItem("isAuthenticated") !== "true") {
      navigate("/login"); 
    }
  }, [navigate]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    confirm("Are you sure you want to logout?"); 
    navigate("/login"); 
  };

  return (
    <div className="d-flex vh-100 bg-light justify-content-center align-items-center">
      <div className="text-center p-5 shadow-lg rounded bg-white">
        <h1 className="fw-bold text-primary">🚀 Welcome to Dashboard</h1>
        <p className="text-muted">Manage your analytics, users, and settings efficiently.</p>
        <button className="btn btn-danger mt-3" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
