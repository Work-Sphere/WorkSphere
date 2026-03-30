import { useEffect, useState } from "react";
import api from "../../../api.js/axios.js";
import { useSearch } from "../../../context/SearchContext";
import "./AdminRatings.css";

const AdminRatings = () => {
  const [ratings, setRatings] = useState([]);
  const [error, setError] = useState("");
  const { searchQuery } = useSearch();

  // ===============================
  // FETCH RATINGS
  // ===============================
  const fetchRatings = async () => {
    try {
      const res = await api.get("/admin/ratings");
      setRatings(res.data);
    } catch (err) {
      setError("Admin not logged in or session expired");
    }
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  if (error) return <p className="error">{error}</p>;

  /* ===============================
     FILTER AND GROUP RATINGS BY FREELANCER
     =============================== */
  const filteredRatings = ratings.filter(r => 
    r.freelancerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.serviceName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedRatings = filteredRatings.reduce((acc, rating) => {
    if (!acc[rating.freelancerId]) {
      acc[rating.freelancerId] = {
        freelancerName: rating.freelancerName,
        freelancerId: rating.freelancerId,
        ratings: [],
      };
    }
    acc[rating.freelancerId].ratings.push(rating);
    return acc;
  }, {});

  return (
    <div className="admin-ratings">
      <h2>Ratings</h2>

      {ratings.length === 0 && <p>No ratings found</p>}

      {Object.values(groupedRatings).map((group) => (
        <div key={group.freelancerId} className="rating-card">
          {/* FREELANCER HEADER */}
          <h3>
            {group.freelancerName} (ID: {group.freelancerId})
          </h3>

          {/* RATINGS LIST */}
          {group.ratings.map((r, index) => (
            <div key={r.ratingId} className="rating-item">
              <p>
                <strong>
                  {index + 1}. ⭐ {r.rating}
                </strong>
              </p>

              {r.review && <p>{r.review}</p>}

              <small>
                <b>Service:</b> {r.serviceName}
              </small>

              <hr />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AdminRatings;
