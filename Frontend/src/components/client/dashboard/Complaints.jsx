import React, { useEffect, useState } from "react";
import { useSearch } from "../../../context/SearchContext";
import api from "../../../api.js/axios.js";
import "./Complaints.css";

const Complaints = () => {
  // ✅ SINGLE SOURCE OF TRUTH
  const clientId = localStorage.getItem("uid");

  const [complaints, setComplaints] = useState([]);
  const [userServices, setUserServices] = useState([]);
  const [userServiceId, setUserServiceId] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const { searchQuery } = useSearch();

  useEffect(() => {
    if (!clientId) {
      console.error("Client ID not found in localStorage");
      return;
    }

    fetchComplaints();
    fetchUserServices();
  }, [clientId]);

  const fetchComplaints = () => {
    api
      .get("/client/complaints", {
        params: { fromUserId: clientId },
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setComplaints(res.data);
        } else {
          setComplaints([]);
        }
      })
      .catch((err) => console.error("Complaints error:", err));
  };

  const fetchUserServices = () => {
    api
      .get("/client/user-services", {
        params: { clientId },
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setUserServices(res.data);
        } else {
          console.error("userServices response is NOT an array:", res.data);
          setUserServices([]);
        }
      })
      .catch((err) => console.error("User services error:", err));
  };

  const submitComplaint = () => {
    if (!userServiceId || !description.trim()) return;

    setLoading(true);

    api
      .post("/client/complaints", {
        fromUserId: Number(clientId),
        userServiceId: Number(userServiceId),
        description,
      })
      .then(() => {
        setDescription("");
        setUserServiceId("");
        fetchComplaints();
      })
      .finally(() => setLoading(false));
  };

  const resolveComplaint = (complaintId) => {
    api
      .put(`/client/complaints/${complaintId}/resolve`, null, {
        params: { fromUserId: clientId },
      })
      .then(fetchComplaints)
      .catch((err) => console.error("Resolve error:", err));
  };

  return (
    <div className="client-complaints">
      <div className="complaints-header">
        <h2>My Complaints</h2>
      </div>

      <div className="complaint-form-card">
        <h3>Raise Complaint</h3>

        <select
          value={userServiceId}
          onChange={(e) => setUserServiceId(e.target.value)}
        >
          <option value="">Select Service & Freelancer</option>

          {Array.isArray(userServices) &&
            userServices.map((us, index) => (
              <option
                key={`${us.userServiceId}-${index}`}
                value={us.userServiceId}
              >
                {us.serviceName} - {us.freelancerName?.trim()} (₹
                {us.customPrice})
              </option>
            ))}
        </select>

        <textarea
          placeholder="Describe your issue clearly..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button onClick={submitComplaint} disabled={loading}>
          {loading ? "Submitting..." : "Submit Complaint"}
        </button>
      </div>

    <div className="complaints-list">
        {complaints
          .filter((c) =>
            c.description?.toLowerCase().includes(searchQuery.toLowerCase())
          ).length === 0 ? (
          <p className="no-complaints">No matching complaints found.</p>
        ) : (
          complaints
            .filter((c) =>
              c.description?.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((c) => (
            <div key={c.complaintId} className="complaint-card">
              <p>
                <b>Service ID:</b> {c.serviceId}
              </p>
              <p>
                <b>Against Freelancer ID:</b> {c.toUserId}
              </p>
              <p>{c.description}</p>

              <span className={`status ${c.status.toLowerCase()}`}>
                {c.status}
              </span>

              {c.status === "PENDING" && (
                <button
                  className="resolve-btn"
                  onClick={() =>
                    resolveComplaint(c.complaintId)
                  }
                >
                  Mark as Resolved
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Complaints;
