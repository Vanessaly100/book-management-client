import React from 'react'

const Preloader = () => {
  return (
    <div>
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="border-t-8 border-PrimaryColor border-solid w-20 h-20 rounded-full animate-spin"></div>
      </div>
    </div>
  );
}

export default Preloader