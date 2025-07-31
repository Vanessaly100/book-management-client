// utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://project-backend-7hi1.onrender.com/api/dashboard",
  withCredentials: true,
});

export default api;
