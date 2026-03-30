import React, { useEffect, useState } from "react";
import api from "../../../api.js/axios.js";
import "./Projects.css";
import CreateRequirement from "./CreateRequirement";

const Projects = () => {
  // ✅ CORRECT SOURCE OF TRUTH
  const clientId = localStorage.getItem("uid");

  const [projects, setProjects] = useState([]);
  const [requestsMap, setRequestsMap] = useState({});
  const [loading, setLoading] = useState(false);

  // ========================
  // Fetch client requirements
  // ========================
  const fetchProjects = async () => {
    if (!clientId) {
      console.error("Client ID not found in localStorage");
      return;
    }

    setLoading(true);
    try {
      const res = await api.get("/client/requirements", {
        params: { clientId },
      });

      if (Array.isArray(res.data)) {
        setProjects(res.data);
      } else {
        console.error("Projects response is not array:", res.data);
        setProjects([]);
      }
    } catch (err) {
      console.error("Fetch projects error:", err);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  // ========================
  // Fetch requests for a requirement
  // ========================
  const fetchRequests = async (requirementId) => {
    try {
      const res = await api.get(
        `/client/requirements/${requirementId}/requests`
      );

      setRequestsMap((prev) => ({
        ...prev,
        [requirementId]: Array.isArray(res.data) ? res.data : [],
      }));
    } catch (err) {
      console.error("Fetch requests error:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [clientId]);

  return (
    <div className="client-projects">
      <div className="projects-header">
        <h2>My Projects</h2>
      </div>

      {/* Create new requirement */}
      <CreateRequirement onCreated={fetchProjects} />

      {loading ? (
        <p>Loading projects...</p>
      ) : projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        projects.map((p) => (
          <div key={p.requirementId} className="project-card">
            <div className="project-main">
              <p><b>ID:</b> {p.requirementId}</p>
              <p><b>Description:</b> {p.description}</p>

              {p.deadline && (
                <p><b>Deadline:</b> {p.deadline}</p>
              )}

              {p.experience != null && (
                <p>
                  <b>Experience Required:</b> {p.experience} Year
                </p>
              )}

              {p.budget != null && (
                <p><b>Budget:</b> ₹{p.budget}</p>
              )}

              <p>
                <b>Status:</b>{" "}
                <span className={`status ${p.status.toLowerCase()}`}>
                  {p.status}
                </span>
              </p>

              <button
                className="view-requests-btn"
                onClick={() => fetchRequests(p.requirementId)}
              >
                View Requests
              </button>
            </div>

            {/* Requests Section */}
            {requestsMap[p.requirementId] && (
              <div className="requests-box">
                {requestsMap[p.requirementId].length === 0 ? (
                  <p>No freelancer requests.</p>
                ) : (
                  <ul className="requests-list">
                    {requestsMap[p.requirementId].map((r) => (
                      <li key={r.requestId} className="request-item">
                        <span>
                          Freelancer: <b>{r.freelancerName}</b> | Service: <b>{r.serviceName}</b> |{" "}
                          <b className={`status ${r.status.toLowerCase()}`}>
                            {r.status}
                          </b>
                        </span>

                        {r.billStatus === "PENDING" && (
                          <button
                            className="accept-btn"
                            style={{ backgroundColor: "#10b981", marginLeft: "10px" }}
                            onClick={() => window.location.href = "/client/earnings"}
                          >
                            Pay Bill
                          </button>
                        )}

                        {r.status === "APPLIED" && (
                          <>
                            <button
                              className="accept-btn"
                              onClick={() =>
                                api
                                  .post(
                                    `/client/requests/${r.requestId}/accept`
                                  )
                                  .then(() =>
                                    fetchRequests(p.requirementId)
                                  )
                              }
                            >
                              Accept
                            </button>

                            <button
                              className="reject-btn"
                              onClick={() =>
                                api
                                  .post(
                                    `/client/requests/${r.requestId}/reject`
                                  )
                                  .then(() =>
                                    fetchRequests(p.requirementId)
                                  )
                              }
                            >
                              Reject
                            </button>
                          </>
                        )}

                        {r.status === "ACCEPTED" && (
                          <span className="accepted-msg">
                            ✔ Freelancer Selected
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Projects;
