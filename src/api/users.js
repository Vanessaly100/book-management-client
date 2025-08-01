import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL,
  withCredentials: true,
});

export default API;


// Get all users with optional params for pagination, sorting, etc.
export const getAllUsers = async ({
  page = 1,
  limit = 5,
  sort,
  order,
  filter,
}) => {
  const response = await API.get("/user/all", {
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

export const getUser = async () => {
  const response = await API.get(`/user/profile`);
  return response.data;
};


export const updateUserProfile = async (formData) => {
  try {
    const response = await API.put("/user/update-profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true, 
    });

    return response.data;
  } catch (error) {
     console.error(
       "Failed to update profile: ",
       error.response ? error.response.data : error.message
     );
    throw error; 
  }
};


export const updateUserByAdmin = async (userId, formData) => {
  try {
    const response = await API.put(`/user/update-user/${userId}`, formData);

    return response.data;
  } catch (error) {
    console.error(
      "Failed to update user by admin: ",
      error.response ? error.response.data : error.message
    );
    throw error; 
  }
};

export const handleViewUser = async (userId) => {
  try {
    const response = await API.get(`/user/${userId}/details`);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch user details: ",
      error.response ? error.response.data : error.message
    );
    throw error; 
  }
}


export const deleteUser = async (userId) => {
  try {
    const response = await API.delete(`/user/delete/${userId}`);

    return response.data;
  } catch (error) {
    console.error(
      "Failed to delete user by admin: ",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};


