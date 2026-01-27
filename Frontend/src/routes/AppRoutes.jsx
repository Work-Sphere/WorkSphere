import { Routes, Route, Navigate } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";

// Layout and Page imports
import FreelancerDashboard from "../components/freelancer/components/Freelancer";
import DashboardHome from "../components/freelancer/dashboard/DashboardHome"; 
import Projects from "../components/freelancer/dashboard/Projects";
import Earnings from "../components/freelancer/dashboard/Earnings";

import Home from "../pages/Home";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Nested Dashboard Routes */}
      <Route path="/freelancer" element={<FreelancerDashboard />}>
        {/* 'index' makes DashboardHome the default view when at /dashboard */}
        <Route index element={<DashboardHome />} />
        <Route path="projects" element={<Projects />} />
        <Route path="earnings" element={<Earnings />} /> 
      </Route>
    </Routes>
  );
}