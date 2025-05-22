import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

export default API;


//  Get all books
export const getAllBooks = async ({
  page = 1,
  limit = 12,
  sort = "createdAt",
  order = "asc",
  filter = "",
  category = "" // this will be your search input
} = {}) => {
  try {
    const res = await API.get("/books/all", {
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
    const response =  await API.post("/books", formData, {
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
  console.log("Deleting book with ID:", id);
  return await API.delete(`/books/${id}`, {
    withCredentials: true,
  });
};

