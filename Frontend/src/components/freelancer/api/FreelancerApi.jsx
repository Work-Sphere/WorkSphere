import axios from "axios";

const API = axios.create({
  baseURL: "/api/freelancer",
});

// ✅ Attach freelancerId from localStorage as a query parameter
API.interceptors.request.use((config) => {
  const freelancerId = localStorage.getItem("uid");
  if (freelancerId) {
    // Add to existing params or create new ones
    config.params = {
      ...config.params,
      freelancerId: freelancerId,
    };
  }
  return config;
});

// ================= REQUIREMENTS =================
export const getOpenRequirements = () => API.get("/requirements");

export const applyForRequirement = (requirementId) =>
  API.post(
    "/apply",
    { requirementId }, // ✅ MUST MATCH ApplyRequirementDTO
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

export const getMyApplications = () => API.get("/projects");

// ================= PROJECTS =================
// ✅ REQUIRED by DashboardHome.jsx & Projects.jsx
export const getMyProjects = () => API.get("/projects");

// ================= SERVICES =================
export const getAllServices = () => API.get("/services-master");
export const getMyServices = () => API.get("/services");
export const addService = (data) => API.post("/services", data);
export const updateService = (id, data) => API.put(`/services/${id}`, data);
export const deleteService = (id) => API.delete(`/services/${id}`);

// ================= RATINGS =================
export const getRatingsForService = (serviceId) =>
  API.get(`/ratings/${serviceId}`);
export const getMyServiceRatings = () => API.get("/ratings");

// ================= EARNINGS =================
export const getMyEarnings = () => API.get("/earnings");

// ================= BILL =================
export const generateBill = (data) => API.post("/bill", data);

// ================= COMPLAINTS =================
export const getMyComplaints = () => API.get("/complaints");

// ================= PROFILE =================
export const getMyProfile = () => API.get("/profile");
export const updateMyProfile = (data) => API.put("/profile", data);

export const getStates = () => API.get("/states");
export const getCities = (stateId) => API.get("/cities", { params: { stateId } });


