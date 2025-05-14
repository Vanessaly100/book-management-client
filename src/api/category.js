import axios from "axios";

// Create a reusable Axios instance
const API = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

// Get all categories with pagination, sorting, filtering
export const getAllCategories = async ({
  page = 1,
  limit = 7,
  sort = "createdAt",
  order = "asc",
  filter = "",
} ={}) => {
  const response = await API.get(`/categories?page=${page}&limit=${limit}`, {
    params: { page, limit, sort, order, filter },
  });
  return response.data;
};

// Get category by ID
export const getCategoryById = async (category_id) => {
  try {
    const response = await API.get(`/categories/${category_id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching category:",
      error.response?.data || error.message
    );
    return null;
  }
};

// Create a new category (Admin only)
export const createCategory = async (categoryData) => {
  try {
    const response = await API.post("/categories", categoryData);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating category:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Update a category (Admin only)
export const updateCategory = async (categoryId, updatedData) => {
  try {
    const response = await API.put(`/categories/${categoryId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(
      "Error updating category:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Delete a category (Admin only)
export const deleteCategory = async (categoryId) => {
  try {
  console.log("Deleting book with ID:", categoryId);
    await API.delete(`/categories/${categoryId}`);
    return { success: true };
  } catch (error) {
    console.error(
      "Error deleting category:",
      error.response?.data || error.message
    );
    throw error;
  }
};
