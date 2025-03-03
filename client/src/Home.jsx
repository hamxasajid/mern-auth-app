import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="d-flex vh-100 bg-dark justify-content-center align-items-center text-center">
      <div className="p-5 rounded shadow-lg bg-white">
        <h1 className="fw-bold text-dark">🏠 Welcome to Our Mern Auth-App</h1>
        <p className="text-muted">
          Join us today and explore amazing features!
        </p>
        <div className="mt-4">
          <Link to="/register" className="btn btn-success me-3 px-4">
            Register 📝
          </Link>
          <Link to="/login" className="btn btn-outline-primary px-4">
            Login 🔑
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
