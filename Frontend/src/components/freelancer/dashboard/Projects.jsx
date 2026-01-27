import React from 'react';
import './Projects.css';

const Projects = () => {
  const projectList = [
    { id: 1, title: "Website Redesign", client: "TechCorp", status: "In Progress", deadline: "2026-02-15" },
    { id: 2, title: "Logo Design", client: "ArtStudio", status: "Completed", deadline: "2026-01-20" },
    { id: 3, title: "Mobile App API", client: "InnoSoft", status: "Pending", deadline: "2026-03-01" },
  ];

  return (
    <div className="projects-container">
      <h2 className="projects-title">My Projects</h2>
      
      <div className="projects-table-wrapper">
        <table className="projects-table">
          <thead>
            <tr>
              <th>Project Title</th>
              <th>Client</th>
              <th>Status</th>
              <th>Deadline</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projectList.map((project) => (
              <tr key={project.id}>
                <td className="project-name">{project.title}</td>
                <td>{project.client}</td>
                <td>
                  <span className={`status-badge ${project.status.toLowerCase().replace(' ', '-')}`}>
                    {project.status}
                  </span>
                </td>
                <td>{project.deadline}</td>
                <td className="actions-cell">
                  <button className="btn-action view">View</button>
                  <button className="btn-action edit">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Projects;