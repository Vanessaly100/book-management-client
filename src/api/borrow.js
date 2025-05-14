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

// export const borrowBook = async (userId, bookIds) => {
//   try {
//     const response = await API.post(`/borrowing`, {
//       user_id: userId,
//       bookIds,
//     });
//     return response.data;
//   } catch (error) {
//     console.error(
//       "Error borrowing book:",
//       error.response?.data || error.message
//     );
//     throw error;
//   }
// }

// get all borrows by user 
export const getUserBorrowedBooks = async (userId) => {
  try {
    const response = await API.get(`/borrowing/user/${userId}`);
    return response.data; // assume it returns { borrowedBookIds: [1, 2, 3] }
  } catch (error) {
    console.error("Error fetching user's borrowed books:", error.response?.data || error.message);
    return { borrowedBookIds: [] };
  }
};

// return borrowed book 
export const returnBook = async (userId, bookId) => {
  try {
    const response = await API.put(`/borrowing/return`, {
      user_id: userId,
      bookIds: [bookId],
    });
    return response.data;
  } catch (error) {
    console.error("Error returning book:", error.response?.data || error.message);
    throw error;
  }
};




// Get category by ID
// src/api/borrowApi.js

export const borrowBook = async ({ user_id, bookId }) => {
  try {
    const response = await API.post("/borrowing", {
      user_id,
      bookIds: [bookId], // send single book ID inside an array
    });
    console.log("Borrow response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Borrow error:", error);
    throw error.response?.data || { message: "Something went wrong" };
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
