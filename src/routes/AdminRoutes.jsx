
import { Routes, Route } from "react-router-dom";
import Layout from "../components/navbar/layout";
import DashboardPage from "../pages/admin/dashboard/page";
import UserPage from "../pages/admin/user/UserPage";
import { ThemeProvider } from "../contexts/theme-context"; 
import AdminProfile from "../pages/admin/profile/AdminProfile";
import AuthorPage from "@/pages/admin/author/AuthorPage";
import CategoriesPage from "@/pages/admin/categories/CategoriesPage";
import BookPage from "@/pages/admin/book/BookPage";

const AdminRoutes = () => {
  return (
    <ThemeProvider storageKey="theme">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="analytics" element={<h1 className="title">Analytics</h1>} />
          <Route path="reports" element={<h1 className="title">Reports</h1>} />
          <Route path="users" element={<UserPage />} />
          <Route path="authors" element={<AuthorPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="bookPage" element={<BookPage />} />
          <Route path="verified-customers" element={<h1 className="title">Verified Customers</h1>} />
          <Route path="products" element={<h1 className="title">Products</h1>} />
          <Route path="new-product" element={<h1 className="title">New Product</h1>} />
          <Route path="adminProfile" element={<AdminProfile/>} />
          <Route path="settings" element={<h1 className="title">Settings</h1>} />
          <Route path="*" element={<h1>404 - Not Found</h1>} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default AdminRoutes;
