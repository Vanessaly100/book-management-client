import axios from "axios";
// import Cookies from "js-cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL,
  withCredentials: true, 
});

// api.interceptors.request.use(
//   (config) => {
//     const accessToken = Cookies.get("accessToken");
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (
//       error.response?.status === 401 &&
//       !originalRequest._retry &&
//       !originalRequest.url.includes("/auth/refresh-token")
//     ) {
//       originalRequest._retry = true;
//       try {
//         const res = await api.post("/auth/refresh-token");
//         const newToken = res.data.accessToken;

//         if (newToken) {
//           Cookies.set("accessToken", newToken, { expires: 7 });
//           originalRequest.headers.Authorization = `Bearer ${newToken}`;
//           return api(originalRequest);
//         }
//       } catch (err) {
//         Cookies.remove("accessToken");
//         Cookies.remove("user");
//         window.location.href = "/login";
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default api;
