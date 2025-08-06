import axios from "axios";

// Create Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL,
  withCredentials: true,
});
 
export default api;
