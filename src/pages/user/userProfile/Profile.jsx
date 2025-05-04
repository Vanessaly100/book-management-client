import React from 'react'
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { FiUser,  FiHome } from "react-icons/fi";
import LogoutButton from '@/components/buttons/LogoutButton';
import { useAuth } from '@/contexts/AuthContext';


const Profile = () => {
  const {user} = useAuth();

  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen">
      
      {/* Sidebar */}
      <aside className="w-57 bg-tealGreenish text-white p-4 space-y-4">
        <h2 className="text-2xl font-bold mb-6">My Profile</h2>
        <nav className="flex flex-col space-y-2">
          <div className=" text-white cursor-pointer flex gap-2 items-center" onClick={() => navigate("/user/home")}>
            < FiHome size={20} className="text-Gold" />
            <span>Home</span>
          </div>
          <NavLink 
            to="reviews"
            className={({ isActive }) => isActive ? "text-Gold" : "text-white"}
          >
            Reviews
          </NavLink>
          <NavLink 
            to="reservations"
            className={({ isActive }) => isActive ? "text-Gold" : "text-white"}
          >
            Reservations
          </NavLink>
          <NavLink 
            to="borrowed"
            className={({ isActive }) => isActive ? "text-Gold" : "text-white"}
          >
            Borrowed Books
          </NavLink>
          <NavLink 
            to="edit"
            className={({ isActive }) => isActive ? "text-Gold" : "text-white"}
          >
            Edit Profile
          </NavLink>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-darkOffWhite">
        
        {/* Top bar: search + profile */}
        <div className="flex items-center justify-between mb-8 bg-[#EAEAEA] p-4 shadow-2xl ">
          
          {/* Search bar */}
          <div className="flex-1 max-w-md">
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full p-2 rounded-lg border bg-darkOffWhite border-darkTealGreenish focus:outline-none focus:border-Gold"
            />
          </div>

          {/* Profile Icon */}
          <div className="flex items-center space-x-5">
            <span className='capitalize font-bold'>hi {user.first_name }!</span>
            <button className="p-2 rounded-full bg-darkTealGreenish text-white hover:bg-Gold">
              <FiUser size={24} />
            </button>
            <LogoutButton />
          </div>

        </div>

        {/* Page content (outlet) */}
        <Outlet />
      </main>

    </div>
  );
}

export default Profile
