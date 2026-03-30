import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DashboardHome.css";

import {
  getMyProjects,
  getMyEarnings,
  getOpenRequirements,
} from "../api/FreelancerApi";

const DashboardHome = () => {
  const navigate = useNavigate();

  const [activeProjects, setActiveProjects] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [openRequirements, setOpenRequirements] = useState(0);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      /* ================= PROJECTS ================= */
      const projectsRes = await getMyProjects();
      const activeCount = projectsRes.data.filter(
        (p) => p.applicationStatus === "APPROVED"
      ).length;
      setActiveProjects(activeCount);

      /* ================= EARNINGS ================= */
      const earningsRes = await getMyEarnings();
      setTotalEarnings(earningsRes.data.paidEarnings || 0);

      /* ================= REQUIREMENTS ================= */
      const requirementsRes = await getOpenRequirements();
      setOpenRequirements(requirementsRes.data.length);
    } catch (err) {
      console.error("Dashboard load failed", err);
    }
  };

  return (
    <div className="dashboard-content-inner">
      <header className="dashboard-header">
        <h2 className="title">Freelancer Dashboard</h2>
        <p className="subtitle">Welcome back! Here is your progress.</p>
      </header>

      {/* Statistic Cards Grid */}
      <div className="stats-grid">
        {/* ACTIVE PROJECTS */}
        <div className="stat-card">
          <div
            className="stat-info"
            onClick={() => navigate("/freelancer/projects")}
          >
            <p className="stat-label">Active Projects</p>
            <h3 className="stat-value">{activeProjects}</h3>
          </div>
          <i className="bi bi-briefcase stat-icon icon-primary"></i>
        </div>

        {/* TOTAL EARNINGS */}
        <div className="stat-card">
          <div
            className="stat-info"
            onClick={() => navigate("/freelancer/earnings")}
          >
            <p className="stat-label">Total Earnings</p>
            <h3 className="stat-value">₹{totalEarnings}</h3>
          </div>
          <i className="bi bi-wallet2 stat-icon icon-success"></i>
        </div>

        {/* OPEN REQUIREMENTS */}
        <div className="stat-card">
          <div
            className="stat-info"
            onClick={() => navigate("/freelancer/requirements")}
          >
            <p className="stat-label">Open Requirements</p>
            <h3 className="stat-value">{openRequirements}</h3>
          </div>
          <i className="bi bi-search stat-icon icon-warning"></i>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
