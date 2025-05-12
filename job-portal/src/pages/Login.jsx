import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../CSS/Auth.css";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = { identifier, password };

    axios.post('http://localhost:3001/login', formData)
      .then(res => {
        setLoading(false);
        if (res.data.success) {
          const { userName, role, email, phone } = res.data.user;

          // Store full user info in localStorage
          const user = { userName, role, email, phone };
          localStorage.setItem("user", JSON.stringify(user));

          toast.success("Login successful!", { autoClose: 2000 });

          // Redirect based on role
          const targetPath = userName === "admin" ? "/postjob" : "/dashboard";
          window.location.href = targetPath;
        } else {
          toast.error(res.data.message || "Invalid credentials.");
        }
      })
      .catch(err => {
        setLoading(false);
        toast.error("Something went wrong. Please try again.");
      });
  };

  return (
    <div className="auth-container">
      <ToastContainer position="top-right" />
      <div className="auth-form">
        <h2 className="auth-title">Login to Your Account</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email or Username:</label>
            <input
              type="text"
              placeholder="Enter email or username"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        <div className="account-message">
          <p>
            Don't have an account?{" "}
            <span onClick={() => navigate("/signup")} className="link-text">
              Sign Up here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
