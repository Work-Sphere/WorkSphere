import React, { useEffect, useState } from "react";

import { getMyProjects } from "../api/FreelancerApi";

const MyProject = () => {
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    getMyProjects()
      .then(res => setProjectList(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="projects-container">
      <h2 className="projects-title">My Projects</h2>

      <div className="projects-table-wrapper">
        <table className="projects-table">
          <thead>
            <tr>
              <th>Requirement ID</th>
              <th>Status</th>
              <th>Applied Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {projectList.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No projects found
                </td>
              </tr>
            ) : (
              projectList.map(project => (
                <tr key={project.requestId}>
                  <td className="project-name">
                    Requirement #{project.requirementId}
                  </td>

                  <td>
                    <span
                      className={`status-badge ${
                        project.status
                          ?.toLowerCase()
                          .replace(" ", "-")
                      }`}
                    >
                      {project.status}
                    </span>
                  </td>

                  <td>{project.requestDate || "N/A"}</td>

                  <td className="actions-cell">
                    <button className="btn-action view">View</button>
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

export default MyProject;
