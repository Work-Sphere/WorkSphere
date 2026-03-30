import React, { useState } from "react";
import { submitRating } from "../api/ClientApi";
import "./RateFreelancer.css";

const RateFreelancer = ({ freelancerId, serviceId, onDone }) => {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);

    try {
      await submitRating({
        toUserId: freelancerId,
        serviceId,
        rating,
        review,
      });
      setReview("");
      onDone(); // notify parent
    } catch (err) {
      console.error("Rating error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rate-box">
      <label>Rating</label>
      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
      >
        {[5, 4, 3, 2, 1].map((r) => (
          <option key={r} value={r}>
            {r} Star
          </option>
        ))}
      </select>

      <label>Review</label>
      <textarea
        placeholder="Write your review..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Submitting..." : "Submit Rating"}
      </button>
    </div>
  );
};

export default RateFreelancer;
