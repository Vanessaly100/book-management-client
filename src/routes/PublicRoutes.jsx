import { Routes, Route, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Preloader from "../Preloader";
// import Home from "../pages/public/Home";
// import About from "../pages/public/About";
// import Services from "../pages/public/Services";
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
    <Footer/>
    </>
  );
}

const PublicRoutes = () => {
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
      <Route element={<PublicLayout />}>
      <Route path="/" element={<Home />} />
      {/* <Route path="/about" element={<About />} /> */}
      {/* <Route path="/services" element={<Services />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
      )}

      </div>
  );
};

export default PublicRoutes;
