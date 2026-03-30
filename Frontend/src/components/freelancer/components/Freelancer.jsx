import React, { useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../../pages/Navbar";
import "./Freelancer.css";

const FreelancerDashboard = () => {
  const location = useLocation();

  return (
    <div className="dashboard-wrapper">
      <Navbar />
      <div className="dashboard-main-area">
        <aside className="sidebar">
          <nav className="sidebar-nav">
            <ul>
              {/* Dashboard */}
              <li>
                <Link
                  to="/freelancer"
                  className={
                    location.pathname === "/freelancer" ? "active" : ""
                  }
                >
                  <i className="bi bi-speedometer2"></i> Dashboard
                </Link>
              </li>

              {/* My Projects (Applications) */}
              <li>
                <Link
                  to="/freelancer/projects"
                  className={
                    location.pathname === "/freelancer/projects" ? "active" : ""
                  }
                >
                  <i className="bi bi-briefcase"></i> My Projects
                </Link>
              </li>

              {/* View Requirements (from DB) */}
              <li>
                <Link
                  to="/freelancer/requirements"
                  className={
                    location.pathname === "/freelancer/requirements"
                      ? "active"
                      : ""
                  }
                >
                  <i className="bi bi-search"></i> View Requirements
                </Link>
              </li>

              {/* Manage Skills (user_services) */}
              <li>
                <Link
                  to="/freelancer/services"
                  className={
                    location.pathname === "/freelancer/services" ? "active" : ""
                  }
                >
                  <i className="bi bi-tools"></i> Manage Skills
                </Link>
              </li>

              {/* Earnings */}
              <li>
                <Link
                  to="/freelancer/earnings"
                  className={
                    location.pathname === "/freelancer/earnings" ? "active" : ""
                  }
                >
                  <i className="bi bi-wallet2"></i> Earnings
                </Link>
              </li>

              {/* My Ratings */}
              <li>
                <Link
                  to="/freelancer/ratings"
                  className={
                    location.pathname === "/freelancer/ratings" ? "active" : ""
                  }
                >
                  <i className="bi bi-star-fill"></i> My Ratings
                </Link>
              </li>

              <li>
                <Link
                  to="/freelancer/complaints"
                  className={
                    location.pathname === "/freelancer/complaints"
                      ? "active"
                      : ""
                  }
                >
                  <i className="bi bi-exclamation-octagon"></i> My Complaints
                </Link>
              </li>

              {/* My Projects (Applications) */}
              <li>
                <Link
                  to="/freelancer/profile"
                  className={
                    location.pathname === "/freelancer/profile" ? "active" : ""
                  }
                >
                  <i className="bi bi-person-square"></i> My Profile
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default FreelancerDashboard;
