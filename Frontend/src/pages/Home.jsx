import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css'; // Reuse the same styling

function Home() {
  return (
    <div className="register-container" style={{ maxWidth: '600px', margin: '50px auto' }}>
      <h1>Welcome to Our Platform</h1>
      <p className="welcome-text">
        Join our community of freelancers and clients. Get started by creating an account or logging in.
      </p>
      
      <div className="home-buttons" style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/register">
          <button className="submit-btn" style={{ 
            padding: '15px 40px', 
            fontSize: '18px',
            background: '#27ae60',
            border: 'none',
            borderRadius: '8px'
          }}>
            🚀 Register Now
          </button>
        </Link>
        
        <Link to="/login">
          <button className="submit-btn" style={{ 
            padding: '15px 40px', 
            fontSize: '18px',
            background: '#3498db',
            border: 'none',
            borderRadius: '8px'
          }}>
            🔐 Login
          </button>
        </Link>
      </div>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <p style={{ fontSize: '16px', color: '#7f8c8d' }}>
          Choose an option to get started with your account
        </p>
      </div>
    </div>
  );
}

export default Home;
