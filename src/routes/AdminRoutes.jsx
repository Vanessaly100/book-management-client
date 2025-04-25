
import { Routes, Route } from "react-router-dom";
import Layout from "../components/navbar/layout";
import DashboardPage from "./dashboard/page";
import UserPage from "./UserTable/UserPage";
import { ThemeProvider } from "../contexts/theme-context"; 

const AdminRoutes = () => {
  return (
    <ThemeProvider storageKey="theme">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="analytics" element={<h1 className="title">Analytics</h1>} />
          <Route path="reports" element={<h1 className="title">Reports</h1>} />
          <Route path="users" element={<UserPage />} />
          <Route path="new-user" element={<h1 className="title">New Customer</h1>} />
          <Route path="verified-customers" element={<h1 className="title">Verified Customers</h1>} />
          <Route path="products" element={<h1 className="title">Products</h1>} />
          <Route path="new-product" element={<h1 className="title">New Product</h1>} />
          <Route path="inventory" element={<h1 className="title">Inventory</h1>} />
          <Route path="settings" element={<h1 className="title">Settings</h1>} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default AdminRoutes;
