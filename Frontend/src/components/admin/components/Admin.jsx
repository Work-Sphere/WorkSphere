import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import Navbar from "../../../pages/Navbar";
import "./Admin.css";

const Admin = () => {
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
                  to="/admin"
                  className={location.pathname === "/admin" ? "active" : ""}
                >
                  <i className="bi bi-speedometer2"></i> Dashboard
                </Link>
              </li>

              <li>
                <Link
                  to="/admin/users"
                  className={location.pathname === "/admin/users" ? "active" : ""}
                >
                  <i className="bi bi-people"></i> Users
                </Link>
              </li>

              <li>
                <Link
                  to="/admin/services"
                  className={location.pathname === "/admin/services" ? "active" : ""}
                >
                  <i className="bi bi-grid"></i> Services
                </Link>
              </li>

              <li>
                <Link
                  to="/admin/complaints"
                  className={location.pathname === "/admin/complaints" ? "active" : ""}
                >
                  <i className="bi bi-exclamation-triangle"></i> Complaints
                </Link>
              </li>

              <li>
                <Link
                  to="/admin/ratings"
                  className={location.pathname === "/admin/ratings" ? "active" : ""}
                >
                  <i className="bi bi-star"></i> Ratings
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

export default Admin;
