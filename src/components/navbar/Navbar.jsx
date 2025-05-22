import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import UserNavbar from "./UserNavbar";
import  { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/book_7629876-removebg-preview.png';
import AdminRoutes from "@/routes/AdminRoutes";
import { Menu } from "lucide-react";

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [activeSection, setActiveSection] = useState("");
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const [show, setShow] = useState(false);
  const [profile, setProfile] = useState(false);
  const [hamburger, setHamburger] =useState(true)
  const menuRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const sections = ["about-section", "contact-section"];
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.6, // Adjust for how much of section should be visible
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);
  
    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        observer.observe(section);
      }
    });
  
    return () => {
      observer.disconnect();
    };
  }, []);
  

  useEffect(() => {
    const handleScroll = () => {
      const firstHeader = document.getElementById("main-header");
      if (firstHeader) {
        const { bottom } = firstHeader.getBoundingClientRect();
        setShowStickyHeader(bottom <= 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current && !menuRef.current.contains(event.target) &&
        profileRef.current && !profileRef.current.contains(event.target)
      ) {
        setShow(false);
        setProfile(false);
      }
    };

    if (show || profile) {
      document.body.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.body.removeEventListener("mousedown", handleClickOutside);
  }, [show, profile]);


  const handleScrollToSection = (id) => {
    if (currentPath !== "/") {
      navigate("/", { state: { scrollTo: id } });
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };


  // Show public navbar if the user is not logged in
  if (!user) {
    return (
      <>
      <nav className="hidden md:block">
        {/* Main public header */}
        <div className="bg-white text-black h-28 pt-4 w-full flex justify-between items-center flex-col shadow z-10" id="main-header">
          <div className="h-10 w-full flex justify-center items-center bg-darkMainBg text-white relative overflow-hidden">
            <span className="moving-tex absolute flex justify-center items-center">
            Big stories. Small effort. FinLib makes reading easy.
            </span>
          </div>
          <header className="my-bg w-full h-20 flex items-center justify-between px-16 relative">
            <div className="bg-white pr-2 absolute -top-16 left-0 z-20 h-32 w-56 logo">
              <div className="flex flex-col text-white items-center justify-center h-full w-full logo bg-darkMainCardBg">
                <div className="h-20 w-20">
                  <img src={logo} alt="logo" className="w-full h-full object-cover" />
                </div>
                <span className="text-2xl -mt-3">FinLib</span>
              </div>
            </div>
            <div className="border border-black">logo</div>
            <div className="flex space-x-4 font-medium">
  <Link
    to="/"
    onClick={(e) => {
      if (currentPath === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        // Navigate to "/" and scroll to top after navigation
        e.preventDefault();
        navigate("/", { state: { scrollToTop: true } });
      }
    }}
    className={`px-2 transition-all duration-300 ease-in-out ${
      currentPath === "/" && !activeSection ? "font-bold text-lg text-green-700" : "text-gray-700"
    }`}
  >
    Home
  </Link>

  <button
    onClick={() => handleScrollToSection("about-section")}
    className={`px-2 transition-all duration-300 ease-in-out ${activeSection === "about-section" ? "font-bold text-lg text-ActionPurple" : "text-gray-700"}`}
  >
    About Us
  </button>

  <button
    onClick={() => handleScrollToSection("contact-section")}
    className={`px-2 transition-all duration-300 ease-in-out ${activeSection === "contact-section" ? "font-bold text-lg text-ActionPurple" : "text-gray-700"}`}
  >
    Contact Us
  </button>
</div>
            <div>
              <button className="bg-ActionPurple p-2 w-24 text-white uppercase rounded" onClick={() => navigate("/register")}>
                Register
              </button>
            </div>
          </header>
        </div>

        {/* Sticky Header */}
        <div className={`bg-white text-black h-24 w-full flex justify-between items-center flex-col shadow z-20 fixed transition-all duration-500 ${showStickyHeader ? 'top-0' : '-top-24'}`}>
          <header className="my-bg w-[100vw] h-20 flex items-center justify-between px-16 relative">
            <div className="bg-white pr-2 absolute -top-8 left-0 z-20 h-32 w-56 logo">
              <div className="flex flex-col text-white items-center justify-center h-full w-full logo bg-darkMainBg">
                <div className="h-20 w-20">
                  <img src={logo} alt="logo" className="w-full h-full object-cover" />
                </div>
                <span className="text-2xl -mt-3">FinLib</span>
              </div>
            </div>
            <div className="border border-black">logo</div>
            <div className="flex space-x-4 font-medium">
            <Link
    to="/"
    onClick={(e) => {
      if (currentPath === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }}
    className={`px-2 transition-all duration-300 ease-in-out ${
      currentPath === "/" && !activeSection ? "font-bold text-lg text-green-700" : "text-gray-700"
    }`}
  >
    Home
  </Link>

  <button
    onClick={() => handleScrollToSection("about-section")}
    className={`px-2 transition-all duration-300 ease-in-out ${activeSection === "about-section" ? "font-bold text-lg text-ActionPurple" : "text-gray-700"}`}
  >
    About Us
  </button>

  <button
    onClick={() => handleScrollToSection("contact-section")}
    className={`px-2 transition-all duration-300 ease-in-out ${activeSection === "contact-section" ? "font-bold text-lg text-ActionPurple" : "text-gray-700"}`}
  >
    Contact Us
  </button>
            </div>
            <div>
              <button className="bg-ActionPurple p-2 w-24 text-white uppercase rounded" onClick={() => navigate("/register")}>
                Register
              </button>
            </div>
          </header>
        </div>
      </nav>
      {/* hamburger */}
      <div className="sticky top-0 left-0 h-20 z-20 flex md:hidden  bg-white ">
      <div className="relative justify-between items-center w-full">
        <div className="flex justify-between items-center w-full h-full pr-6">
        <div className=" border h-full w-28 sm:w-36 flex justify-center items-center flex-col">
      <img
          src={logo}
          alt="Logoipsum"
          className=" w-[50px] h-[50px]"/>

            <span className="text-2xl font-bold">FinLib</span>
      </div>
        <div className="border" onClick={()=>setHamburger(!hamburger)}>
        <Menu size={32}/>
        </div>
        </div>
        <div className={`blur-2 w-full h-[84vh] ${hamburger? "hidden": "block"}  absolute top-20 left-0`}>
            <div className="flex justify-center flex-col items-center font-medium h-full w-full gap-4">
            <Link
    to="/"
    onClick={(e) => {
      if (currentPath === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }}
    className={`px-2 transition-all duration-300 ease-in-out ${
      currentPath === "/" && !activeSection ? "font-bold text-lg text-ActionPurple" : "text-gray-700"
    }`}
  >
    Home
  </Link>

  <button
    onClick={() => handleScrollToSection("about-section")}
    className={`px-2 transition-all duration-300 ease-in-out ${activeSection === "about-section" ? "font-bold text-lg text-ActionPurple" : "text-gray-700"}`}
  >
    About Us
  </button>

  <button
    onClick={() => handleScrollToSection("contact-section")}
    className={`px-2 transition-all duration-300 ease-in-out ${activeSection === "contact-section" ? "font-bold text-lg text-ActionPurple" : "text-gray-700"}`}
  >
    Contact Us
  </button>
  <button className="bg-ActionPurple p-2 w-24 text-white uppercase rounded" onClick={() => navigate("/register")}>
                Register
              </button>
            </div>
            </div>
      </div>
      </div>
      </>
    );
  }

  // After login: render the correct navbar based on user role
  return user.role === "admin" ? (
    <AdminRoutes
      show={show}
      setShow={setShow}
      profile={profile}
      setProfile={setProfile}
      menuRef={menuRef}
      profileRef={profileRef}
    />
  ) : (
    <UserNavbar
      show={show}
      setShow={setShow}
      profile={profile}
      setProfile={setProfile}
      menuRef={menuRef}
      profileRef={profileRef}
    />
  );
};

export default Navbar;
