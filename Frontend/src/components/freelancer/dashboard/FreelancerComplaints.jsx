import React, { useEffect, useState } from "react";
import { useSearch } from "../../../context/SearchContext";
import { getMyComplaints } from "../api/FreelancerApi";

const FreelancerComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState("");
  const { searchQuery } = useSearch();

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    try {
      const res = await getMyComplaints();
      setComplaints(res.data || []);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load complaints");
      setComplaints([]);
    }
  };

  return (
    <div className="dashboard-content-inner">
      <h2 className="title">Complaints Against Me</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {complaints.filter(c => 
        c.serviceName?.toLowerCase().includes(searchQuery.toLowerCase()) || 
        c.description?.toLowerCase().includes(searchQuery.toLowerCase())
      ).length === 0 ? (
        <p>No complaints found. Keep up the good work!</p>
      ) : (
        complaints
          .filter(c => 
            c.serviceName?.toLowerCase().includes(searchQuery.toLowerCase()) || 
            c.description?.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((c) => (
          <div
            key={c.id}
            className="stat-card"
            style={{
              marginBottom: "16px",
              padding: "16px",
              borderRadius: "8px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              backgroundColor: "transparent",
              boxShadow: "none",
            }}
          >
            <h4 style={{ margin: "0 0 8px 0", fontSize: "1rem", color: "#ffffff" }}>
              {c.serviceName || "General Service"}
            </h4>

            <p style={{ margin: "0 0 12px 0", fontSize: "0.9rem", color: "#e2e8f0" }}>
              {c.description}
            </p>

            <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
              <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
                {c.createDate
                  ? new Date(c.createDate).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FreelancerComplaints;
