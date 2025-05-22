// utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api/dashboard", 
  withCredentials: true,
});

export default api;
