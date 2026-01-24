import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './SharedAuth.css';

function Register() {
  const [formData, setFormData] = useState({
    role: 'freelancer',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
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
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ['role', 'firstName', 'password', 'phone', 'address'];

    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        newErrors[field] = `${field} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

      setFormData({
        role: 'freelancer',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        address: ''
      });
      setErrors({});
    } catch (error) {
      alert(error.response?.data || 'Registration failed!');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Registration Form</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label>Role *</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="freelancer">Freelancer</option>
            <option value="client">Client</option>
          </select>
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
      </p>
    </div>
  );
}

export default Register;
  