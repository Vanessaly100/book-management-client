import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
// import Layout from "./Layout";
import UserNavbar from "./UserNavbar";
import  { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/image_prev_ui.png';
import Layout from "./layout";
import AdminRoutes from "@/routes/AdminRoutes";

// const Navbar = () => {
  
//   const { user } = useAuth();
//   const navigate = useNavigate(); // Moved inside the component
  
//   const handleClick = () => {
//     // const navigate = useNavigate();
//     // 👇 We now import useNavigate INSIDE the function
//     navigate('/register'); 
//   }
//   const [show, setShow] = useState(false);
//   const [profile, setProfile] = useState(false);
//   const [showStickyHeader, setShowStickyHeader] = useState(false);
//   const menuRef = useRef(null);
//   const profileRef = useRef(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       const firstHeader = document.getElementById("main-header");
//       if (firstHeader) {
//         const { bottom } = firstHeader.getBoundingClientRect();
//         setShowStickyHeader(bottom <= 0);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);
  
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         menuRef.current && !menuRef.current.contains(event.target) &&
//         profileRef.current && !profileRef.current.contains(event.target)
//       ) {
//         setShow(false);
//         setProfile(false);
//       }
//     };

//     if (show || profile) {
//       document.body.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.body.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => document.body.removeEventListener("mousedown", handleClickOutside);
//   }, [show, profile]);

//   // console.log("Logged-in user:", user);


//  return (
//     <>
//       <nav>
//         {!user && (
//           <div className='bg-white text-black h-28 pt-4 w-full flex justify-between items-center flex-col shadow z-10' id='main-header'>
//             <div className='h-10 w-full flex justify-center items-center bg-green-600 text-white  relative overflow-hidden'>
//               <span className='moving-tex absolute flex justify-center items-center'>
//                 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem, id!
//               </span>
//             </div>
//             <header className='my-bg w-full h-20 flex items-center justify-between px-16 relative'>
//               <div className='bg-white pr-2 absolute -top-16 left-0 z-20 h-32 w-56 logo'>
//                 <div className='flex flex-col text-white items-center justify-center h-full w-full logo bg-green-800'>
//                   <div className='h-20 w-20'>
//                     <img src={logo} alt="logo" className='w-full h-full object-cover' />
//                   </div>
//                   <span className='text-2xl -mt-3'>e-library</span>
//                 </div>
//               </div>
//               <div className='border border-black'>logo</div>
//               <div className="font-[lato] font-medium">
//                 <Link to="/" className="mr-4">Home</Link>
//                 <Link to="/about" className="mr-4">About</Link>
//                 <Link to="/services" className="mr-4">Services</Link>
//               </div>
//               <div>
//                 <button className="bg-green-700 p-2 w-24 text-white uppercase rounded" onClick={() => console.log("Register clicked")}>
//                   Register
//                 </button>
//               </div>
//             </header>
//           </div>
//         )}

//         <div className={`bg-white text-black h-24 w-full flex justify-between items-center flex-col shadow z-10 fixed transition-all duration-500 ${showStickyHeader ? 'top-0' : '-top-24'}`}>
//           <header className='my-bg w-[100vw] h-20 flex items-center justify-between px-16 relative'>
//             <div className='bg-white pr-2 absolute -top-8 left-0 z-20 h-32 w-56 logo'>
//               <div className='flex flex-col text-white items-center justify-center h-full w-full logo bg-green-800'>
//                 <div className='h-20 w-20'>
//                   <img src={logo} alt="logo" className='w-full h-full object-cover' />
//                 </div>
//                 <span className='text-2xl -mt-3'>e-library</span>
//               </div>
//             </div>
//             <div className='border border-black'>logo</div>
//             <div className="font-[lato] font-medium">
//               <Link to="/" className="mr-4">Home</Link>
//               <Link to="/about" className="mr-4">About</Link>
//               <Link to="/services" className="mr-4">Services</Link>
//             </div>
//             <div>
//               <button className="bg-green-700 p-2 w-24 text-white uppercase rounded" onClick={() => console.log("Register clicked")}>
//                 Register
//               </button>
//             </div>
//           </header>
//         </div>

//         {user && (user.role === 'admin' ? <Layout /> : <UserNavbar />)}
//       </nav>
//     </>
//   );
// };

// export default Navbar;













// const Navbar = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [showStickyHeader, setShowStickyHeader] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       const firstHeader = document.getElementById("main-header");
//       if (firstHeader) {
//         const { bottom } = firstHeader.getBoundingClientRect();
//         setShowStickyHeader(bottom <= 0);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Show public navbar
//   if (!user) {
//     return (
//       <>
//         <nav>
//           {/* Main public header */}
//           <div className='bg-white text-black h-28 pt-4 w-full flex justify-between items-center flex-col shadow z-10' id='main-header'>
//             <div className='h-10 w-full flex justify-center items-center bg-green-600 text-white  relative overflow-hidden'>
//               <span className='moving-tex absolute flex justify-center items-center'>
//                 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem, id!
//               </span>
//             </div>
//             <header className='my-bg w-full h-20 flex items-center justify-between px-16 relative'>
//               <div className='bg-white pr-2 absolute -top-16 left-0 z-20 h-32 w-56 logo'>
//                 <div className='flex flex-col text-white items-center justify-center h-full w-full logo bg-green-800'>
//                   <div className='h-20 w-20'>
//                     <img src={logo} alt="logo" className='w-full h-full object-cover' />
//                   </div>
//                   <span className='text-2xl -mt-3'>e-library</span>
//                 </div>
//               </div>
//               <div className='border border-black'>logo</div>
//               <div className="font-[lato] font-medium">
//                 <Link to="/" className="mr-4">Home</Link>
//                 <Link to="/about" className="mr-4">About</Link>
//                 <Link to="/services" className="mr-4">Services</Link>
//               </div>
//               <div>
//                 <button className="bg-green-700 p-2 w-24 text-white uppercase rounded" onClick={() => navigate("/register")}>
//                   Register
//                 </button>
//               </div>
//             </header>
//           </div>

//           {/* Sticky Header */}
//           <div className={`bg-white text-black h-24 w-full flex justify-between items-center flex-col shadow z-10 fixed transition-all duration-500 ${showStickyHeader ? 'top-0' : '-top-24'}`}>
//             <header className='my-bg w-[100vw] h-20 flex items-center justify-between px-16 relative'>
//               <div className='bg-white pr-2 absolute -top-8 left-0 z-20 h-32 w-56 logo'>
//                 <div className='flex flex-col text-white items-center justify-center h-full w-full logo bg-green-800'>
//                   <div className='h-20 w-20'>
//                     <img src={logo} alt="logo" className='w-full h-full object-cover' />
//                   </div>
//                   <span className='text-2xl -mt-3'>e-library</span>
//                 </div>
//               </div>
//               <div className='border border-black'>logo</div>
//               <div className="font-[lato] font-medium">
//                 <Link to="/" className="mr-4">Home</Link>
//                 <Link to="/about" className="mr-4">About</Link>
//                 <Link to="/services" className="mr-4">Services</Link>
//               </div>
//               <div>
//                 <button className="bg-green-700 p-2 w-24 text-white uppercase rounded" onClick={() => navigate("/register")}>
//                   Register
//                 </button>
//               </div>
//             </header>
//           </div>
//         </nav>
//       </>
//     );
//   }

//   // After login: render the right navbar
//   return user.role === "admin" ? <Layout /> : <UserNavbar />;
// };

// export default Navbar;




// import {  useNavigate } from "react-router-dom";
// import { useAuth } from "../../contexts/AuthContext";
// import Layout from "./Layout";
// import UserNavbar from "./UserNavbar";
// import { useState, useEffect, useRef } from 'react';
// import logo from '../../assets/image_prev_ui.png';

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const [show, setShow] = useState(false);
  const [profile, setProfile] = useState(false);
  const menuRef = useRef(null);
  const profileRef = useRef(null);

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

  // Show public navbar if the user is not logged in
  if (!user) {
    return (
      <nav>
        {/* Main public header */}
        <div className="bg-white text-black h-28 pt-4 w-full flex justify-between items-center flex-col shadow z-10" id="main-header">
          <div className="h-10 w-full flex justify-center items-center bg-green-600 text-white relative overflow-hidden">
            <span className="moving-tex absolute flex justify-center items-center">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem, id!
            </span>
          </div>
          <header className="my-bg w-full h-20 flex items-center justify-between px-16 relative">
            <div className="bg-white pr-2 absolute -top-16 left-0 z-20 h-32 w-56 logo">
              <div className="flex flex-col text-white items-center justify-center h-full w-full logo bg-green-800">
                <div className="h-20 w-20">
                  <img src={logo} alt="logo" className="w-full h-full object-cover" />
                </div>
                <span className="text-2xl -mt-3">e-library</span>
              </div>
            </div>
            <div className="border border-black">logo</div>
            <div className="font-[lato] font-medium">
              <Link to="/" className="mr-4">Home</Link>
              <Link to="/about" className="mr-4">About</Link>
              <Link to="/services" className="mr-4">Services</Link>
            </div>
            <div>
              <button className="bg-green-700 p-2 w-24 text-white uppercase rounded" onClick={() => navigate("/register")}>
                Register
              </button>
            </div>
          </header>
        </div>

        {/* Sticky Header */}
        <div className={`bg-white text-black h-24 w-full flex justify-between items-center flex-col shadow z-10 fixed transition-all duration-500 ${showStickyHeader ? 'top-0' : '-top-24'}`}>
          <header className="my-bg w-[100vw] h-20 flex items-center justify-between px-16 relative">
            <div className="bg-white pr-2 absolute -top-8 left-0 z-20 h-32 w-56 logo">
              <div className="flex flex-col text-white items-center justify-center h-full w-full logo bg-green-800">
                <div className="h-20 w-20">
                  <img src={logo} alt="logo" className="w-full h-full object-cover" />
                </div>
                <span className="text-2xl -mt-3">e-library</span>
              </div>
            </div>
            <div className="border border-black">logo</div>
            <div className="font-[lato] font-medium">
              <Link to="/" className="mr-4">Home</Link>
              <Link to="/about" className="mr-4">About</Link>
              <Link to="/services" className="mr-4">Services</Link>
            </div>
            <div>
              <button className="bg-green-700 p-2 w-24 text-white uppercase rounded" onClick={() => navigate("/register")}>
                Register
              </button>
            </div>
          </header>
        </div>
      </nav>
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
