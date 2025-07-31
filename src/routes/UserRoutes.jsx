import { Routes, Route, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Preloader from "../components/Preloader";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/navbar/Footer";
import Home from "@/pages/user/Home";
import Books from "@/pages/public/Books";
import About from "@/pages/public/About/About";
import Services from "@/pages/public/Services";
import Contacts from "@/pages/public/Contact/Contacts";
import Reservations from "../pages/user/userProfile/Reservations";
import BorrowedBooks from "../pages/user/userProfile/BorrowedBooks";
import Reviews from "../pages/user/userProfile/Reviews";
import EditProfile from "../pages/user/userProfile/EditProfile";
import Layout from "@/pages/user/main/layout";
import Dashboard from "@/pages/user/userProfile/Dashboard";
import Notification from "@/pages/user/userProfile/Notification";
import ErrorPage from "@/pages/public/ErrorPage";

const UserLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

const UserRoutes = () => {
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1000); 

    return () => clearTimeout(timer);
  }, []); 

  if (initialLoading) return <Preloader />;

  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path="home" element={<Home />} />
        <Route path="books" element={<Books />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="contact" element={<Contacts />} />
      </Route>

      <Route path="/" element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="reservations" element={<Reservations />} />
        <Route path="borrowed" element={<BorrowedBooks />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="edit" element={<EditProfile />} />
        <Route path="notifications" element={<Notification />} />
      </Route>

      <Route
        path="*"
        element={<ErrorPage route="/user/home" page="User Page Not Found" />}
      />
    </Routes>
  );
};

export default UserRoutes;
