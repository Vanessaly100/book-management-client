// import { createContext, useContext, useState, useEffect } from 'react';
// import Cookies from 'js-cookie';
// import axios from 'axios';
// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       // 1. First, check if we have a user in cookies
//       const cookieUser = Cookies.get("user");
//       if (cookieUser) {
//         setUser(JSON.parse(cookieUser));
//       }
  
//       // 2. Then try to verify from backend (optional)
//       try {
//         const response = await axios.get("http://localhost:4000/api/user/all", {
//           withCredentials: true,
//         });
  
//         if (response.data) {
//           setUser(response.data);
//           Cookies.set("user", JSON.stringify(response.data), { expires: 7 });
//         }
//       } catch (error) {
//         console.error("Failed to verify user from server:", error);
//       }
//     };
  
//     fetchUser();
//   }, []);
  

//  const login = async (email, password) => {
//   try {
//     const response = await axios.post(
//       "http://localhost:4000/api/auth/login",
//       { email, password },
//       { withCredentials: true }
//     );

//     if (response.data) {
//       const userData = response.data;
//       setUser(userData);
//       Cookies.set("user", JSON.stringify(userData), { expires: 7 });

//       return userData;
//     }
//   } catch (error) {
//     console.error("Login error:", error);
//     throw new Error("Invalid email or password", error);
//   }
// };

//   const logout = () => {
//   setUser(null);
//   Cookies.remove("user"); 
// };


//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };


import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

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

        const response = await axios.get('http://localhost:4000/api/user/all', {
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

        return userData;
      }
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Invalid email or password');
    }
  };

  const logout = async () => {
    setUser(null);
    Cookies.remove('user');
    // Let the component using logout handle navigation
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
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
