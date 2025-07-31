import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Preloader from "../components/Preloader";
import Layout from "../components/navbar/Layout";
import DashboardPage from "../pages/admin/dashboard/page";
import UserPage from "../pages/admin/user/UserPage";
import AdminProfile from "../pages/admin/profile/AdminProfile";
import AuthorPage from "@/pages/admin/author/AuthorPage";
import CategoriesPage from "@/pages/admin/categories/CategoriesPage";
import BookPage from "@/pages/admin/book/BookPage";
import BorrowPage from "@/pages/admin/borrow/BorrowPage";
import NotifiPage from "@/pages/admin/notification/NotifiPage";
import BorrowSummaryPage from "@/pages/admin/borrow/BorrowSummaryPage";
import ReservationPage from "@/pages/admin/reservation/ReservationPage";
import Report from "@/pages/admin/dashboard/Report";

import { ThemeProvider } from "../contexts/theme-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const AdminRoutes = () => {
  // Load only on first render
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1000); // Show spinner for 1s

    return () => clearTimeout(timer);
  }, []); // Empty dependency = only runs once when component mounts

  if (initialLoading) return <Preloader />;

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/*" element={<Layout />}>
            <Route index element={<DashboardPage />} />
            <Route path="reports" element={<Report />} />
            <Route path="users" element={<UserPage />} />
            <Route path="authors" element={<AuthorPage />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="bookPage" element={<BookPage />} />
            <Route path="borrowPage" element={<BorrowPage />} />
            <Route path="borrowPageSum" element={<BorrowSummaryPage />} />
            <Route path="notifiPage" element={<NotifiPage />} />
            <Route path="reservation" element={<ReservationPage />} />
            <Route path="adminProfile" element={<AdminProfile />} />
            <Route path="settings" element={<h1 className="title">Settings</h1>} />
            <Route path="*" element={<h1>404 - Not Found</h1>} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default AdminRoutes;
