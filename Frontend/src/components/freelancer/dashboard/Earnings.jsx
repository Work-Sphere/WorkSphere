import React from 'react';
import './Earnings.css';

const Earnings = () => {
  const transactions = [
    { id: 1, project: "Website Redesign", amount: "₹19,200", date: "2026-01-20", status: "Paid" },
    { id: 2, project: "Logo Design", amount: "₹4500", date: "2026-01-15", status: "Paid" },
    { id: 3, project: "SEO Optimization", amount: "₹8000", date: "2026-01-10", status: "Pending" },
  ];

  return (
    <div className="earnings-container">
      <h2 className="page-title">Earnings Overview</h2>
      
      {/* Summary Section */}
      <div className="earnings-summary">
        <div className="stat-card balance-card">
          <p className="stat-label">Total Balance</p>
          <h2 className="stat-value">₹29,450.00</h2>
        </div>
        
        <div className="stat-card pending-card">
          <p className="stat-label">Pending Payments</p>
          <h2 className="stat-value">₹8000.00</h2>
        </div>
      </div>

      <h4 className="section-title">Recent Transactions</h4>
      <div className="table-wrapper">
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Project</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id}>
                <td>{t.project}</td>
                <td className="amount-cell">{t.amount}</td>
                <td>{t.date}</td>
                <td>
                  <span className={`status-badge ${t.status.toLowerCase()}`}>
                    {t.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Earnings;