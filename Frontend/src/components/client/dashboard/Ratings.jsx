import React, { useEffect, useState } from "react";
import { getAcceptedProjects, getRatingsHistory, submitRating } from "../api/ClientApi";
import RateFreelancer from "./RateFreelancer";

const Ratings = () => {
  const [projects, setProjects] = useState([]);
  const [ratingHistory, setRatingHistory] = useState([]);

  useEffect(() => {
    loadProjects();
    loadHistory();
  }, []);

  const loadProjects = async () => {
    try {
      console.log("Fetching accepted projects for ratings...");
      const res = await getAcceptedProjects();
      console.log("Projects response:", res.data);
      setProjects(res.data);
    } catch (err) {
      console.error("Failed to load projects", err);
    }
  };

  const loadHistory = async () => {
    try {
      console.log("Fetching rating history...");
      const res = await getRatingsHistory();
      console.log("History response:", res.data);
      setRatingHistory(res.data);
    } catch (err) {
      console.error("History fetch error:", err);
    }
  };

  // Remove project from UI after rating
  const handleRated = (requirementId) => {
    setProjects((prev) =>
      prev.filter((p) => p.requirementId !== requirementId)
    );
    loadHistory(); // Refresh history
  };

  return (
    <div className="ratings-scope">
      <div className="rate-section">
        <h2>Rate Freelancers</h2>
        {projects.length === 0 ? (
          <p>No completed projects available for rating.</p>
        ) : (
          projects.map((p) => (
            <div key={p.requirementId} className="project-card">
              <p>
                <b>Project:</b> {p.description}
              </p>
              <p>
                <b>Freelancer ID:</b> {p.freelancerId}
              </p>

              <RateFreelancer
                freelancerId={p.freelancerId}
                serviceId={p.serviceId}
                onDone={() => handleRated(p.requirementId)}
              />
            </div>
          ))
        )}
      </div>

      <hr style={{ margin: "40px 0", opacity: 0.2 }} />

      <div className="history-section">
        <h2>My Rating History</h2>
        {ratingHistory.length === 0 ? (
          <p>You haven't provided any ratings yet.</p>
        ) : (
          <div className="history-list">
            {ratingHistory.map((r) => (
              <div
                key={r.ratingId}
                className="stat-card"
                style={{ marginBottom: "15px", padding: "15px" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "5px",
                  }}
                >
                  <span style={{ fontWeight: "bold", color: "#6366f1" }}>
                    {r.service?.service_name} — {r.toUser?.fname} {r.toUser?.lname}
                  </span>
                  <span style={{ color: "#f59e0b" }}>
                    {"★".repeat(r.rating)}
                    {"☆".repeat(5 - r.rating)}
                  </span>
                </div>

                <p style={{ margin: "0 0 10px 0", fontSize: "0.85rem", color: "#94a3b8", fontStyle: "italic" }}>
                  {r.service?.description}
                </p>

                <p style={{ margin: 0, fontSize: "0.95rem", color: "#cbd5e1" }}>
                  {r.review || "No review provided."}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Ratings;
