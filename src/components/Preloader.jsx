import React from "react";
import { FaBook } from "react-icons/fa"; // using react-icons for the book icon

const Preloader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="relative w-24 h-24">
        {/* Spinner ring */}
        <div className="w-full h-full border-8 border-t-ActionPurple border-gray-800 rounded-full animate-spin"></div>

        {/* Book icon in center */}
        <div className="absolute inset-0 flex items-center justify-center text-white text-3xl">
          <FaBook />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
