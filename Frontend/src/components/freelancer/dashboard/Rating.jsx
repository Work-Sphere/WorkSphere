import React, { useEffect, useState } from "react";
import { getMyServiceRatings } from "../api/FreelancerApi";
import "./Rating.css";

const Rating = () => {
  const [serviceRatings, setServiceRatings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    loadRatings();
  }, []);

  const loadRatings = async () => {
    try {
      const res = await getMyServiceRatings();
      setServiceRatings(res.data || []);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load ratings");
      setServiceRatings([]);
    }
  };

  return (
    <div className="admin-ratings">
      <h2>My Service Ratings</h2>

      {error && <p className="error">{error}</p>}

      {serviceRatings.length === 0 ? (
        <p>No ratings received yet.</p>
      ) : (
        serviceRatings.map((service) => (
          <div key={service.serviceId} className="rating-card">
            {/* SERVICE HEADER */}
            <h3>
              {service.serviceName}
            </h3>

            <p>
              ⭐ <strong>Average Rating:</strong>{" "}
              {service.averageRating
                ? service.averageRating.toFixed(1)
                : "N/A"}
            </p>

            <hr />

            {/* RATINGS LIST */}
            {service.ratings.length === 0 ? (
              <p>No reviews for this service.</p>
            ) : (
              service.ratings.map((r, index) => (
                <div key={r.ratingId} className="rating-item">
                  <p>
                    <strong>
                      {index + 1}. ⭐ {r.rating}
                    </strong>
                  </p>

                  {r.review && <p>{r.review}</p>}

                  <small>
                    <b>Date:</b> {r.ratingDate}
                  </small>

                  <hr />
                </div>
              ))
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Rating;
