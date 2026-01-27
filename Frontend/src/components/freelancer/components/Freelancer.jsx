import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Navbar from "../../../pages/Navbar";
import './Freelancer.css';

const FreelancerDashboard = () => {
  const location = useLocation();

  return (
    <div className="dashboard-wrapper">
      <Navbar />

      <div className="dashboard-main-area">
        <aside className="sidebar">
          
          <nav className="sidebar-nav">
            <ul>
              <li>
                <Link to="/freelancer" className={location.pathname === "/freelancer" ? "active" : ""}>
                  <i className="bi bi-speedometer2"></i> Dashboard
                </Link>
              </li>
              <li>
                <Link to="/freelancer/projects" className={location.pathname === "/freelancer/projects" ? "active" : ""}>
                  <i className="bi bi-briefcase"></i> My Projects
                </Link>
              </li>
              <li>
                <Link to="/freelancer/earnings" className={location.pathname === "/freelancer/earnings" ? "active" : ""}>
                  <i className="bi bi-wallet2"></i> Earnings
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="dashboard-content">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default FreelancerDashboard;