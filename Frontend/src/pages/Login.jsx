import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Login.css';

function Login() {
  const [number, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const API_BASE_URL = '/api';

  const handleLogin = async (e) => {
    e.preventDefault();
    setApiError('');

    const newErrors = {};

    if (!number.trim()) {
      newErrors.number = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(number)) {
      newErrors.number = 'Mobile number must be exactly 10 digits';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length !== 0) return;

    try {
      setIsSubmitting(true);

      const payload = {
        phone: number,
        pass: password
      };

      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const text = await response.text();
      let result;

      try {
        result = text ? JSON.parse(text) : {};
      } catch {
        result = { message: text };
      }

      if (!response.ok) {
        throw new Error(result.message || 'Login failed');
      }

      // ✅ SUCCESS
      alert('Login successful');
      setMobileNumber('');
      setPassword('');
      setErrors({});

    } catch (err) {
      setApiError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <Navbar />
      
      <div className="login-container">
        {/* Left Side - Background Image with Overlay Content */}
        <div className="login-background-side">
          <div className="background-overlay">
            <div className="overlay-content">
              <h1 className="company-name">WorkSphere</h1>
              <h2 className="creative-title">Connect. Collaborate. Create.</h2>
              <p className="background-description">
                Your gateway to premium freelance services. Find skilled professionals 
                for any project - from web development to home services, graphic design 
                to consulting. Quality work delivered on time, every time.
              </p>
              <div className="feature-list">
                <div className="feature-item">
                  <span className="feature-icon">✓</span>
                  <span>50,000+ Verified Professionals</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">✓</span>
                  <span>200+ Service Categories</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">✓</span>
                  <span>Secure Payment System</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">✓</span>
                  <span>24/7 Customer Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="login-form-side">
          <div className="login-form-container">
            <div className="form-header">
              <h2>Welcome Back</h2>
              <p className="form-subtitle">Sign in to access your WorkSphere account</p>
            </div>

            {apiError && (
              <div className="api-error-banner">
                ⚠️ {apiError}
              </div>
            )}

            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label htmlFor="mobile">Mobile Number *</label>
                <div className="input-with-prefix">
                  <input
                    type="text"
                    id="mobile"
                    value={number}
                    maxLength="10"
                    placeholder="Enter 10-digit number"
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === '' || /^\d+$/.test(val)) {
                        setMobileNumber(val);
                      }
                    }}
                  />
                </div>
                {errors.number && <span className="error">{errors.number}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password *</label>
                <div className="password-input">
                  <input
                    type="password"
                    id="password"
                    value={password}
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button type="button" className="show-password-btn" onClick={() => {}}>
                    👁
                  </button>
                </div>
                {errors.password && <span className="error">{errors.password}</span>}
              </div>

              <div className="form-options">
                <Link to="/forgot-password" className="forgot-link">
                  Forgot Password?
                </Link>
              </div>

              <button type="submit" className="login-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </button>

              <div className="signup-link">
                Don't have an account? <Link to="/register">Sign up</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;