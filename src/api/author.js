import axios from "axios";

const API_URL = import.meta.env.VITE_PUBLIC_API_URL;

const API = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL,
  withCredentials: true,
});

export default API;


export const getAllAuthorsNoFilter = async () => {
  try {
    const response = await API.get("/authors/no-filter-all");
    return response.data;
  } catch (error) {
    console.error("Error fetching all authors:", error);
    throw error;
  }
};

export const getAllAuthors = async ({
  page = 1,
  limit = 5,
  sort = "createdAt",
  order = "asc", 
  filter = "",
} = {}) => {
  const response = await API.get(`/authors/?page=${page}&limit=${limit}`, {
    params: {
      page,
      limit,
      sort,
      order,
      filter,
    },
  });

  return response.data;
};


export const getAuthorByName = async (name) => {
  try {
    const response = await axios.get(`${API_URL}/authors/name/${name}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching author by name:", error);
    return null;
  }
};

// Admin Services (manage authors)
export const createAuthor = async (authorData) => {
  try {
    const response = await axios.post(`${API_URL}/authors`, authorData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding author:", error);
    throw error;
  }
};

export const updateAuthor = async (authorId, authorData) => {
  try {
    const response = await axios.put(
      `${API_URL}/authors/${authorId}`,
      authorData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating author:", error);
    throw error;
  }
};

export const deleteAuthor = async (authorId) => {
  try {
    await axios.delete(`${API_URL}/authors/${authorId}`, {
      withCredentials: true,
    });
    return { message: "Author deleted successfully" };
  } catch (error) {
    console.error("Error deleting author:", error);
    throw error;
  }
};
