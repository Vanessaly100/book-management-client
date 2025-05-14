// hooks/useNotifications.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect } from "react";

export const useNotifications = (search, page, limit, sort, order) => {
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  return useQuery({
    queryKey: ["notifications", debouncedSearch, page, limit, sort, order],
    queryFn: async () => {
      const params = {
        page,
        limit,
        sort,
        order,
        user_name: debouncedSearch,
        type: debouncedSearch,
        is_read: debouncedSearch === "read" || debouncedSearch === "unread"
          ? debouncedSearch[0].toUpperCase() + debouncedSearch.slice(1)
          : undefined,
      };

    const API = axios.create({
      baseURL: "http://localhost:4000/api",
      withCredentials: true,
    });

    const response = await API.get(`/notifications`, { params });
    return response.data;
  },
});
};
