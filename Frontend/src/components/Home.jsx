import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>Welcome to WorkSphere</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '40px' }}>
        Connect with freelancers and clients in our platform
      </p>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link
          to="/login"
          style={{
            padding: '15px 30px',
            background: 'linear-gradient(135deg, #3498db, #2980b9)',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '10px',
            fontSize: '1.1rem',
            fontWeight: '600',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          Login
        </Link>
        <Link
          to="/register"
          style={{
            padding: '15px 30px',
            background: 'linear-gradient(135deg, #27ae60, #2ecc71)',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '10px',
            fontSize: '1.1rem',
            fontWeight: '600',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          Register
        </Link>
      </div>
    </div>
  );
}

export default Home;
