import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import './ForgotPassword.css';

function ForgotPassword() {
  const [phone, setPhone] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const API_BASE_URL = 'https://localhost:7239/api';

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  /* 🔹 LIVE VALIDATION */
  const validateLive = (name, value) => {
    const newErrors = { ...errors };

    if (name === 'newPassword') {
      if (!passwordRegex.test(value)) {
        newErrors.newPassword =
          'Password must include uppercase, lowercase, number & special character';
      } else {
        delete newErrors.newPassword;
      }

      if (confirmPassword && value !== confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      } else {
        delete newErrors.confirmPassword;
      }
    }

    if (name === 'confirmPassword') {
      if (value !== newPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      } else {
        delete newErrors.confirmPassword;
      }
    }

    setErrors(newErrors);
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setApiError('');
    setSuccessMessage('');

    const newErrors = {};

    if (!phone.trim()) {
      newErrors.phone = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = 'Mobile number must be exactly 10 digits';
    }

    if (!newPassword) {
      newErrors.newPassword = 'New password is required';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    }

    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(prev => ({ ...prev, ...newErrors }));
    if (Object.keys(newErrors).length !== 0) return;

    try {
      setIsSubmitting(true);

      const response = await fetch(
        `${API_BASE_URL}/auth/forgot-password`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            phone: phone,
            newPassword: newPassword
          })
        }
      );

      const text = await response.text();
      let result;

      try {
        result = text ? JSON.parse(text) : {};
      } catch {
        result = { message: text };
      }

      if (!response.ok) {
        throw new Error(result.message || 'Password reset failed');
      }

      setSuccessMessage(result.message || 'Password updated successfully');
      setPhone('');
      setNewPassword('');
      setConfirmPassword('');
      setErrors({});
    } catch (err) {
      setApiError(err.message || 'Failed to fetch');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="forgot-password-page">
      <Navbar />
      
      <div className="forgot-password-container">
        {/* Left Side - Background Image with Overlay Content */}
        <div className="forgot-background-side">
          <div className="background-overlay">
            <div className="overlay-content">
              <h1 className="company-name">WorkSphere</h1>
              <h2 className="creative-title">Reset Your Password</h2>
              <p className="background-description">
                Secure your WorkSphere account with a new password. 
                We'll help you get back to accessing thousands of freelance 
                opportunities and professional services.
              </p>
              <div className="feature-list">
                <div className="feature-item">
                  <span className="feature-icon">🔒</span>
                  <span>Secure Password Reset</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">⚡</span>
                  <span>Instant Account Recovery</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">👤</span>
                  <span>Identity Verification</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">📱</span>
                  <span>Mobile Number Based</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Forgot Password Form */}
        <div className="forgot-form-side">
          <div className="forgot-form-container">
            <div className="form-header">
              <h2>Reset Password</h2>
              <p className="form-subtitle">Enter your registered mobile number to reset password</p>
            </div>

            <div className="forgot-password-form-container">
              {apiError && <div className="api-error-banner">⚠️ {apiError}</div>}

              {successMessage && (
                <div className="success-message-banner">
                  ✅ {successMessage}
                </div>
              )}

              <form onSubmit={handleReset} className="forgot-password-form">
                <div className="form-group">
                  <label htmlFor="phone">Mobile Number *</label>
                  <div className="input-with-prefix">
                    <input
                      type="text"
                      id="phone"
                      value={phone}
                      maxLength="10"
                      placeholder="Enter registered mobile number"
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === '' || /^\d+$/.test(val)) setPhone(val);
                      }}
                    />
                  </div>
                  {errors.phone && <span className="error">{errors.phone}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="newPassword">New Password *</label>
                  <div className="password-input">
                    <input
                      type="password"
                      id="newPassword"
                      value={newPassword}
                      placeholder="Enter new password"
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                        validateLive('newPassword', e.target.value);
                      }}
                    />
                    <button type="button" className="show-password-btn" onClick={() => {}}>
                      👁
                    </button>
                  </div>
                  {errors.newPassword && (
                    <span className="error">{errors.newPassword}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password *</label>
                  <div className="password-input">
                    <input
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      placeholder="Confirm new password"
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        validateLive('confirmPassword', e.target.value);
                      }}
                    />
                    <button type="button" className="show-password-btn" onClick={() => {}}>
                      👁
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <span className="error">{errors.confirmPassword}</span>
                  )}
                </div>

                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            </div>

            <div className="forgot-password-footer">
              <p>
                Remember your password? <Link to="/login">Login here</Link>
              </p>
              <p>
                Don't have an account? <Link to="/register">Register here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;