
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import ErrorPage from "./pages/public/ErrorPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UnauthorizedPage from "./pages/UnauthorizedPage";
function App() {
  return (
    <Router>
        
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<PublicRoutes />} />
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin/*" element={<AdminRoutes />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
            <Route path="/user/*" element={<UserRoutes />} />
          </Route>
          <Route path="*" element={<ErrorPage 
          route = "/"
          page = "Page Not Found"
      />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
        </Routes>
      </AuthProvider>
      <ToastContainer />
    </Router>
  );
}

export default App;