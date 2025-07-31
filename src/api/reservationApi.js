import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL,
  withCredentials: true,
});

export default API;

// Create a new reservation
export const createReservation = async (data) => {
  try {
    const response = await API.post("/reservations", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get logged-in user's reservations
export const getMyReservations = async () => {
  try {
    const response = await API.get("/reservations/my");
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}; 

// Admin: Get all reservations (with optional filters)
export const getAllReservations = async ({
  page = 1,
  limit = 7,
  sort = "createdAt",
  order = "asc",
  filter = "",
} = {}) => {
  try {
    const response = await API.get(
      `/reservations/all?page=${page}&limit=${limit}`,
      {
        params: { page, limit, sort, order, filter },
      }
    );
    console.log("reserv", response.data)
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// User: Cancel own reservation
export const cancelReservationByUser = async (reservationId) => {
  try {
    const response = await API.put(
      `/reservations/${reservationId}/user/cancel`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Admin: Fulfill a reservation
export const fulfillReservation = async (reservationId) => {
  try {
    const response = await API.put(`/reservations/${reservationId}/fulfill`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Admin: Cancel reservation with reason
export const cancelReservationByAdmin = async (id) => {
  try {
    const response = await API.put(`/reservations/${id}/admin/cancel`, {
      reason: "The book is out of stock",
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Admin: Delete a reservation
export const deleteReservation = async (id) => {
  try {
    const response = await API.delete(`/reservations/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
