import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

export default API;

export const getBookReviews = async (bookId) => {
  try {
    const response = await API.get(`/reviews/${bookId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
