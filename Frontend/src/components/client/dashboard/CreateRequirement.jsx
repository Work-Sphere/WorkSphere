import React, { useEffect, useState } from "react";
import api from "../../../api.js/axios.js";
import "./CreateRequirement.css";

const CreateRequirement = ({ onCreated }) => {
  // ✅ SINGLE SOURCE OF TRUTH
  const clientId = localStorage.getItem("uid");

  const [services, setServices] = useState([]);
  const [serviceId, setServiceId] = useState("");
  const [description, setDescription] = useState("");

  const [deadline, setDeadline] = useState("");
  const [experience, setExperience] = useState("");
  const [budget, setBudget] = useState("");

  // ========================
  // Fetch services
  // ========================
  useEffect(() => {
    api
      .get("/client/services")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setServices(res.data);
        } else {
          console.error("Services response is NOT array:", res.data);
          setServices([]);
        }
      })
      .catch((err) => {
        console.error("Fetch services error:", err);
        setServices([]);
      });
  }, []);

  // ========================
  // Submit requirement
  // ========================
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!clientId) {
      console.error("Client ID not found in localStorage");
      return;
    }

    api
      .post("/client/requirements", {
        clientId: Number(clientId),
        serviceId: Number(serviceId),
        description,
        deadline,
        experience,
        budget: Number(budget),
      })
      .then(() => {
        // reset form
        setServiceId("");
        setDescription("");
        setDeadline("");
        setExperience("");
        setBudget("");

        onCreated && onCreated();
      })
      .catch((err) =>
        console.error("Create requirement error:", err)
      );
  };

  return (
    <div className="requirement-form-wrapper">
      <h3>Create New Requirement</h3>

      <form onSubmit={handleSubmit} className="requirement-form">
        {/* Service */}
        <select
          value={serviceId}
          onChange={(e) => setServiceId(e.target.value)}
          required
        >
          <option value="">Select Service</option>

          {services.length === 0 ? (
            <option disabled>No services available</option>
          ) : (
            services.map((s) => (
              <option
                key={s.serviceId ?? s.service_id}
                value={s.serviceId ?? s.service_id}
              >
                {s.serviceName ?? s.service_name}
              </option>
            ))
          )}
        </select>

        {/* Description */}
        <input
          type="text"
          placeholder="Describe your requirement"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        {/* Deadline */}
        <input
          type="text"
          placeholder="Deadline"
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => {
            if (!e.target.value) e.target.type = "text";
          }}
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />

        {/* Experience */}
        <input
          type="text"
          placeholder="Required experience (e.g. 2+ years)"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          required
        />

        {/* Budget */}
        <input
          type="number"
          placeholder="Budget (₹)"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          required
        />

        {/* Submit */}
        <button type="submit">Post Requirement</button>
      </form>
    </div>
  );
};

export default CreateRequirement;
