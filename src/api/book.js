import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

export default API;
const API_URL_reservation = "http://localhost:4000/api/reservations";

//  Get all books
export const getAllBooks = async ( {page = 1,
  limit = 12,
  sort = "createdAt", // Default safe sort field
  order = "asc", //  Default order
  filter = "",
} ={}) => {
  try {
    const res = await API.get("/books/all", {
      params: {
        page,
        limit,
        sort,
        order,
        filter,
      },
    });
    return res.data
    
  } catch (error) {
    console.error(" Error fetching books:", error);
    throw error;
  }
};

//  Add a new book
export const addBook = async (formData) => {
  return await API.post("/books", formData, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};

// Update a book
export const updateBook = async (bookId, formData) => {
  try {
    const response = await API.put(`/books/${bookId}`, formData, {
      withCredentials: true,
    });
    return response.data.book;
  } catch (error) {
    console.error(" Error updating book:", error);
    throw error;
  }
};

//  Delete a book
export const deleteBook = async (id) => {
  return await API.delete(`/books/${id}`, {
    withCredentials: true,
  });
};

//  Reserve a book
// export const reserveBook = async (bookId) => {
//   try {
//     const response = await axios.post(
//       `${API_URL_reservation}/${bookId}/reserve`,
//       {},
//       { withCredentials: true }
//     );
//     return response.data;
//   } catch (error) {
//     console.error(" Error reserving book:", error);
//     throw error;
//   }
// };

export const reserveBook = async (bookId, userId) => {
  try {
    const response = await axios.post(
      `${API_URL_reservation}`, // Use the basic reservations endpoint
      { user_id: userId, book_id: bookId }, // Send both user_id and book_id in the request body
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("❌ Error reserving book:", error);
    throw error;
  }
};
