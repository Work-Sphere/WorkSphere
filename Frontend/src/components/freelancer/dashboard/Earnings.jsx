import React, { useEffect, useState } from "react";
import { getMyEarnings } from "../api/FreelancerApi";
import "./Earnings.css";

const Earnings = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEarnings();
  }, []);

  const loadEarnings = async () => {
    try {
      const res = await getMyEarnings();
      setData(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load earnings");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="loading-text">Loading earnings...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="earnings-container">
      <h2 className="page-title">Earnings Overview</h2>

      {/* ===== Summary Section ===== */}
      <div className="earnings-summary">
        <div className="stat-card balance-card">
          <p className="stat-label">Total Balance</p>
          <h2 className="stat-value">₹{data.paidEarnings}</h2>
        </div>

        <div className="stat-card pending-card">
          <p className="stat-label">Pending Payments</p>
          <h2 className="stat-value">₹{data.pendingEarnings}</h2>
        </div>
      </div>

      {/* ===== Transactions Section (optional / future-ready) ===== */}
      <h4 className="section-title">Recent Transactions</h4>

      <div className="table-wrapper">
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Total Paid</td>
              <td className="amount-cell">₹{data.paidEarnings}</td>
              <td>
                <span className="status-badge paid">Paid</span>
              </td>
            </tr>

            <tr>
              <td>Pending Amount</td>
              <td className="amount-cell">₹{data.pendingEarnings}</td>
              <td>
                <span className="status-badge pending">Pending</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Earnings;
