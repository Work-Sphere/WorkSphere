import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SharedAuth.css';

function Login() {
  const [number, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
 
 const handleLogin = (e) => {
    e.preventDefault();
    
    // Final check before submission
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*[@]).{8,}$/;
    
    if (!passwordRegex.test(password)) {
      alert("Password must contain: 1 Capital letter, 1 number, 1 alphabet, and '@'");
      return;
    }

    console.log("Validation Successful:", number, password);
  };
  

  

  return (
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
    </div>
  );
}

export default Login;