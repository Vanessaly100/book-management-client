import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api", // change to your actual base URL
  withCredentials: true, // important if you're using cookies
});

// Get all users with optional params for pagination, sorting, etc.
export const getAllUsers = async ({
  page = 1,
  limit = 10,
  sort,
  order,
  filter,
}) => {
  const response = await API.get("/user/all", {
    params: {
      page,
      limit,
      sort, // e.g. "name", "email", "user_id"
      order, // "asc" or "desc"
      filter, // optional: filter by keyword (like name/email contains something)
    },
  });

  return response.data;
};
