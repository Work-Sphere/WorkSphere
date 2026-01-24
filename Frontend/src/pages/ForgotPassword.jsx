import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

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
    <div className="register-container">
      <h2>Reset Password</h2>

      {apiError && <div className="api-error-banner">⚠️ {apiError}</div>}

      {successMessage && (
        <div
          className="api-error-banner"
          style={{
            background: '#eafaf1',
            color: '#1e8449',
            borderColor: '#2ecc71'
          }}
        >
          ✅ {successMessage}
        </div>
      )}

      <form onSubmit={handleReset} className="register-form">
        <div className="form-group">
          <label>Mobile Number *</label>
          <input
            type="text"
            value={phone}
            maxLength="10"
            placeholder="Enter registered mobile number"
            onChange={(e) => {
              const val = e.target.value;
              if (val === '' || /^\d+$/.test(val)) setPhone(val);
            }}
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label>New Password *</label>
          <input
            type="password"
            value={newPassword}
            placeholder="Enter new password"
            onChange={(e) => {
              setNewPassword(e.target.value);
              validateLive('newPassword', e.target.value);
            }}
          />
          {errors.newPassword && (
            <span className="error">{errors.newPassword}</span>
          )}
        </div>

        <div className="form-group">
          <label>Confirm Password *</label>
          <input
            type="password"
            value={confirmPassword}
            placeholder="Confirm new password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              validateLive('confirmPassword', e.target.value);
            }}
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword}</span>
          )}
        </div>

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Updating...' : 'Update Password'}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <p>
          Remember your password? <Link to="/login">Login here</Link>
        </p>
        <p>
          Don&apos;t have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
