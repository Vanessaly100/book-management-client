import { Routes, Route, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Preloader from "../components/Preloader";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/navbar/Footer";
import Home from "@/pages/user/Home";

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const PublicRoutes = () => {
  // PRELOADER ONCE ONLY
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1000); // Load spinner for 1s

    return () => clearTimeout(timer);
  }, []); // Run only once

  if (initialLoading) return <Preloader />;

  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default PublicRoutes;
