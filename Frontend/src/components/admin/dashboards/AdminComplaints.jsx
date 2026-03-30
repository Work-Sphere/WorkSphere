import { useEffect, useState } from "react";
import { useSearch } from "../../../context/SearchContext";
import api from "../../../api.js/axios.js";
import "./AdminComplaints.css";

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState("");
  const { searchQuery } = useSearch();

  // ===============================
  // FETCH COMPLAINTS
  // ===============================
  const fetchComplaints = async () => {
    try {
      const res = await api.get("/admin/complaints");
      setComplaints(res.data);
    } catch (err) {
      setError("Admin not logged in or session expired");
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // ===============================
  // BLOCK / UNBLOCK FREELANCER
  // ===============================
  const toggleBlock = async (freelancerId) => {
    try {
      await api.put(`/admin/users/block-toggle/${freelancerId}`);

      setComplaints((prev) =>
        prev.map((c) =>
          c.freelancerId === freelancerId
            ? { ...c, isFreelancerBlocked: !c.isFreelancerBlocked }
            : c
        )
      );
    } catch (err) {
      alert("Failed to update block status");
    }
  };

  if (error) return <p className="error">{error}</p>;

  /* 🔹 FILTER COMPLAINTS */
  const filteredComplaints = complaints.filter((c) =>
    c.freelancerName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /* 🔹 GROUP COMPLAINTS BY FREELANCER */
  const groupedComplaints = filteredComplaints.reduce((acc, c) => {
    if (!acc[c.freelancerId]) {
      acc[c.freelancerId] = {
        freelancerId: c.freelancerId,
        freelancerName: c.freelancerName,
        isFreelancerBlocked: c.isFreelancerBlocked,
        complaints: [],
      };
    }
    acc[c.freelancerId].complaints.push(c);
    return acc;
  }, {});

  return (
    <div className="admin-complaints">
      <h2>Complaints</h2>

      {complaints.length === 0 && <p>No complaints found</p>}

      {Object.values(groupedComplaints).map((freelancer) => (
        <div key={freelancer.freelancerId} className="complaint-card">
          {/* BLOCK / UNBLOCK BUTTON */}
          <button
            className={`block-btn ${
              freelancer.isFreelancerBlocked ? "unblock" : "block"
            }`}
            onClick={() => toggleBlock(freelancer.freelancerId)}
          >
            {freelancer.isFreelancerBlocked ? "Unblock" : "Block"}
          </button>

          <h3>Freelancer: {freelancer.freelancerName}</h3>

          {freelancer.complaints.map((c, index) => (
            <div key={c.complaintId} className="complaint-item">
              <p>
                <b>{index + 1}. Description:</b> {c.description}
              </p>

              <small>
                <b>Service:</b> {c.serviceName}
              </small>
              <br />

              <small>
                <b>Date:</b>{" "}
                {c.createDate
                  ? new Date(c.createDate).toLocaleDateString()
                  : "N/A"}
              </small>

              <hr />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AdminComplaints;
