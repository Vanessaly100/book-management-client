import api from "../utils/axios";

//  Get all books
export const getAllBooks = async ({
  page = 1,
  limit = 12,
  sort = "createdAt",
  order = "asc",
  filter = "",
  category = ""
} = {}) => {
  try {
    const res = await api.get("/books/all", {
      params: {
        page,
        limit,
        sort,
        order,
        filter,
        category, // make sure this matches what your backend expects
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};


export  const createBook = async (formData) => {
  try {
    const response =  await api.post("/books", formData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding book:", error);
    throw error;
  }
}
//  Add a new book
export const addBook = async (formData) => {
  return await api.post("/books", formData, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};

// Update a book
export const updateBook = async (bookId, formData) => {
  try {
    const response = await api.put(`/books/${bookId}`, formData, {
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
  console.log("Deleting book with ID:", id);
  return await api.delete(`/books/${id}`, {
    withCredentials: true,
  });
};

