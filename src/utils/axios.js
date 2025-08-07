import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});


api.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken");

    // Don't attach Authorization header to login or refresh-token routes
    const skipAuth =
      config.url.includes("/auth/login") ||
      config.url.includes("/auth/refresh-token");

    if (accessToken && !skipAuth) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    console.log("Making request to:", config.baseURL + config.url);
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);



// api.interceptors.response.use(
//   (response) => {
//     console.log("Response success:", response.config.url, response.status);
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
    
//     console.error("Response error:", {
//       url: originalRequest.url,
//       status: error.response?.status,
//       message: error.response?.data?.message,
//       fullError: error.response?.data
//     });

//     if (
//       error.response?.status === 401 &&
//       !originalRequest._retry &&
//       !originalRequest.url.includes("/refresh-token") &&
//       !originalRequest.url.includes("/login")
//     ) {
//       originalRequest._retry = true;
//       console.log("Attempting token refresh...");

//       try {
//         const res = await api.post("/auth/refresh-token");
//         const newAccessToken = res.data.accessToken;

//         if (newAccessToken) {
//           console.log("Token refreshed successfully");
//           Cookies.set("accessToken", newAccessToken);
//           originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//           return api(originalRequest);
//         }
//       } catch (err) {
//         console.error("❌ Token refresh failed:", err);
        
//         // Clear all auth data
//         Cookies.remove("accessToken");
//         Cookies.remove("refreshToken");
//         Cookies.remove("user");

//         // Only redirect if not already on login page
//         if (!window.location.pathname.includes("/login")) {
//           console.log("Redirecting to login...");
//           window.location.href = "/login";
//         }
//       }
//     }
//     return Promise.reject(error);
//   }

// );

export default api;
