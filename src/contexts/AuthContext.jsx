import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
// import axios from "axios";
import api from "../utils/axios"
import socket from "../utils/socket";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //  Socket registration logic AFTER user is set
  useEffect(() => {
    if (user?.user_id && user?.role) {
      socket.connect();
      socket.emit("register", {
        user_id: user.user_id,
        role: user.role,
      });
    }
  }, [user]); 

useEffect(() => {
  const fetchUser = async () => {
    try {
      const token = Cookies.get("accessToken");

      if (!token) {
        console.warn("⛔ No access token found.");
        setLoading(false);
        return;
      }

      const cookieUser = Cookies.get("user");
      if (cookieUser) {
        setUser(JSON.parse(cookieUser));
      }
console.log("Token:", Cookies.get("accessToken"));
      const response = await axios.get("https://project-backend-7hi1.onrender.com/api/user/profile", {
        withCredentials: true,
      });

      if (response.data) {
        setUser(response.data);
        console.log("user data",response.data)
        Cookies.set("user", JSON.stringify(response.data), { expires: 7 });
      }
    } catch (error) {
      console.error("🔴 Failed to fetch user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delay slightly to allow cookie write
  setTimeout(fetchUser, 200); // 200ms delay
}, []);

const login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });

    if (response.data?.accessToken && response.data?.user) {
      const { accessToken, user } = response.data;

      Cookies.set("accessToken", accessToken, { expires: 7 });
      Cookies.set("user", JSON.stringify(user), { expires: 7 });
      setUser(user);
      console.log("Token from cookie:", Cookies.get("accessToken"));


      return { message: "Login successful", user };
    } else {
      return { message: "Login failed", error: true };
    }
  } catch (error) {
    return {
      message: error.response?.data?.message || "Login failed",
      error: true
    };
  }
};


  // Logout function
  const logout = async () => {
    await api.post(
      "/auth/logout",
      {},
      { withCredentials: true }
    );
    setUser(null);
    Cookies.remove("user");
    Cookies.remove("accessToken");
    socket.disconnect();
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
