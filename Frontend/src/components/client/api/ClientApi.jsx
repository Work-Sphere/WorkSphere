import axios from "axios";

const API = axios.create({
    baseURL: "/api/client",
});

// ✅ Attach clientId from localStorage as a query parameter
API.interceptors.request.use((config) => {
    const clientId = localStorage.getItem("uid");
    if (clientId) {
        config.params = {
            ...config.params,
            clientId: clientId,
        };
    }
    return config;
});

// ================= PROFILE & SUMMARY =================
export const getSummary = () => API.get("/dashboard/summary");
export const getMyProfile = () => API.get("/dashboard/profile");
export const updateMyProfile = (data) => API.put("/dashboard/profile", data);

export const getStates = () => API.get("/dashboard/states");
export const getCities = (stateId) => API.get("/dashboard/cities", { params: { stateId } });

// ================= PROJECTS & RATINGS =================
export const getAcceptedProjects = () => API.get("/accepted-projects");
export const getRatingsHistory = () => API.get("/ratings");
export const submitRating = (data) => API.post("/ratings", data);
