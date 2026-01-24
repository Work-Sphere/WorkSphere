import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';

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
    <div className={styles.loginContainer} >
       
      <div className=  {`container ${styles.loginCard}`} >
        <div className="mt-5"
        > <h2 className="fw-bold mb-3">Login</h2>
          
          <form className="p-4 p-md-5 " onSubmit={handleLogin}>
            
            <div className="form-floating mb-3">
              <input 
                type="text" 
                className="form-control" 
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
              <label htmlFor="floatingInput">Mobile Number</label>
            </div>

            <div className="form-floating mb-3">
              <input 
                type="password" 
                className="form-control" 
                id="floatingPassword" 
                placeholder="Password"
                pattern="^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*[@]).*$"
                title="Must contain at least one uppercase letter, one number, one alphabet, and '@'"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>

            <div className="mb-3">
              <a href="./ForgotPassword" className={styles.ForgotPassword}>
                Forgot Password?
              </a>
            </div>

            <div className={styles.buttonGroup}>
              <button className={`w-100 btn btn-lg btn-primary ${styles.submitBtn}`} type="submit">
                Sign in
              </button>
              <button className={`w-100 btn btn-lg btn-outline-primary ${styles.submitBtn}`} type="button">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;