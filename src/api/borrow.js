import api from "@/utils/axios";

// Get all categories with pagination, sorting, filtering
export const getAllBorrows = async ({
  page = 1,
  limit = 10,
  sort = "createdAt",
  order = "asc",
  status = "",
  filter = "",
} = {}) => {
  const response = await api.get(`/borrowing/all`, {
    params: { page, limit, sort, order, filter,status },
  });
  return response.data;
};

// get all borrows by user 
export const getUserBorrowedBooks = async () => {
  try {
    const response = await api.get(`/user/borrowed-books`);
    console.log("response", response)
    return response.data; 
  } catch (error) {
    console.error("Error fetching user's borrowed books:", error.response?.data || error.message);
    return { borrowedBookIds: [] };
  }
};

// return borrowed book 
export const returnBook = async (userId, bookId) => {
  try {
    const response = await api.put(`/borrowing/return`, {
      user_id: userId,
      bookIds: [bookId],
    });
    return response.data;
  } catch (error) {
    console.error("Error returning book:", error.response?.data || error.message);
    throw error;
  }
};



export const borrowBook = async ({ user_id, bookId }) => {
  try {
    const response = await api.post("/borrowing", {
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




// Update a category (Admin only)
// export const updateBorrow = async (borrowId, updatedData) => {
//   try {
//     const response = await API.put(
//       `/borrowing/${borrowId}`,
//       updatedData
//     );
//     return response.data;
//   } catch (error) {
//     console.error(
//       "Error updating borrow:",
//       error.response?.data || error.message
//     );
//     throw error;
//   }
// };

// Delete a category (Admin only)
export const deleteBorrow = async (borrowId) => {
  try {
    console.log("Deleting book with ID:", borrowId);
    await api.delete(`/borrowing/${borrowId}`);
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
    const res = await api.get(endpoint, { params: filters });
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


// 1. Borrow books
export const borrowBooks = async (borrowData) => {
  try {
    const res = await api.post("/borrow", borrowData);
    return res.data;
  } catch (error) {
    console.error("Error borrowing books:", error);
    throw error?.response?.data || { message: "Failed to borrow books" };
  }
};

// 3. Return borrowed books
export const returnBooks = async (returnData) => {
  try {
    const res = await api.put("/borrowing/return", returnData);
    return res.data;
  } catch (error) {
    console.error("Error returning books:", error);
    throw error?.response?.data || { message: "Failed to return books" };
  }
};

// 4. Get active borrows for a user
export const getActiveBorrows = async () => {
  try {
    const res = await api.get("/borrowing/borrows/active");
    return res.data;
  } catch (error) {
    console.error("Error fetching active borrows:", error);
    throw (
      error?.response?.data || { message: "Failed to fetch active borrows" }
    );
  }
};

// 5. Get overdue borrows for a user
export const getOverdueBorrows = async () => {
  try {
    const res = await api.get("/borrowing/borrows/overdue");
    return res.data;
  } catch (error) {
    console.error("Error fetching overdue borrows:", error);
    throw (
      error?.response?.data || { message: "Failed to fetch overdue borrows" }
    );
  }
};

// 6. Get return history
export const getReturnHistory = async () => {
  try {
    const res = await api.get("/borrowing/returns");
    return res.data;
  } catch (error) {
    console.error("Error fetching return history:", error);
    throw (
      error?.response?.data || { message: "Failed to fetch return history" }
    );
  }
};

// 7. Get borrow by ID
export const getBorrowById = async (borrowId) => {
  try {
    const res = await api.get(`/borrowing/${borrowId}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching borrow by ID:", error);
    throw error?.response?.data || { message: "Failed to fetch borrow record" };
  }
};

// 8. Update borrow (admin only)
export const updateBorrow = async (id, updatedData) => {
  try {
    const res = await api.put(`/borrowing/${id}`, updatedData);
    return res.data;
  } catch (error) {
    console.error("Error updating borrow:", error);
    throw (
      error?.response?.data || { message: "Failed to update borrow record" }
    );
  }
};


// 10. Check book availability
export const checkBookAvailability = async (bookId) => {
  try {
    const res = await api.get(`/borrowing/books/${bookId}/availability`);
    return res.data;
  } catch (error) {
    console.error("Error checking book availability:", error);
    throw error?.response?.data || { message: "Failed to check availability" };
  }
};
