import React, { useEffect, useState } from "react";
import { useSearch } from "../../../context/SearchContext";
import { getMyProjects } from "../api/FreelancerApi";
import GenerateBill from "./GenerateBill";
import "./Projects.css";

const Projects = () => {
  const [projectList, setProjectList] = useState([]);
  const [billRequested, setBillRequested] = useState({});
  const { searchQuery } = useSearch();

  useEffect(() => {
    getMyProjects()
      .then((res) => {
        setProjectList(res.data);
      })
      .catch((err) => {
        console.error("Error fetching projects", err);
      });
  }, []);

  // called after bill generation
  const handleBillGenerated = (requestId) => {
    setBillRequested((prev) => ({
      ...prev,
      [requestId]: true
    }));
  };

  return (
    <div className="projects-container">
      <h2 className="projects-title">My Projects</h2>

      <div className="projects-table-wrapper">
        <table className="projects-table">
          <thead>
            <tr>
              <th>Project</th>
              <th>Status</th>
              <th>Deadline</th>
              <th>Budget</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {(projectList.filter(project => 
              project.serviceName?.toLowerCase().includes(searchQuery.toLowerCase())
            )).length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No projects found
                </td>
              </tr>
            ) : (
              projectList
                .filter(project => 
                  project.serviceName?.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((project) => (
                <tr key={project.requestId}>
                  {/* Project name */}
                  <td className="project-name">
                    {project.serviceName}
                  </td>

                  {/* Status */}
                  <td>
                    <span
                      className={`status-badge ${project.applicationStatus
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {project.applicationStatus}
                    </span>
                  </td>

                  {/* Deadline */}
                  <td>
                    {project.deadline
                      ? new Date(project.deadline).toLocaleDateString()
                      : "N/A"}
                  </td>

                  {/* Cost (budget / agreed cost) */}
                  <td>
                    ₹{project.budget ?? "—"}
                  </td>

                  {/* Action */}
                  <td className="actions-cell">
                    {project.billStatus === "PAID" ? (
                      <span className="status-badge paid">Paid</span>
                    ) : project.billStatus === "PENDING" ? (
                      <span className="payment-requested">Requested</span>
                    ) : (
                      project.applicationStatus === "ACCEPTED" && (
                        <GenerateBill
                          requirementId={project.requirementId}
                          serviceId={project.serviceId}
                          budget={project.budget}
                          onBillGenerated={() => window.location.reload()}
                        />
                      )
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Projects;
