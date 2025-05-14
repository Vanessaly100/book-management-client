
import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import socket from "../utils/socket";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const cookieUser = Cookies.get('user');
        if (cookieUser) {
          setUser(JSON.parse(cookieUser));
        }

        const response = await axios.get('http://localhost:4000/api/user/profile', {
          withCredentials: true,
        });

        if (response.data) {
          setUser(response.data);
          Cookies.set('user', JSON.stringify(response.data), { expires: 7 });
        }
      } catch (error) {
        console.error('Failed to verify user from server:', error);
      } finally {
        setLoading(false);
      }

  };

  fetchUser();
}, []);


  const login = async (email, password) => {
    try {
      const response = await axios.post(
        'http://localhost:4000/api/auth/login',
        { email, password },
        { withCredentials: true }
      );

      if (response.data) {
        const userData = response.data;
        setUser(userData);
        Cookies.set('user', JSON.stringify(userData), { expires: 7 });
socket.emit("register", {
      user_id: user.user_id,
      role: user.role,
    });

        return userData;
      }
    } catch (error) {
      console.error('Login error:', error);      throw new Error('Invalid email or password');
    }
  };

  const logout = async () => {
    await axios.post("http://localhost:4000/api/auth/logout", {}, { withCredentials: true });
    setUser(null);
    Cookies.remove("user");
  };
  

  return (
    <AuthContext.Provider value={{ user,setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
