import axios from "axios";

// Create a reusable Axios instance
const API = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

// Get all categories with pagination, sorting, filtering
export const getAllBorrows = async ({
  page = 1,
  limit = 10,
  sort = "createdAt",
  order = "asc",
  status = "",
  filter = "",
} = {}) => {
  const response = await API.get(`/borrowing/all`, {
    params: { page, limit, sort, order, filter,status },
  });
  return response.data;
};

// Get category by ID
export const getCategoryById = async (borrow_id) => {
  try {
    const response = await API.get(`/borrowing/${borrow_id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching borrow:",
      error.response?.data || error.message
    );
    return null;
  }
};

// Create a new category (Admin only)
export const createCategory = async (borrowData) => {
  try {
    const response = await API.post("/borrowing", borrowData);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating borrow:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Update a category (Admin only)
export const updateBorrow = async (borrowId, updatedData) => {
  try {
    const response = await API.put(
      `/borrowing/${borrowId}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error updating borrow:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Delete a category (Admin only)
export const deleteBorrow = async (borrowId) => {
  try {
    console.log("Deleting book with ID:", borrowId);
    await API.delete(`/borrowing/${borrowId}`);
    return { success: true };
  } catch (error) {
    console.error(
      "Error deleting borrow:",
      error.response?.data || error.message
    );
    throw error;
  }
};




// Helper for GET requests
export const getData = async (endpoint, filters) => {
  try {
    const res = await API.get(endpoint, { params: filters });
    console.log("API response", res.data);
    return {
      rows: res.data.rows || [],
      count: res.data.count || 0,
    };
  } catch (err) {
    console.error("Error fetching data:", err);
    return { rows: [], count: 0 };
  }
};
