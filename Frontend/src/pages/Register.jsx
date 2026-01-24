<<<<<<< HEAD
<<<<<<< HEAD
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './SharedAuth.css';
=======
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
>>>>>>> 51d3d022c4b594d44842d1264134c195eb7180c7

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
<<<<<<< HEAD
    address: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'phone':
        if (value && !/^\d{10}$/.test(value)) {
          error = 'Phone must be exactly 10 digits';
        }
        break;
      case 'email':
        if (value && !/@gmail\.com$/.test(value)) {
          error = 'Email must end with @gmail.com';
        }
        break;
      case 'password':
        if (value.length < 8) {
          error = 'Password must be minimum 8 characters';
        }
        break;
      case 'firstName':
        if (value && !/^[a-zA-Z\s]+$/.test(value)) {
          error = 'First name should only contain alphabets';
        }
        break;
      default:
        break;
    }

    setErrors(prev => ({ ...prev, [name]: error }));
=======
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
>>>>>>> 51d3d022c4b594d44842d1264134c195eb7180c7
  };

  const validateOnSubmit = () => {
    const newErrors = {};
<<<<<<< HEAD
    const requiredFields = ['role', 'firstName', 'password', 'phone', 'address'];

    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        newErrors[field] = `${field} is required`;
      }
    });

    setErrors(newErrors);
=======

    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm password is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.stateId) newErrors.state = 'State is required';
    if (!formData.cityId) newErrors.city = 'City is required';

    if (formData.email && !formData.email.endsWith('@gmail.com')) {
      newErrors.email = 'Email must end with @gmail.com';
    }

    setErrors(prev => ({ ...prev, ...newErrors }));
>>>>>>> 51d3d022c4b594d44842d1264134c195eb7180c7
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
    if (!validateForm()) return;

    setLoading(true);

    try {
      const registerData = {
        Rid: formData.role === 'freelancer' ? 1 : 2,
        Fname: formData.firstName,
        Lname: formData.lastName || null,
        Email: formData.email || null,
        Pass: formData.password,
        Phone: formData.phone,
        Addr: formData.address,

        // ✅ TEMP DEFAULTS (until DB APIs added)
        State: 1,
        City: 1
      };

      const response = await axios.post(
        'https://localhost:7239/api/auth/register',
        registerData
      );

      alert(response.data);

=======
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

      if (!response.ok) throw new Error('Registration failed');

      setRegistrationSuccess(true);
>>>>>>> 51d3d022c4b594d44842d1264134c195eb7180c7
      setFormData({
        role: 'freelancer',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
<<<<<<< HEAD
        address: ''
      });
      setErrors({});
    } catch (error) {
      alert(error.response?.data || 'Registration failed!');
      console.error(error);
    } finally {
      setLoading(false);
=======
        address: '',
        state: '',
        city: '',
        stateId: '',
        cityId: ''
      });
      setErrors({});
    } catch (err) {
      setApiError(err.message);
    } finally {
      setIsSubmitting(false);
>>>>>>> 51d3d022c4b594d44842d1264134c195eb7180c7
    }
  };

  return (
    <div className="auth-container">
      <h2>Registration Form</h2>

<<<<<<< HEAD
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label>Role *</label>
=======
      {apiError && <div className="api-error-banner">⚠️ {apiError}</div>}
      {registrationSuccess && (
        <div className="api-error-banner" style={{ background: '#eafaf1', color: '#1e8449' }}>
          ✅ Registration successful
        </div>
      )}

      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Role</label>
>>>>>>> 51d3d022c4b594d44842d1264134c195eb7180c7
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="freelancer">Freelancer</option>
            <option value="client">Client</option>
          </select>
<<<<<<< HEAD
        </div>

        <input name="firstName" placeholder="First Name" onChange={handleChange} />
        <input name="lastName" placeholder="Last Name (Optional)" onChange={handleChange} />
        <input name="email" placeholder="Email (Optional)" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <input name="phone" placeholder="Phone" onChange={handleChange} />
        <textarea name="address" placeholder="Address" onChange={handleChange} />

        <button disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      <p style={{ textAlign: 'center' }}>
        Already registered? <Link to="/login">Login here</Link>
=======
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>First Name</label>
            <input name="firstName" value={formData.firstName} onChange={handleChange} />
            {errors.firstName && <span className="error">{errors.firstName}</span>}
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input name="lastName" value={formData.lastName} onChange={handleChange} />
          </div>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input name="phone" value={formData.phone} onChange={handleChange} />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label>Address</label>
          <textarea name="address" value={formData.address} onChange={handleChange} />
          {errors.address && <span className="error">{errors.address}</span>}
        </div>

        <div className="form-group">
          <label>State</label>
          <select name="state" value={formData.state} onChange={handleChange}>
            <option value="">Select State</option>
            {states.map(s => (
              <option key={s.id || s.stateId}>{s.name || s.stateName}</option>
            ))}
          </select>
          {errors.state && <span className="error">{errors.state}</span>}
        </div>

        <div className="form-group">
          <label>City</label>
          <select name="city" value={formData.city} onChange={handleChange} disabled={!formData.stateId}>
            <option value="">Select City</option>
            {cities.map(c => (
              <option key={c.id || c.cityId}>{c.name || c.cityName}</option>
            ))}
          </select>
          {errors.city && <span className="error">{errors.city}</span>}
        </div>

        <button className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '25px' }}>
        Already registered? <Link to="/login">Login</Link>
>>>>>>> 51d3d022c4b594d44842d1264134c195eb7180c7
      </p>
    </div>
  );
}

export default Register;
  
=======
import React from 'react'

function Register() {
  return (
    <div>Register</div>
  )
}

export default Register
>>>>>>> parent of f44ebf5 (Merge branch 'Tejas' of https://github.com/Work-Sphere/WorkSphere)
