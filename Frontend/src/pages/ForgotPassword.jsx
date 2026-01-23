import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ForgotPassword.module.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleReset = (e) => {
    e.preventDefault();
    console.log("Reset link requested for:", email);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className="mt-5">
          
          <form className="p-4 p-md-5  bg-white shadow-sm" onSubmit={handleReset}>
            
            <h2 className="fw-bold mb-3">Forgot Password</h2>
            <p className="text-muted mb-4">
              Enter your email address and we'll send you a link to reset your password.
            </p>

            <div className="form-floating mb-3">
              <input 
                type="email" 
                className="form-control" 
                id="floatingEmail" 
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="floatingEmail">Email Address</label>
            </div>

            <div className="mb-4">
              <Link to="/login" className="text-decoration-none">
                ← Back to Login
              </Link>
            </div>

            <div className="d-flex gap-3">
              <button className="w-100 btn btn-lg btn-primary" type="submit">
                Send Link
              </button>
              <Link to="/login" className="w-100 btn btn-lg btn-outline-secondary d-flex align-items-center justify-content-center text-decoration-none">
                Cancel
              </Link>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;