<<<<<<< HEAD
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import './SharedAuth.css';
=======
import './Register.css';
>>>>>>> 51d3d022c4b594d44842d1264134c195eb7180c7

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
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const text = await response.text();

      let result = {};
      try {
        result = text ? JSON.parse(text) : {};
      } catch {
        result = { message: text };
      }

      if (!response.ok) {
        throw new Error(result.message || 'Login failed');
      }

      // ✅ SUCCESS
      console.log('Login success:', result);

      // OPTIONAL (if token is returned)
      // localStorage.setItem('token', result.token);

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
<<<<<<< HEAD
    <div className="auth-container">
      <h2>Login</h2>
      <form className="auth-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="floatingInput">Mobile Number</label>
          <input
            type="text"
            id="floatingInput"
            placeholder="Mobile Number"
            maxLength="10"
            pattern="\d{10}"
            title="Please enter exactly 10 digits"
            value={number}
            onChange={(e) => {
              const val = e.target.value;
              if (val === '' || /^\d+$/.test(val)) {
                setMobileNumber(val);
              }
            }}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="floatingPassword">Password</label>
          <input
            type="password"
            id="floatingPassword"
            placeholder="Password"
            pattern="^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*[@]).*$"
            title="Must contain at least one uppercase letter, one number, one alphabet, and '@'"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-3" style={{ textAlign: 'center' }}>
          <Link to="/forgot-password" style={{ color: '#3498db', textDecoration: 'none', fontWeight: '600' }}>
            Forgot Password?
          </Link>
        </div>

        <div className="button-group">
          <button className="submit-btn" type="submit">
            Sign in
          </button>
          <Link to="/register" className="submit-btn" style={{ background: 'transparent', border: '2px solid #95a5a6', color: '#95a5a6', textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}>
            Register
          </Link>
        </div>
      </form>
=======
    <div className="register-container">
      <h2>Login</h2>

      {apiError && (
        <div className="api-error-banner">
          ⚠️ {apiError}
        </div>
      )}

      <form onSubmit={handleLogin} className="register-form">
        <div className="form-group">
          <label>Mobile Number *</label>
          <input
            type="text"
            value={number}
            onChange={(e) => {
              const val = e.target.value;
              if (val === '' || /^\d+$/.test(val)) {
                setMobileNumber(val);
              }
            }}
            maxLength="10"
          />
          {errors.number && <span className="error">{errors.number}</span>}
        </div>

        <div className="form-group">
          <label>Password *</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <p>
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>
        <p>
          Don&apos;t have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
>>>>>>> 51d3d022c4b594d44842d1264134c195eb7180c7
    </div>
  );
}

export default Login;
=======
import React from 'react'

function Login() {
  return (
    <div>Login</div>
  )
}

export default Login
>>>>>>> parent of f44ebf5 (Merge branch 'Tejas' of https://github.com/Work-Sphere/WorkSphere)
