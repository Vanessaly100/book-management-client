import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';
import logo from '../../assets/image_prev_ui.png';
import { TfiAlignRight } from "react-icons/tfi";
import png from '../../assets/gray-user-profile-icon-png-fP8Q1P.png';
import { RiLogoutBoxRLine, RiShoppingCartLine, RiInboxArchiveLine } from 'react-icons/ri';
import { FaRegEdit, FaRegHeart } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const UserNavbar = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [show, setShow] = useState(false);
  const [profile, setProfile] = useState(false);
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const menuRef = useRef(null);
  const profileRef = useRef(null);

  const { logout, user } = useAuth();
  const navigate = useNavigate();

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
      <div className='bg-white text-black h-28 pt-4 w-full flex justify-between items-center flex-col shadow z-10' id='main-header'>
        <div className='h-10 w-full flex justify-center items-center bg-green-600 text-white relative overflow-hidden'>
          <span className='moving-tex absolute flex justify-center items-center'>
            {`😊 welcome back! ${user ? user.first_name : 'Guest'}`}
          </span>
        </div>
        <header className={`my-bg w-full h-20 flex items-center justify-between px-8 relative`}>
          <div className='bg-white pr-2 absolute -top-16 left-0 z-20 h-32 w-56 logo'>
            <div className='flex flex-col text-white items-center justify-center h-full w-full logo bg-green-800'>
              <div className='h-20 w-20'>
                <img 
                  src={logo} 
                  alt="logo"
                  className='w-full h-full object-cover' 
                />
              </div>
              <span className='text-2xl -mt-3'>e-library</span>
            </div>
          </div>
          <div className='border border-black'>
            logo
          </div>
          {/* Navbar Items */}
          <nav>
            <div>
              <Link to="/" className="mr-4">Home</Link>
              <Link to="/books" className="mr-4">Books</Link>
              <Link to="/profile" className="mr-4">Profile</Link>
              <Link to="/reservations" className="mr-4">Reservations</Link>
              <Link to="/borrowed" className="mr-4">Borrowed Books</Link>
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
                      src={png} 
                      alt="profile"
                      className='h-full w-full object-cover'
                    />
                  </div>
                </div>
                <div 
                  className='border border-gray-400 h-12 w-12 rounded-full flex items-center justify-center cursor-pointer'
                  onClick={() => { setShow(!show); setProfile(false); }}
                >
                  <TfiAlignRight size={22}/>
                </div>
              </div>
            )}
            {!user && (
              <div className='flex gap-4'>
                <Link to="/login" className="text-sm text-green-700 font-semibold">Login</Link>
                <Link to="/register" className="text-sm text-green-700 font-semibold">Register</Link>
              </div>
            )}
          </div>
        </header>
      </div>
      
      {/* Sticky Header */}
      <div className={`bg-white h-24 w-full flex justify-between items-center flex-col shadow z-10 fixed transition-all duration-500 ${showStickyHeader ? 'top-0' : '-top-24'}`}>
        <header className={`my-bg w-full h-full flex items-center justify-between px-8 relative`}>
          <div className='bg-white pr-2 absolute -top-4 left-0 z-20 h-28 w-56 logo'>
            <div className='flex flex-col text-white items-center justify-center h-full w-full logo bg-green-800'>
              <div className='h-20 w-20'>
                <img 
                  src={logo} 
                  alt="logo"
                  className='w-full h-full object-cover' 
                />
              </div>
              <span className='text-2xl -mt-3'>e-library</span>
            </div>
          </div>
          <div className='border border-black'>
            logo
          </div>
          {/* Navbar Items */}
          <nav>
            <div>
              <Link to="/" className="mr-4">Home</Link>
              <Link to="/books" className="mr-4">Books</Link>
              <Link to="/profile" className="mr-4">Profile</Link>
              <Link to="/reservations" className="mr-4">Reservations</Link>
              <Link to="/borrowed" className="mr-4">Borrowed Books</Link>
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
                      src={png} 
                      alt="profile"
                      className='h-full w-full object-cover'
                    />
                  </div>
                </div>
                <div 
                  className='border border-gray-400 h-12 w-12 rounded-full flex items-center justify-center cursor-pointer'
                  onClick={() => { setShow(!show); setProfile(false); }}
                >
                  <TfiAlignRight size={22}/>
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
            <div className='border h-1/2 w-full rounded-lg flex items-center justify-center gap-4 cursor-pointer' onClick={() => { navigate('/profile'); setProfile(false); }}>
              <FaRegEdit color='white' size={24}/>
              <span className='text-white uppercase text-xs font-bold'>My Profile</span>
            </div>
          </div>
        </div>
      )}

      {/* Menu Items */}
      {user && (
        <div className={`h-fit fixed w-56 right-0 top-[115px] bg-black rounded-lg opacity-75 blur-1 z-10 flex justify-center items-center p-5 ${show ? 'block' : 'hidden'}`} ref={menuRef}>
          <div className='h-full w-full flex flex-col items-center justify-center gap-4'>
            <div className='h-7 w-full flex justify-center items-center cursor-pointer border-b border-gray-400 rounded-lg'>
              <input 
                type="text" 
                placeholder={isFocus ? '' : 'search categories'} 
                className={`w-full border-none h-full bg-transparent text-white outline-none ${!isFocus ? 'text-center' : 'text-left p-2'}`}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
              />
            </div>
            <div className='grid grid-cols-2 w-full gap-2'>
              <div className='border h-12 cursor-pointer w-full rounded-lg flex items-center justify-center gap-2 text-white capitalize text-xs'>
                <FaRegHeart size={22}/> 
                <span>Favorites</span>
              </div>
              <div className='border h-12 cursor-pointer w-full rounded-lg flex items-center justify-center gap-2 text-white capitalize text-xs'>
                <RiShoppingCartLine size={22}/> 
                <span>Cart</span>
              </div>
              <div className='border h-12 cursor-pointer w-full rounded-lg flex items-center justify-center gap-2 text-white capitalize text-xs'>
                <RiInboxArchiveLine size={22}/> 
                <span>Orders</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserNavbar;
