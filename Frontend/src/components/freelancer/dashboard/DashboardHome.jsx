import React from 'react';
import './DashboardHome.css';

const DashboardHome = () => {
  return (
    <div className="dashboard-content-inner">
      <header className="dashboard-header">
        <h2 className="title">Freelancer Dashboard</h2>
        <p className="subtitle">Welcome back! Here is your progress.</p>
      </header>

      {/* Statistic Cards Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-info">
            <p className="stat-label">Active Projects</p>
            <h3 className="stat-value">12</h3>
          </div>
          <i className="bi bi-briefcase stat-icon icon-primary"></i>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <p className="stat-label">Total Earnings</p>
            <h3 className="stat-value">₹29,450</h3>
          </div>
          <i className="bi bi-wallet2 stat-icon icon-success"></i>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <p className="stat-label">New Messages</p>
            <h3 className="stat-value">5</h3>
          </div>
          <i className="bi bi-chat-dots stat-icon icon-info"></i>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;