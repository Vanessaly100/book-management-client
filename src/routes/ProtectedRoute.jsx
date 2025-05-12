
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useAuth();

  if (user === null) return <p>Loading...</p>; 
  if (!user) return <Navigate to="/login" replace />;

  if (!allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" replace />;
  return <Outlet />;
};

export default ProtectedRoute;


// import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";

// const ProtectedRoute = ({ allowedRoles }) => {
//   const { user } = useAuth();

//   // 1. While auth state is being determined (e.g., from localStorage or an API)
//   if (user === null) return <Navigate to="/login" replace />;

//   // 2. If the user is not authenticated
//   if (!user) return <Navigate to="/login" replace />;

//   // 3. If the user is authenticated but does not have the required role
//   if (!allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" replace />;

//   // 4. If everything is good, render the nested route
//   return <Outlet />;
// };

// export default ProtectedRoute;
