import { Routes, Route, Outlet } from "react-router-dom";

import { useEffect, useState } from "react";
import Preloader from "../Preloader";
// import Profile from "../pages/user/userProfile/Profile";
import Reservations from "../pages/user/userProfile/Reservations";
import Home from "@/pages/user/Home";
import Books from "@/pages/public/Books";
import BorrowedBooks from "../pages/user/userProfile/BorrowedBooks";
import About from "@/pages/public/About/About";
import Services from "@/pages/public/Services";
import Navbar from "@/components/navbar/Navbar";
import Reviews from "@/pages/user/userProfile/Reviews";
import Footer from "@/components/navbar/Footer";
import EditProfile from "@/pages/user/userProfile/EditProfile";
import Layout from "@/pages/user/main/layout";
import Dashboard from "@/pages/user/userProfile/Dashboard";
import Notification from "@/pages/user/userProfile/Notification";
import ErrorPage from "@/pages/public/ErrorPage";
import Contacts from "@/pages/public/Contact/Contacts";

const UserLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const UserRoutes = () => {
  //  PRELOADER
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Hide the preloader after 2 seconds
    }, 2000);

    return () => clearTimeout(timer);
  }, []);


  return (
    <div>
    {loading ? (
      <Preloader/> // Show preloader until the loading state is false
    ) : (

    <Routes>
        <Route element={<UserLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="books" element={<Books />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="contact" element={<Contacts/>} />
        </Route>
        {/* Nested under profile */}
        <Route path="/" element={<Layout/>}>
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="borrowed" element={<BorrowedBooks />} />
          <Route path="reviews" element={<Reviews/>} />
          <Route path="edit" element={<EditProfile/>} />
          <Route path="notifications" element={<Notification/>} />
        </Route>
      <Route path="*" element={<ErrorPage 
      route = "/user/home"
      page = "User Page Not Found"
      />} />
    </Routes>
       )}

    </div>
  );
};

export default UserRoutes;
