import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Register.css';

const ROLE_MAP = {
  freelancer: 2,
  client: 3
};

function Register() {
  const [formData, setFormData] = useState({
    role: 'freelancer',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    state: '',
    city: '',
    stateId: '',
    cityId: ''
  });

  const [errors, setErrors] = useState({});
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const API_BASE_URL = '/api';

  useEffect(() => {
    fetch(`${API_BASE_URL}/location/states`)
      .then(res => res.json())
      .then(data => setStates(Array.isArray(data) ? data : []))
      .catch(() => setApiError('Failed to load states'));
  }, []);

  useEffect(() => {
    if (!formData.stateId) return;
    fetch(`${API_BASE_URL}/location/cities/${formData.stateId}`)
      .then(res => res.json())
      .then(data => setCities(Array.isArray(data) ? data : []))
      .catch(() => setCities([]));
  }, [formData.stateId]);

  /* 🔹 LIVE VALIDATION */
  const validateLive = (name, value, updatedData) => {
    const newErrors = { ...errors };

    if (name === 'phone') {
      if (!/^\d{0,10}$/.test(value)) {
        newErrors.phone = 'Only digits allowed';
      } else if (value.length !== 10) {
        newErrors.phone = 'Phone number must be 10 digits';
      } else {
        delete newErrors.phone;
      }
    }

    if (name === 'password') {
      if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(value)
      ) {
        newErrors.password =
          'Password must include uppercase, lowercase, number & special character';
      } else {
        delete newErrors.password;
      }

      if (
        updatedData.confirmPassword &&
        value !== updatedData.confirmPassword
      ) {
        newErrors.confirmPassword = 'Passwords do not match';
      } else {
        delete newErrors.confirmPassword;
      }
    }

    if (name === 'confirmPassword') {
      if (value !== updatedData.password) {
        newErrors.confirmPassword = 'Passwords do not match';
      } else {
        delete newErrors.confirmPassword;
      }
    }

    if (name === 'email' && value) {
      if (!value.endsWith('@gmail.com')) {
        newErrors.email = 'Email must end with @gmail.com';
      } else {
        delete newErrors.email;
      }
    }

    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };

    if (name === 'state') {
      const s = states.find(x => (x.name || x.stateName) === value);
      setFormData({
        ...updatedData,
        stateId: s?.id || s?.stateId || '',
        city: '',
        cityId: ''
      });
      setCities([]);
      return;
    }

    if (name === 'city') {
      const c = cities.find(x => (x.name || x.cityName) === value);
      setFormData({
        ...updatedData,
        cityId: c?.id || c?.cityId || ''
      });
      return;
    }

    setFormData(updatedData);
    validateLive(name, value, updatedData);
  };

  const validateOnSubmit = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm password is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.stateId) newErrors.state = 'State is required';
    if (!formData.cityId) newErrors.city = 'City is required';

    if (formData.email && !formData.email.endsWith('@gmail.com')) {
      newErrors.email = 'Email must end with @gmail.com';
    }

    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }

    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    setRegistrationSuccess(false);

    if (!validateOnSubmit()) return;

    try {
      setIsSubmitting(true);

      const payload = {
        rid: ROLE_MAP[formData.role],
        fname: formData.firstName,
        lname: formData.lastName || null,
        email: formData.email || null,
        pass: formData.password,
        phone: formData.phone,
        addr: formData.address,
        state: parseInt(formData.stateId),
        city: parseInt(formData.cityId)
      };

      const response = await fetch(`${API_BASE_URL}/auth/register`, {
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
        throw new Error(result.message || 'Registration failed');
      }

      setRegistrationSuccess(true);
      setFormData({
        role: 'freelancer',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        address: '',
        state: '',
        city: '',
        stateId: '',
        cityId: ''
      });
      setErrors({});
      setCities([]);
    } catch (err) {
      setApiError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-page">
      <Navbar />
      
      <div className="register-container">
        {/* Left Side - Background Image with Overlay Content */}
        <div className="register-background-side">
          <div className="background-overlay">
            <div className="overlay-content">
              <h1 className="company-name">WorkSphere</h1>
              <h2 className="creative-title">Join Our Community of Professionals</h2>
              <p className="background-description">
                Register today and connect with thousands of skilled freelancers or 
                find the perfect talent for your projects. Whether you're a service 
                provider or looking for services, WorkSphere brings opportunities 
                right to your fingertips.
              </p>
              <div className="feature-list">
                <div className="feature-item">
                  <span className="feature-icon">✓</span>
                  <span>Create Your Professional Profile</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">✓</span>
                  <span>Access Thousands of Projects</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">✓</span>
                  <span>Secure Payment Protection</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">✓</span>
                  <span>24/7 Support & Guidance</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
       <div className="register-form-side">
  <div className="register-form-container">
    <div className="form-header">
      <h2>Create Account</h2>
      <p className="form-subtitle">Join WorkSphere to start your journey</p>
    </div>

    {apiError && (
      <div className="api-error-banner">
        ⚠️ {apiError}
      </div>
    )}
    
    {registrationSuccess && (
      <div className="success-banner">
        ✅ Registration successful! <Link to="/login">Login here</Link>
      </div>
    )}

    <form onSubmit={handleSubmit} className="register-form">
      {/* Role Selection - Always visible at top */}
      <div className="form-group role-selection">
        <label>I want to register as:</label>
        <div className="role-buttons">
          <button
            type="button"
            className={`role-btn ${formData.role === 'freelancer' ? 'active' : ''}`}
            onClick={() => setFormData({...formData, role: 'freelancer'})}
          >
            <span className="role-icon">👨‍💻</span>
            <span className="role-text">Freelancer</span>
            <span className="role-desc">Offer Services</span>
          </button>
          <button
            type="button"
            className={`role-btn ${formData.role === 'client' ? 'active' : ''}`}
            onClick={() => setFormData({...formData, role: 'client'})}
          >
            <span className="role-icon">👔</span>
            <span className="role-text">Client</span>
            <span className="role-desc">Hire Talent</span>
          </button>
        </div>
      </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                  />
                  {errors.firstName && <span className="error">{errors.firstName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="password">Password *</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create password"
                  />
                  {errors.password && <span className="error">{errors.password}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password *</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                  />
                  {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <div className="input-with-prefix">
                  <span className="prefix">+91</span>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength="10"
                    placeholder="Enter 10-digit number"
                  />
                </div>
                {errors.phone && <span className="error">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="address">Address *</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your full address"
                  rows="3"
                />
                {errors.address && <span className="error">{errors.address}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="state">State *</label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                  >
                    <option value="">Select State</option>
                    {states.map(s => (
                      <option key={s.id || s.stateId} value={s.name || s.stateName}>
                        {s.name || s.stateName}
                      </option>
                    ))}
                  </select>
                  {errors.state && <span className="error">{errors.state}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="city">City *</label>
                  <select
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    disabled={!formData.stateId}
                  >
                    <option value="">Select City</option>
                    {cities.map(c => (
                      <option key={c.id || c.cityId} value={c.name || c.cityName}>
                        {c.name || c.cityName}
                      </option>
                    ))}
                  </select>
                  {errors.city && <span className="error">{errors.city}</span>}
                </div>
              </div>

              <button type="submit" className="register-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </button>

              <div className="login-link">
                Already have an account? <Link to="/login">Sign in</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;