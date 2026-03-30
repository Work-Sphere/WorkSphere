import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import api from "../api.js/axios.js";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [number, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setApiError("");
    setErrors({});

    /* ================= VALIDATION ================= */
    const newErrors = {};
    if (!number.trim()) {
      newErrors.number = "Mobile number is required";
    } else if (!/^\d{10}$/.test(number)) {
      newErrors.number = "Mobile number must be exactly 10 digits";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length !== 0) return;

    try {
      setIsSubmitting(true);

      /* ================= TRY MAIN USER LOGIN (FREELANCER / CLIENT) ================= */
      try {
        const userRes = await api.post("/auth/login", {
          phone: number,
          pass: password,
        });

        const { token, rid, uid, name } = userRes.data;

        // ✅ STORE AUTH DATA
        localStorage.setItem("token", token);
        localStorage.setItem("role", String(rid)); // Store as string for consistency
        localStorage.setItem("uid", String(uid));
        localStorage.setItem("userName", name || "");

        // ✅ CORRECT ROLE-BASED REDIRECT
        const roleInt = Number(rid);
        if (roleInt === 2) navigate("/freelancer"); // FREELANCER
        else if (roleInt === 3) navigate("/client"); // CLIENT
        else if (roleInt === 1) navigate("/admin");
        else navigate("/");
        
        return; // Success, exit function
      } catch (err) {
        const errorMsg = err.response?.data?.message || err.response?.data || "";
        console.warn("Main login failed:", errorMsg);

        // If it's a specific rejection error from UserAuthApi, we show it and STOP.
        // (e.g. Account pending, Account blocked)
        if (errorMsg && (errorMsg.includes("pending") || errorMsg.includes("blocked") || errorMsg.includes("rejected"))) {
           setApiError(errorMsg);
           return;
        }
        
        // If it's just "Invalid phone/password", we proceed to check Admin login service below
      }

      /* ================= ADMIN LOGIN ================= */
      try {
        const adminRes = await api.post("/admin/auth/login", {
          phone: number,
          password: password,
        });

        const { token, uid, name } = adminRes.data;

        localStorage.setItem("token", token);
        localStorage.setItem("role", "1");
        localStorage.setItem("uid", String(uid));
        localStorage.setItem("userName", name || "Admin");

        navigate("/admin");
      } catch (adminErr) {
        console.error("Admin login also failed:", adminErr.response?.data);
        const finalError = adminErr.response?.data?.message || adminErr.response?.data || "Invalid mobile number or password";
        setApiError(typeof finalError === 'string' ? finalError : "Invalid mobile number or password");
      }

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <Navbar />

      <div className="login-container">
        {/* LEFT SIDE */}
        <div className="login-background-side">
          <div className="background-overlay">
            <div className="overlay-content">
              <h1 className="company-name">WorkSphere</h1>
              <h2 className="creative-title">
                Connect. Collaborate. Create.
              </h2>
              <p className="background-description">
                Your gateway to premium freelance services.
              </p>

              <div className="feature-list">
                <div className="feature-item">✓ Verified Professionals</div>
                <div className="feature-item">✓ Secure Payments</div>
                <div className="feature-item">✓ 24/7 Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="login-form-side">
          <div className="login-form-container">
            <div className="form-header">
              <h2>Welcome Back</h2>
              <p className="form-subtitle">
                Sign in to your WorkSphere account
              </p>
            </div>

            {apiError && (
              <div className="api-error-banner">⚠️ {apiError}</div>
            )}

            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label>Mobile Number *</label>
                <input
                  type="text"
                  maxLength="10"
                  placeholder="Enter 10-digit number"
                  value={number}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "" || /^\d+$/.test(val)) {
                      setMobileNumber(val);
                    }
                  }}
                />
                {errors.number && (
                  <span className="error">{errors.number}</span>
                )}
              </div>

              <div className="form-group">
                <label>Password *</label>
                <div className="password-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="show-password-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    👁
                  </button>
                </div>
                {errors.password && (
                  <span className="error">{errors.password}</span>
                )}
              </div>

              <div className="form-options">
                <Link to="/forgot-password" className="forgot-link">
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className="login-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </button>

              <div className="signup-link">
                Don’t have an account?
                <Link to="/register"> Sign up</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
