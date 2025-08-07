import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
// import axios from "axios";
import api from "../utils/axios"
import socket from "../utils/socket";

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
        const cookieUser = Cookies.get("user");
        if (cookieUser) {
          setUser(JSON.parse(cookieUser));
        }

        const response = await api.get(
          "/user/profile",
          {
            withCredentials: true,
          }
        );

        if (response.data) {
          setUser(response.data);
          Cookies.set("user", JSON.stringify(response.data), { expires: 7 });
        }
      } catch (error) {
        console.error("Failed to verify user from server:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Login function
const login = async (email, password) => {
  try {
    console.log("🔍 Attempting login for:", email);
    console.log("🔍 API Base URL:", api.defaults.baseURL);
    
    const response = await api.post("/auth/login", { email, password });
    
    console.log("📥 Full login response:", response.data);
    
    if (response.data && response.data.message === "Login successful") {
      const userData = response.data;
      
      // Store user data (use the full user object from backend)
      setUser(userData.user);
      Cookies.set("user", JSON.stringify(userData.user), { expires: 7 });
      Cookies.set("accessToken", userData.accessToken, { expires: 7 });
      
      console.log("✅ Login successful, stored user:", userData.user);
      
      return {
        message: "Login successful",
        user: userData.user,
      };
    } else {
      console.error("❌ Unexpected response structure:", response.data);
      return {
        message: "Unexpected response from server",
        error: true
      };
    }
    
  } catch (error) {
    console.error("❌ Login error details:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        baseURL: error.config?.baseURL,
        method: error.config?.method
      }
    });
    
    return {
      message: error.response?.data?.message || error.message || "Login failed",
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
