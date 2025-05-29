import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../CSS/Auth.css";
import Footer from "../Home/Footer";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = { identifier, password };

    axios.post(' http://localhost:3001/login', formData)  //       http://localhost:3001/login
      .then(res => {
        setLoading(false);
        if (res.data.success) {
          const { userName, role, email, phone } = res.data.user;
          const user = { userName, role, email, phone };
          localStorage.setItem("user", JSON.stringify(user));
          toast.success("Login successful!", { autoClose: 2000 });

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

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <div className="auth-container login-page">
        <ToastContainer position="top-right" />
        <div className="auth-form">
          <h2 className="auth-title">Login to Your Account</h2>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="identifier">Email or Username</label>
              <input
                type="text"
                id="identifier"
                placeholder="Enter email or username"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="password-wrapper">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="toggle-password"
                  onClick={togglePasswordVisibility}
                  title={passwordVisible ? "Hide password" : "Show password"}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="account-message">
            <p>
              Don’t have an account?{" "}
              <span onClick={() => navigate("/signup")} className="link-text">
                Sign Up here
              </span>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
