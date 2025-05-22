import { useState, useEffect, useRef } from 'react';
import logo from '../../assets/book_7629876-removebg-preview.png';
import png from '../../assets/gray-user-profile-icon-png-fP8Q1P.png';
import { RiLogoutBoxRLine} from 'react-icons/ri';
import { FaRegEdit } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Menu } from 'lucide-react';

const UserNavbar = () => {
  const [hamburger, setHamburger] =useState(true)
  const [show, setShow] = useState(false);
  const [profile, setProfile] = useState(false);
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const menuRef = useRef(null);
  const profileRef = useRef(null);

  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;


  const handleLogout = () => {
    logout();
    setProfile(false);
    setShow(false);
    navigate("/");
  };

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

  return (
    <>
    <div>
    <div className='hidden md:block'>
      {/* Main Header */}
      <div className='bg-white text-black h-28 pt-4 w-full flex justify-between items-center flex-col shadow z-20' id='main-header'>
        <div className='h-10 w-full flex justify-center items-center bg-tealGreenish/95 text-white relative overflow-hidden'>
          <span className='moving-tex absolute flex justify-center items-center'>
            {`😊 welcome back! ${user ? user.first_name : 'Guest'}`}
          </span>
        </div>
        <header className={`my-bg w-full h-20 flex items-center justify-between px-8 relative`}>
          <div className='bg-white pr-2 absolute -top-16 left-0 z-20 h-32 w-56 logo'>
            <div className='flex flex-col text-white items-center justify-center h-full w-full logo bg-darkMainCardBg'>
              <div className='h-20 w-20'>
                <img 
                  src={logo} 
                  alt="logo"
                  className='w-full h-full object-cover' 
                />
              </div>
              <span className='text-2xl -mt-3'>FinLib</span>
            </div>
          </div>
          <div className='w-56'>
            logo
          </div>
          {/* Navbar Items */}
          <nav>
  <div className="flex space-x-4 font-medium">
  <Link
  to="/user/home"
  className={`px-2 transition-all duration-300 ease-in-out ${currentPath === "/user/home" ? "font-bold text-lg text-ActionPurple" : "text-gray-700"}`}
>
  Home
</Link>
<Link
  to="/user/books"
  className={`px-2 transition-all duration-300 ease-in-out ${currentPath === "/user/books" ? "font-bold text-lg text-ActionPurple" : "text-gray-700"}`}
>
  Books
</Link>
<Link
  to="/user/about"
  className={`px-2 transition-all duration-300 ease-in-out ${currentPath === "/user/about" ? "font-bold text-lg text-ActionPurple" : "text-gray-700"}`}
>
  About Us
</Link>
{/* <Link
  to="/user/services"
  className={`px-2 transition-all duration-300 ease-in-out ${currentPath === "/user/services" ? "font-bold text-lg text-ActionPurple" : "text-gray-700"}`}
>
  Services
</Link> */}
<Link
  to="/user/contact"
  className={`px-2 transition-all duration-300 ease-in-out ${currentPath === "/user/contact" ? "font-bold text-lg text-ActionPurple" : "text-gray-700"}`}
>
  Contact
</Link>

  </div>
    </nav>

          <div>
            {user && (
              <div className='flex gap-4'>
                <div className='h-12 w-12 rounded-full cursor-pointer overflow-hidden'>
                  <div
                    className='h-12 w-12 rounded-full bg-gray-300'
                    onClick={() => {
                      setProfile(!profile);
                      setShow(false);
                    }}
                  >
                    <img 
                      src={user.profile_picture_url || png} 
                      alt="profile"
                      className='h-full w-full object-cover'
                    />
                  </div>
                </div>
              </div>
            )}
            {!user && (
              <div className='flex gap-4'>
                <Link to="/login" className="text-sm text-ActionPurple font-semibold">Login</Link>
                <Link to="/register" className="text-sm text-ActionPurple font-semibold">Register</Link>
              </div>
            )}
          </div>
        </header>
      </div>
      
      {/* Sticky Header */}
      <div className={`bg-white h-24 w-full flex justify-between items-center flex-col shadow z-50 fixed transition-all duration-500 ${showStickyHeader ? 'top-0' : '-top-24'}`}>
        <header className={`my-bg w-full h-full flex items-center justify-between px-8 relative z-50`}>

          <div className='bg-white pr-2 absolute -top-4 left-0 z-20 h-28 w-56 logo'>
            <div className='flex flex-col text-white items-center justify-center h-full w-full logo bg-darkMainBg'>
              <div className='h-20 w-20'>
                <img 
                  src={logo} 
                  alt="logo"
                  className='w-full h-full object-cover' 
                />
              </div>
              <span className='text-2xl -mt-3'>FinLib</span>
            </div>
          </div>
          <div className='w-56'>
            logo
          </div>
          {/* Navbar Items */}
          <nav className="">
<div className="flex space-x-4 p-4 font-medium">
  <Link
  to="/user/home"
  className={`px-2 transition-all duration-300 ease-in-out ${currentPath === "/user/home" ? "font-bold text-lg text-ActionPurple" : "text-gray-700"}`}
>
  Home
</Link>
<Link
  to="/user/books"
  className={`px-2 transition-all duration-300 ease-in-out ${currentPath === "/user/books" ? "font-bold text-lg text-ActionPurple" : "text-gray-700"}`}
>
  Books
</Link>
<Link
  to="/user/about"
  className={`px-2 transition-all duration-300 ease-in-out ${currentPath === "/user/about" ? "font-bold text-lg text-ActionPurple" : "text-gray-700"}`}
>
  About Us
</Link>

<Link
  to="/user/services"
  className={`px-2 transition-all duration-300 ease-in-out ${currentPath === "/user/contact" ? "font-bold text-lg text-ActionPurple" : "text-gray-700"}`}
>Contact
</Link>
  </div>
</nav>


          <div>
            {user && (
              <div className='flex gap-4'>
                <div className='h-12 w-12 rounded-full cursor-pointer overflow-hidden'>
                  <div
                    className='h-18 w-18 rounded-full bg-gray-300'
                    onClick={() => {
                      setProfile(!profile);
                      setShow(false);
                    }}
                  >
                    <img 
                      src={user.profile_picture_url || png} 
                      alt="profile"
                      className='h-12 w-12 object-cover'
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>
      </div>
      
      {/* Profile and Logout Menu */}
      {user && (
        <div className={`h-[20vh] fixed w-48 right-0 top-[115px] bg-black rounded-lg opacity-75 blur-1 z-10 flex justify-center items-center p-5 ${profile ? 'block' : 'hidden'}`} ref={profileRef}>
          <div className='h-full w-full bg-black flex flex-col-reverse items-center justify-center gap-2'>
            <div className='border h-1/2 w-full rounded-lg flex items-center justify-center gap-4 cursor-pointer' onClick={handleLogout}>
              <RiLogoutBoxRLine color='white' size={24}/>
              <span className='text-white uppercase text-xs font-bold'>Log Out</span>
            </div>
            <div className='border h-1/2 w-full rounded-lg flex items-center justify-center gap-4 cursor-pointer' onClick={() => { navigate('/user/dashboard'); setProfile(false); }}>
              <FaRegEdit color='white' size={24}/>
              <span className='text-white uppercase text-xs font-bold'>My Dashboard</span>
            </div>
          </div>
        </div>
      )}
    </div>
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
        <div className="flex space-x-4 p-4 font-medium">
  <Link
  to="/user/home"
  className={`px-2 transition-all duration-300 ease-in-out ${currentPath === "/user/home" ? "font-bold text-lg text-ActionPurple" : "text-gray-700"}`}
>
  Home
</Link>
<Link
  to="/user/books"
  className={`px-2 transition-all duration-300 ease-in-out ${currentPath === "/user/books" ? "font-bold text-lg text-ActionPurple" : "text-gray-700"}`}
>
  Books
</Link>
<Link
  to="/user/about"
  className={`px-2 transition-all duration-300 ease-in-out ${currentPath === "/user/about" ? "font-bold text-lg text-ActionPurple" : "text-gray-700"}`}
>
  About Us
</Link>
{/* <Link
  to="/user/services"
  className={`px-2 transition-all duration-300 ease-in-out ${currentPath === "/user/services" ? "font-bold text-lg text-ActionPurple" : "text-gray-700"}`}
>
  Services
</Link> */}
<Link
  to="/user/services"
  className={`px-2 transition-all duration-300 ease-in-out ${currentPath === "/user/contact" ? "font-bold text-lg text-ActionPurple" : "text-gray-700"}`}
>Contact
</Link>
  </div>
            </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default UserNavbar;
