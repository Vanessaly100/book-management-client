import api from "@/utils/axios";

export const getBookReviews = async (bookId) => {
  try {
    const response = await api.get(`/reviews/${bookId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
