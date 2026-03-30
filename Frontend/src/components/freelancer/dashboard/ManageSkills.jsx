import React, { useEffect, useState } from "react";
import {
  getMyServices,
  addService,
  updateService,
  deleteService,
  getAllServices,
} from "../api/FreelancerApi";
import "./ManageSkills.css";

const ManageSkills = () => {
  const [services, setServices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allServices, setAllServices] = useState([]);
  const [showWarning, setShowWarning] = useState(false); // New State
  const [formData, setFormData] = useState({
    userServiceId: null,
    serviceId: "",
    customPrice: "",
    experience: "",
    details: "",
  });

  useEffect(() => {
    loadServices();

    getAllServices()
      .then((res) => setAllServices(res.data))
      .catch((err) => console.error(err));
  }, []);

  const loadServices = () => {
    getMyServices()
      .then((res) => setServices(res.data))
      .catch((err) => console.error(err));
  };

  // Open modal for ADD
  const openAddModal = () => {
    setFormData({
      userServiceId: null,
      serviceId: "",
      customPrice: "",
      experience: "",
      details: "",
    });
    setIsModalOpen(true);
    setShowWarning(false);
  };

  // Open modal for EDIT
  const openEditModal = (srv) => {
    setFormData({
      userServiceId: srv.userServiceId,
      serviceId: srv.serviceId,
      customPrice: srv.customPrice,
      experience: srv.experience,
      details: srv.details,
    });
    setIsModalOpen(true);
    setShowWarning(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setShowWarning(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();

    const action = formData.userServiceId
      ? updateService(formData.userServiceId, formData)
      : addService(formData);

    action
      .then(() => {
        closeModal();
        loadServices();
      })
      .catch(() => alert("Failed to save service"));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;

    deleteService(id).then(loadServices);
  };

  return (
    <div className="manage-skills-page manage-skills-container">
      {/* HEADER SECTION - Button moved to top right via CSS */}
      <div className="header-section">
        <div className="header-text">
          <h2 className="title">My Skills</h2>
          <p className="subtitle">
            List and manage the professional services you offer
          </p>
        </div>

        <button className="add-skill-btn" onClick={openAddModal}>
          + Add Skill
        </button>
      </div>

      {/* SKILLS LIST */}
      <div className="skills-grid">
        {services.length === 0 ? (
          <div className="empty-state">
            No services added yet. Click “Add New Skill” to start.
          </div>
        ) : (
          services.map((srv) => (
            <div key={srv.userServiceId} className="skill-card">
              <div className="skill-info">
                <span className="service-tag">Service : {srv.serviceName}</span>

                <h3>{srv.details || "Service Details"}</h3>

                <div className="meta-info">
                  <span>
                    <strong>Experience:</strong> {srv.experience}
                  </span>
                  <span>
                    <strong>Price:</strong> ₹{srv.customPrice}
                  </span>
                </div>
              </div>

              <div className="skill-actions">
                <button
                  className="edit-link"
                  onClick={() => openEditModal(srv)}
                >
                  Edit
                </button>

                <button
                  className="delete-link"
                  onClick={() => handleDelete(srv.userServiceId)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>
                {formData.userServiceId ? "Update Skill" : "Add New Skill"}
              </h3>
              <button className="close-x" onClick={closeModal}>
                ×
              </button>
            </div>

            <form onSubmit={handleSave}>
              <div className="form-grid">

                {/* SERVICE DROPDOWN - MODIFIED */}
                <div className="form-group">
                  <label>Service</label>
                  {/* Wrapper to capture click when disabled */}
                  <div
                    onClick={() => formData.userServiceId && setShowWarning(true)}
                    style={{
                      display: 'inline-block',
                      width: '100%'
                    }}
                  >
                    <select
                      name="serviceId"
                      value={formData.serviceId}
                      onChange={handleChange}
                      required
                      disabled={!!formData.userServiceId}
                      style={formData.userServiceId ? { cursor: "not-allowed", opacity: 0.7 } : {}}
                    >
                      <option value="">Select a Service</option>
                      {allServices.map((service) => (
                        <option key={service.serviceId} value={service.serviceId}>
                          {service.serviceName}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* WARNING MESSAGE - ONLY SHOWS ON CLICK */}
                  {showWarning && formData.userServiceId && (
                    <div style={{
                      marginTop: "8px",
                      padding: "8px",
                      backgroundColor: "#fff3cd",
                      borderLeft: "4px solid #ffc107",
                      fontSize: "13px",
                      color: "#856404",
                      animation: "fadeIn 0.3s"
                    }}>
                      <strong>Note:</strong> Service category cannot be changed. Add a new skill for a different service.
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label>Price (₹)</label>
                  <input
                    type="number"
                    name="customPrice"
                    value={formData.customPrice}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label>Experience (Years)</label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    min="0"
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label>Details / Description</label>
                  <textarea
                    rows="4"
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button type="submit" className="btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSkills;
