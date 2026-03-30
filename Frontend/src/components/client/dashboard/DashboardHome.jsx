import React, { useEffect, useState } from "react";
import { getSummary } from "../api/ClientApi";
import "./DashboardHome.css";

const DashboardHome = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSummary();
  }, []);

  const loadSummary = async () => {
    try {
      const res = await getSummary();
      setStats(res.data);
    } catch (err) {
      console.error("Dashboard error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  if (!stats) {
    return <p>Unable to load dashboard data</p>;
  }

  return (
    <div className="client-dashboard-home">
      <h2 className="dashboard-title">Client Dashboard</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>{stats.totalRequirements}</h3>
          <p>Total Requirements</p>
        </div>

        <div className="stat-card">
          <h3>{stats.activeProjects}</h3>
          <p>Active Projects</p>
        </div>

        <div className="stat-card">
          <h3>{stats.pendingRequests}</h3>
          <p>Pending Requests</p>
        </div>

        <div className="stat-card">
          <h3>₹{stats.totalAmountPaid}</h3>
          <p>Total Amount Paid</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
