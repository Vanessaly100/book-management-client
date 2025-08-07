import api from "@/utils/axios";

// Get recommendations for the logged-in user
export const getUserRecommendations = async () => {
  try {
    const response = await api.get("/recommendations/user");
    return response.data;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    throw (
      error?.response?.data || { message: "Failed to fetch recommendations" }
    );
  }
};
