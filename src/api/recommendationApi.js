import axios from "axios";
const API = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL,
  withCredentials: true,
});

// Get recommendations for the logged-in user
export const getUserRecommendations = async () => {
  try {
    const response = await API.get("/recommendations/user");
    return response.data;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    throw (
      error?.response?.data || { message: "Failed to fetch recommendations" }
    );
  }
};
