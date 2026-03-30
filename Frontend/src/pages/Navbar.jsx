import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const { searchQuery, setSearchQuery } = useSearch();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Define paths where we want local search (no redirect)
    const dashboardPaths = ['/admin', '/freelancer', '/client'];
    const isDashboard = dashboardPaths.some(path => location.pathname.startsWith(path));
    
    if (value && !isDashboard && location.pathname !== '/home') {
      navigate('/home');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('userName');
    
    if (token) {
      setIsLoggedIn(true);
      setUserName(name || 'User');
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('uid');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="home-navbar">
      {/* LOGO */}
      <Link to="/home" className="logo">WorkSphere</Link>

      {/* NAVIGATION LINKS */}
      <div className="nav-menu">
        <button 
          onClick={() => {
            if (isLoggedIn) {
              const role = Number(localStorage.getItem('role'));
              if (role === 1) navigate('/admin');
              else if (role === 2) navigate('/freelancer');
              else if (role === 3) navigate('/client');
            } else {
              navigate('/login');
            }
          }} 
          className="nav-link-btn"
        >
          Dashboard
        </button>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/services" className="nav-link">Services</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
      </div>

      {/* SEARCH BAR */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* NAV LINKS */}
      <div className="nav-links">
        {isLoggedIn ? (
          <div className="user-nav-info">
            <span className="welcome-msg">Welcome, {userName}</span>
            <button onClick={handleLogout} className="nav-logout">Logout</button>
          </div>
        ) : (
          <>
            <Link to="/login" className="nav-login">Login</Link>
            <Link to="/register" className="nav-signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;