import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/login", {
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          // After successful login, store user authentication status
          localStorage.setItem("isAuthenticated", "true");

          Swal.fire({
            title: "Success!",
            text: "Login successful",
            icon: "success",
            timer: 1000,
            showConfirmButton: false,
          }).then(() => {
            navigate("/dashboard");
          });
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          Swal.fire({
            title: "Error!",
            text: "User not found",
            icon: "error",
            confirmButtonText: "OK",
          });
        } else if (err.response && err.response.status === 401) {
          Swal.fire({
            title: "Error!",
            text: "Incorrect password",
            icon: "error",
            confirmButtonText: "OK",
          });
        } else {
          console.log(err);
          Swal.fire({
            title: "Error!",
            text: "Login failed",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      });
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow p-4">
              <h2 className="text-center mb-4">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </form>
              <p className="mt-3 text-center">
                Not have an account? <Link to="/register">Register</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
