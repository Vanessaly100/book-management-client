import { Routes, Route, Outlet } from "react-router-dom";
import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Services from "../pages/public/Services";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/navbar/Footer";

const PublicLayout = () => {
  return (
    <>
    <Navbar />
    <Outlet />
    <Footer/>
    </>
  );
}

const PublicRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default PublicRoutes;
