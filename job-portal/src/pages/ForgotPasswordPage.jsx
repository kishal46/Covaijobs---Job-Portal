import React, { useState } from 'react';
import '../CSS/Login.css';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSendResetLink = () => {
    if (!email) {
      setMessage('Please enter your email address.');
      return;
    }

    setMessage('A reset link has been sent to your email.');
    setTimeout(() => {
      setMessage('');
      setEmail('');
    }, 3000);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Reset your password</h2>

        <div className="form-group">
          <input
            type="email"
            placeholder="Enter your email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {message && <p className="message">{message}</p>}

        <button className="login-button" onClick={handleSendResetLink}>
          Send Reset Link
        </button>

        <p className="signup-text">
          Remembered? <a href="/login">Go back to Login</a>
        </p>
        <p className="support-text">
          Need help? <a href="#">Contact support</a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
