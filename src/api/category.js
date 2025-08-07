import api from "@/utils/axios";

export const getAllCategoryNoFilter = async () => {
  try {
    const response = await api.get("/categories/no-filter-all");
    return response.data;
  } catch (error) {
    console.error("Error fetching all authors:", error);
    throw error;
  }
};

// Get all categories with pagination, sorting, filtering
export const getAllCategories = async ({
  page = 1,
  limit = 7,
  sort = "createdAt",
  order = "asc",
  filter = "",
} ={}) => {
  const response = await api.get(`/categories?page=${page}&limit=${limit}`, {
    params: { page, limit, sort, order, filter },
  });
  return response.data;
};

// Get category by ID
export const getCategoryById = async (category_id) => {
  try {
    const response = await api.get(`/categories/${category_id}`);
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
    const response = await api.post("/categories", categoryData);
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
    const response = await api.put(`/categories/${categoryId}`, updatedData);
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
    await api.delete(`/categories/${categoryId}`);
    return { success: true };
  } catch (error) {
    console.error(
      "Error deleting category:",
      error.response?.data || error.message
    );
    throw error;
  }
};
