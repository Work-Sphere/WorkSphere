// import { Routes, Route, Navigate } from "react-router-dom";
// import Register from "../pages/Register";
// import Login from "../pages/Login";
// import ForgotPassword from "../pages/ForgotPassword";
// import Home from "../pages/Home";

// /* ================= FREELANCER ================= */
// import FreelancerDashboard from "../components/freelancer/components/Freelancer";
// import DashboardHome from "../components/freelancer/dashboard/DashboardHome";
// import Projects from "../components/freelancer/dashboard/Projects";
// import Earnings from "../components/freelancer/dashboard/Earnings";

// /* ================= ADMIN ================= */
// import Admin from "../components/admin/components/Admin";
// import AdminHome from "../components/admin/dashboards/AdminHome";
// import AdminUsers from "../components/admin/dashboards/AdminUsers";
// import AdminServices from "../components/admin/dashboards/AdminServices";
// import AdminComplaints from "../components/admin/dashboards/AdminComplaints";
// import AdminRatings from "../components/admin/dashboards/AdminRatings";


// export default function AppRoutes() {
//   return (
//     <Routes>
//       {/* ===== Public Routes ===== */}
//       <Route path="/" element={<Navigate to="/home" replace />} />
//       <Route path="/home" element={<Home />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/forgot-password" element={<ForgotPassword />} />

//       {/* ===== Freelancer Routes ===== */}
//       <Route path="/freelancer" element={<FreelancerDashboard />}>
//         <Route index element={<DashboardHome />} />
//         <Route path="projects" element={<Projects />} />
//         <Route path="earnings" element={<Earnings />} />
//       </Route>

//       {/* ===== Admin Routes ===== */}
//    <Route path="/admin" element={<Admin />}>
//   <Route index element={<AdminHome />} />
//   <Route path="users" element={<AdminUsers />} />
//   <Route path="services" element={<AdminServices />} />
//   <Route path="complaints" element={<AdminComplaints />} />
//   <Route path="ratings" element={<AdminRatings />} />
// </Route>


//       {/* ===== Fallback ===== */}
//       <Route path="*" element={<Navigate to="/home" replace />} />
//     </Routes>
//   );
// }


import { Routes, Route, Navigate } from "react-router-dom";

/* ================= PUBLIC PAGES ================= */
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";

/* ================= PROTECTED ROUTE ================= */
import ProtectedRoute from "./ProtectedRoute.jsx";
/* ================= FREELANCER ================= */
import FreelancerDashboard from "../components/freelancer/components/Freelancer";
import DashboardHome from "../components/freelancer/dashboard/DashboardHome";
import Projects from "../components/freelancer/dashboard/Projects";
import Earnings from "../components/freelancer/dashboard/Earnings";
import FreelancerRequirements from "../components/freelancer/dashboard/Requirements";
import FreelancerManageSkills from "../components/freelancer/dashboard/ManageSkills";
import FreelancerRating from "../components/freelancer/dashboard/Rating";
import FreelancerComplaints from "../components/freelancer/dashboard/FreelancerComplaints";
import FreelancerProfile from "../components/freelancer/dashboard/MyProfile";
import UpdateFreelancerProfile from "../components/freelancer/dashboard/UpdateMyProfile";

/* ================= CLIENT ================= */
import ClientDashboard from "../components/client/component/Client";
import ClientDashboardHome from "../components/client/dashboard/DashboardHome";
import ClientProjects from "../components/client/dashboard/Projects";
import ClientEarnings from "../components/client/dashboard/Earnings";
import ClientRatings from "../components/client/dashboard/Ratings";
import ClientComplaints from "../components/client/dashboard/Complaints";
import ClientProfile from "../components/client/dashboard/MyProfile";

/* ================= ADMIN ================= */
import Admin from "../components/admin/components/Admin";
import AdminHome from "../components/admin/dashboards/AdminHome";
import AdminUsers from "../components/admin/dashboards/AdminUsers";
import AdminServices from "../components/admin/dashboards/AdminServices";
import AdminComplaints from "../components/admin/dashboards/AdminComplaints";
import AdminRatings from "../components/admin/dashboards/AdminRatings";

/* ================= SMART ROOT REDIRECT ================= */
const getDefaultRoute = () => {
  const role = Number(localStorage.getItem("role"));
  if (role === 1) return "/admin";
  if (role === 2) return "/freelancer";
  if (role === 3) return "/client";
  return "/home";
};

export default function AppRoutes() {
  return (
    <Routes>
      {/* ================= ROOT ================= */}
      <Route path="/" element={<Navigate to={getDefaultRoute()} replace />} />

      {/* ================= PUBLIC ================= */}
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* ================= FREELANCER ================= */}
      <Route
        path="/freelancer"
        element={
          <ProtectedRoute role={2}>
            <FreelancerDashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="projects" element={<Projects />} />
        <Route path="earnings" element={<Earnings />} />
        <Route path="requirements" element={<FreelancerRequirements />} />
        <Route path="services" element={<FreelancerManageSkills />} />
        <Route path="ratings" element={<FreelancerRating />} />
        <Route path="complaints" element={<FreelancerComplaints />} />
        <Route path="profile" element={<FreelancerProfile />} />
        <Route path="profile/edit" element={<UpdateFreelancerProfile />} />
      </Route>

      {/* ================= CLIENT ================= */}
      <Route
        path="/client"
        element={
          <ProtectedRoute role={3}>
            <ClientDashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<ClientDashboardHome />} />
        <Route path="projects" element={<ClientProjects />} />
        <Route path="earnings" element={<ClientEarnings />} />
        <Route path="ratings" element={<ClientRatings />} />
        <Route path="complaints" element={<ClientComplaints />} />
        <Route path="profile" element={<ClientProfile />} />
      </Route>

      {/* ================= ADMIN ================= */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role={1}>
            <Admin />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminHome />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="complaints" element={<AdminComplaints />} />
        <Route path="ratings" element={<AdminRatings />} />
      </Route>

      {/* ================= FALLBACK ================= */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}
