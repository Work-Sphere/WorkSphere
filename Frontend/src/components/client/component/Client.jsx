import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import Navbar from "../../../pages/Navbar";
import "./Client.css";

const ClientDashboard = () => {
  const location = useLocation();

  return (
    <div className="dashboard-wrapper">
      <Navbar />

      <div className="dashboard-main-area">
        <aside className="sidebar">
          <nav className="sidebar-nav">
            <ul>
              <li>
                <Link
                  to="/client"
                  className={location.pathname === "/client" ? "active" : ""}
                >
                  <i className="bi bi-speedometer2"></i> Dashboard
                </Link>
              </li>

              <li>
                <Link
                  to="/client/projects"
                  className={
                    location.pathname === "/client/projects" ? "active" : ""
                  }
                >
                  <i className="bi bi-briefcase"></i> My Projects
                </Link>
              </li>

              <li>
                <Link
                  to="/client/earnings"
                  className={
                    location.pathname === "/client/earnings" ? "active" : ""
                  }
                >
                  <i className="bi bi-wallet2"></i> Payments
                </Link>
              </li>
              <li>
                <Link
                  to="/client/ratings"
                  className={
                    location.pathname === "/client/ratings" ? "active" : ""
                  }
                >
                  <i className="bi bi-star"></i> Ratings
                </Link>
              </li>
              <li>
                <Link
                  to="/client/complaints"
                  className={location.pathname === "/client/complaints" ? "active" : ""}
                >
                  <i className="bi bi-exclamation-circle"></i> Complaints
                </Link>
              </li>
              <li>
                <Link
                  to="/client/profile"
                  className={location.pathname === "/client/profile" ? "active" : ""}
                >
                  <i className="bi bi-person-circle"></i> My Profile
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

export default ClientDashboard;
