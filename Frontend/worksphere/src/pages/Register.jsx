import React, { useState } from 'react';
import './Register.css';

function Register() {
  const [formData, setFormData] = useState({
    role: 'freelancer',
    firstName: '',
    lastName: '',     // Optional
    email: '',        // Optional  
    password: '',
    phone: '',
    address: '',
    state: '',
    city: ''
  });

  const [errors, setErrors] = useState({});

  // Indian states and cities
  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Andaman and Nicobar Islands',
    'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Lakshadweep', 'Puducherry'
  ];

  const indianCities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai', 
    'Kolkata', 'Surat', 'Pune', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur',
    'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad', 'Patna',
    'Vadodara', 'Ghaziabad', 'Ludhiana', 'Nashik', 'Faridabad', 'Meerut'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Real-time validation
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
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(value)) {
          error = 'Password must contain uppercase, lowercase, number & special character';
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

    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    // MANDATORY FIELDS ONLY (except lastName and email)
    const requiredFields = ['role', 'firstName', 'password', 'phone', 'address', 'state', 'city'];
    
    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });

    // Custom validations for filled fields only
    if (formData.phone) validateField('phone', formData.phone);
    if (formData.email) validateField('email', formData.email);
    if (formData.password) validateField('password', formData.password);
    if (formData.firstName) validateField('firstName', formData.firstName);

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const fullName = formData.firstName + (formData.lastName ? ` ${formData.lastName}` : '');
      console.log('Form submitted:', { ...formData, fullName });
      alert('Registration successful!');
      
      // Reset form
      setFormData({
        role: 'freelancer',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        state: '',
        city: ''
      });
      setErrors({});
    }
  };

  return (
    <div className="register-container">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit} className="register-form">
        {/* Role Field - MANDATORY */}
        <div className="form-group">
          <label htmlFor="role">Role <span style={{color: '#e74c3c'}}>*</span>:</label>
          <select id="role" name="role" value={formData.role} onChange={handleChange} required>
            <option value="">Select Role</option>
            <option value="freelancer">Freelancer</option>
            <option value="client">Client</option>
          </select>
          {errors.role && <span className="error">{errors.role}</span>}
        </div>
        
        {/* First Name & Last Name */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name <span style={{color: '#e74c3c'}}>*</span>:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            {errors.firstName && <span className="error">{errors.firstName}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name (Optional):</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Email - OPTIONAL */}
        <div className="form-group">
          <label htmlFor="email">Email (Optional):</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        
        {/* Password - MANDATORY */}
        <div className="form-group">
          <label htmlFor="password">Password <span style={{color: '#e74c3c'}}>*</span>:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        
        {/* Phone - MANDATORY */}
        <div className="form-group">
          <label htmlFor="phone">Phone <span style={{color: '#e74c3c'}}>*</span>:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            maxLength="10"
            required
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>
        
        {/* Address - MANDATORY */}
        <div className="form-group">
          <label htmlFor="address">Address <span style={{color: '#e74c3c'}}>*</span>:</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          {errors.address && <span className="error">{errors.address}</span>}
        </div>

        {/* State - MANDATORY */}
        <div className="form-group">
          <label htmlFor="state">State <span style={{color: '#e74c3c'}}>*</span>:</label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            list="states"
            placeholder="Type to search state..."
            required
          />
          <datalist id="states">
            {indianStates.map((state, index) => (
              <option key={index} value={state} />
            ))}
          </datalist>
          {errors.state && <span className="error">{errors.state}</span>}
        </div>

        {/* City - MANDATORY */}
        <div className="form-group">
          <label htmlFor="city">City <span style={{color: '#e74c3c'}}>*</span>:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            list="cities"
            placeholder="Type to search city..."
            required
          />
          <datalist id="cities">
            {indianCities.map((city, index) => (
              <option key={index} value={city} />
            ))}
          </datalist>
          {errors.city && <span className="error">{errors.city}</span>}
        </div>
        
        <button type="submit" className="submit-btn">Register</button>
      </form>
      
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <p>
          Already registered?{' '}
          <a href="/login" style={{ color: '#3498db', textDecoration: 'none', fontWeight: '600' }}>
            Login here
          </a>
        </p>
        <small style={{color: '#7f8c8d', marginTop: '10px', display: 'block'}}>
          * Required fields
        </small>
      </div>
    </div>
  );
}

export default Register;
