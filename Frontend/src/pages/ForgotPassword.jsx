import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SharedAuth.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleReset = (e) => {
    e.preventDefault();
    console.log("Reset link requested for:", email);
  };

  return (
    <div className="auth-container">
      <h2>Forgot Password</h2>
      <form className="auth-form" onSubmit={handleReset}>
        <p style={{ textAlign: 'center', color: '#6c757d', marginBottom: '20px' }}>
          Enter your email address and we'll send you a link to reset your password.
        </p>

        <div className="form-group">
          <label htmlFor="floatingEmail">Email Address</label>
          <input
            type="email"
            id="floatingEmail"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4" style={{ textAlign: 'center' }}>
          <Link to="/login" style={{ color: '#3498db', textDecoration: 'none', fontWeight: '600' }}>
            ← Back to Login
          </Link>
        </div>

        <div className="button-group">
          <button className="submit-btn" type="submit">
            Send Link
          </button>
          <Link to="/login" className="submit-btn" style={{ background: 'transparent', border: '2px solid #95a5a6', color: '#95a5a6', textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;