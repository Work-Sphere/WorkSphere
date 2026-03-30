import React, { useEffect, useState } from "react";
import api from "../../../api.js/axios.js";

const CreateComplaint = ({ onCreated }) => {
  const [description, setDescription] = useState("");
  const [userServiceId, setUserServiceId] = useState("");
  const [userServices, setUserServices] = useState([]);

  // ✅ SINGLE SOURCE OF TRUTH
  const fromUserId = localStorage.getItem("uid");

  useEffect(() => {
    if (!fromUserId) {
      console.error("User ID not found in localStorage");
      return;
    }

    api
      .get("/client/user-services", {
        params: { clientId: fromUserId },
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setUserServices(res.data);
        } else {
          console.error("User services response is not array:", res.data);
          setUserServices([]);
        }
      })
      .catch((err) => console.error("User services error:", err));
  }, [fromUserId]);

  const submitComplaint = () => {
    if (!fromUserId || !userServiceId || !description.trim()) return;

    api
      .post("/client/complaints", {
        fromUserId: Number(fromUserId),
        userServiceId: Number(userServiceId),
        description,
      })
      .then(() => {
        setDescription("");
        setUserServiceId("");
        if (onCreated) onCreated();
      })
      .catch((err) => console.error("Create complaint error:", err));
  };

  return (
    <div className="complaint-box">
      <h4>Raise Complaint</h4>

      <select
        value={userServiceId}
        onChange={(e) => setUserServiceId(e.target.value)}
      >
        <option value="">Select Service & Freelancer</option>

        {userServices.map((us, index) => (
          <option
            key={`${us.userServiceId}-${index}`}
            value={us.userServiceId}
          >
            {us.serviceName} - {us.freelancerName?.trim()} (₹{us.customPrice})
          </option>
        ))}
      </select>

      <textarea
        placeholder="Describe your issue"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button onClick={submitComplaint}>Submit</button>
    </div>
  );
};

export default CreateComplaint;
