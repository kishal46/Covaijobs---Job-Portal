import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import the eye icons
import '../CSS/Auth.css';
import Footer from "../Home/Footer";

const SignUp = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    const formData = {
      userName,
      email,
      phoneNumber, // ✅ key must match Mongoose schema
      password,
      role: 'user'
    };

    axios.post('http://localhost:3001/signup', formData)
      .then(res => {
        if (res.data.success) {
          toast.success("Sign Up Successful!", { autoClose: 2000 });
          setTimeout(() => navigate('/login'), 2500);
        } else {
          toast.error(res.data.message || "Sign Up failed.");
        }
      })
      .catch(err => {
        console.error("Signup error:", err);
        toast.error("Something went wrong. Please try again.");
      });
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
    <div className="auth-container">
      <ToastContainer position="top-right" />
      <div className="auth-form">
        <h2 className="auth-title">Create Your Account</h2>
        <form onSubmit={handleSignUp}>
          <div>
            <label>Username:</label>
            <input 
              type="text" 
              placeholder="Enter your username" 
              value={userName} 
              onChange={(e) => setUserName(e.target.value)} 
              className="input-field" 
              required 
            />
          </div>

          <div>
            <label>Email:</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="input-field" 
              required 
            />
          </div>

          <div>
            <label>Phone Number:</label>
            <input 
              type="tel" 
              placeholder="Enter your phone number" 
              value={phoneNumber} 
              onChange={(e) => setPhoneNumber(e.target.value)} 
              className="input-field" 
              required 
            />
          </div>

          <div className="password-group">
            <label>Password:</label>
            <div className="password-input-wrapper">
              <input 
                type={passwordVisible ? "text" : "password"} // Toggle password visibility
                placeholder="Enter your password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="input-field password-input" 
                required 
              />
              <span 
                className="password-toggle-icon" 
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />} {/* Eye icon */}
              </span>
            </div>
          </div>

          <button type="submit" className="auth-btn">Sign Up</button>
        </form>

        <div className="account-message">
          <p>
            Already have an account?{" "}
            <span onClick={() => navigate('/login')} className="link-text">
              Login here
            </span>
          </p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default SignUp;
