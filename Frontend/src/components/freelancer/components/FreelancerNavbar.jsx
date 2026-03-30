import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./FreelancerNavbar.css";

function FreelancerNavbar() {
  const navigate = useNavigate();
  const [name, setName] = useState("Freelancer");

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      setName(user.fname); //
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="home-navbar">
      <Link to="/freelancer" className="logo">
        WorkSphere
      </Link>

      <div className="nav-links">
        <span className="hello-text">
          Hello, <strong>{name}</strong>
        </span>

        <button className="logout-red-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default FreelancerNavbar;

