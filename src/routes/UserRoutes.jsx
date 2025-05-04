import { Routes, Route, Outlet } from "react-router-dom";
import Profile from "../pages/user/userProfile/Profile";
import Reservations from "../pages/user/userProfile/Reservations";
import Home from "@/pages/user/Home";
import Books from "@/pages/public/Books";
import BorrowedBooks from "../pages/user/userProfile/BorrowedBooks";
import About from "@/pages/public/About";
import Services from "@/pages/public/Services";
import Navbar from "@/components/navbar/Navbar";
import Reviews from "@/pages/user/userProfile/Reviews";
import Footer from "@/components/navbar/Footer";
import EditProfile from "@/pages/user/userProfile/EditProfile";

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
  return (
    <Routes>
        <Route element={<UserLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="books" element={<Books />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
        </Route>
        {/* Nested under profile */}
        <Route path="profile" element={<Profile />}>
          <Route path="reservations" element={<Reservations />} />
          <Route path="borrowed" element={<BorrowedBooks />} />
          <Route path="reviews" element={<Reviews/>} />
          <Route path="edit" element={<EditProfile/>} />
        </Route>
      <Route path="*" element={<h2>User Page Not Found</h2>} />
    </Routes>
  );
};

export default UserRoutes;
