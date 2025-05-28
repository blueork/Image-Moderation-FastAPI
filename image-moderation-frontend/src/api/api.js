import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Add token dynamically
export const setToken = (token) => {
  API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// Admin Endpoints
export const createToken = (isAdmin) => API.post(`/auth/tokens?is_admin=${isAdmin}`);
export const getTokens = () => API.get("/auth/tokens");
export const deleteToken = (token) => API.delete(`/auth/tokens/${token}`);

// User Endpoint
export const moderateImage = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return API.post("/moderate", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
