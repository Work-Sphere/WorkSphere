import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import api from "../../../api.js/axios.js";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./AdminHome.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminHome = () => {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await api.get("/admin/dashboard/summary");
        setSummary(res.data);
      } catch (err) {
  console.error("ADMIN SUMMARY ERROR:", err.response || err);
  setError(
    err.response?.data?.message ||
    `Error ${err.response?.status || ""}`
  );
}
    };

    fetchSummary();
  }, []);

  if (error) return <p className="error">{error}</p>;
  if (!summary) return <p>Loading dashboard...</p>;

  /* ===============================
     MONTHLY ACTIVITY VALUES
     =============================== */
  const newUsers = Number(summary.newUsersThisMonth) || 0;
  const complaints = Number(summary.complaintsThisMonth) || 0;

  const hasActivity = newUsers + complaints > 0;

  /* ===============================
     PIE CHART DATA
     =============================== */
  const pieData = {
    labels: [
      "New Registrations (This Month)",
      "Complaints Raised (This Month)",
    ],
    datasets: [
      {
        data: hasActivity ? [newUsers, complaints] : [1],
        backgroundColor: hasActivity
          ? ["#2ee6a6", "#e74c3c"]
          : ["#444"],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "#ffffff",
          padding: 20,
        },
      },
    },
  };

  return (
    <div className="admin-home">
      <h2>Admin Dashboard</h2>

      {/* ===== STAT CARDS ===== */}
      <div className="stats-grid">
        <div className="stat-card clickable" onClick={() => navigate("/admin/users")}>
          Total Users <span>{summary.totalUsers}</span>
        </div>

        <div className="stat-card clickable" onClick={() => navigate("/admin/users?filter=active")}>
          Active Users <span>{summary.activeUsers}</span>
        </div>

        <div className="stat-card clickable" onClick={() => navigate("/admin/users?filter=blocked")}>
          Blocked Users <span>{summary.blockedUsers}</span>
        </div>

        <div className="stat-card clickable" onClick={() => navigate("/admin/users?role=freelancer")}>
          Freelancers <span>{summary.totalFreelancers}</span>
        </div>

        <div className="stat-card clickable" onClick={() => navigate("/admin/users?role=client")}>
          Clients <span>{summary.totalClients}</span>
        </div>

        <div className="stat-card clickable" onClick={() => navigate("/admin/services")}>
          Services <span>{summary.totalServices}</span>
        </div>

        <div className="stat-card clickable" onClick={() => navigate("/admin/complaints")}>
          Complaints <span>{summary.totalComplaints}</span>
        </div>

        <div className="stat-card clickable" onClick={() => navigate("/admin/users?filter=pending")}>
          Pending Requests <span>{summary.pendingUsers}</span>
        </div>
      </div>

      {/* ===== MONTHLY ACTIVITY REPORT ===== */}
      <div className="report-section">
        <h3>Monthly Activity Report</h3>

        {hasActivity ? (
          <div className="pie-wrapper">
            <Pie data={pieData} options={pieOptions} />
          </div>
        ) : (
          <p className="no-activity-text">
            No activity recorded for this month
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
