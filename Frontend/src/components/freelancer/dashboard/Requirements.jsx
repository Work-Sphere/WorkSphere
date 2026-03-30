import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../../context/SearchContext";
import {
  getOpenRequirements,
  applyForRequirement,
} from "../api/FreelancerApi";
import "./Requirements.css";

const Requirements = () => {
  const [requirements, setRequirements] = useState([]);
  const navigate = useNavigate();
  const { searchQuery } = useSearch();

  useEffect(() => {
    loadRequirements();
  }, []);

  const loadRequirements = async () => {
    const res = await getOpenRequirements();
    setRequirements(res.data);
  };

  const handleApply = async (id) => {
    try {
      await applyForRequirement(id);

      // remove from requirements list
      setRequirements((prev) =>
        prev.filter((r) => r.requirementId !== id)
      );

      alert("Applied successfully");

      // redirect to My Projects
      navigate("/freelancer/projects");
    } catch (err) {
      alert("Failed to apply");
    }
  };

  return (
    <div className="manage-skills-container">
      {/* HEADER SECTION */}
      <div className="header-section">
        <div className="header-text">
          <h2 className="title">View Requirements</h2>
          <p className="subtitle">
            Browse and apply to client requirements
          </p>
        </div>
      </div>

      {/* REQUIREMENTS LIST */}
      <div className="skills-grid">
        {requirements.filter(req => 
          req.serviceName?.toLowerCase().includes(searchQuery.toLowerCase()) || 
          req.description?.toLowerCase().includes(searchQuery.toLowerCase())
        ).length === 0 ? (
          <div className="empty-state">
            No requirements available right now.
          </div>
        ) : (
          requirements
            .filter(req => 
              req.serviceName?.toLowerCase().includes(searchQuery.toLowerCase()) || 
              req.description?.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((req) => (
            <div key={req.requirementId} className="skill-card">
              <div className="skill-info">
                <span className="service-tag">
                  Service : {req.serviceName}
                </span>

                <h3>{req.description}</h3>

                <div className="meta-info">
                  <span>
                    <strong>Budget:</strong> ₹{req.budget}
                  </span>
                  <span>
                    <strong>Deadline:</strong>{" "}
                    {req.deadline
                      ? new Date(req.deadline).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
              </div>

              <div className="skill-actions">
                <button
                  className="btn-success"
                  onClick={() => handleApply(req.requirementId)}
                >
                  Apply
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Requirements;
