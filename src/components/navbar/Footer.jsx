import React from 'react';
import { useState } from 'react';
import { RiArrowRightFill, RiFacebookFill, RiInstagramFill, RiTwitterFill } from "react-icons/ri";

const Footer = () => {
    const [isFocused, setFocused] = useState(false);
  const inputStyle = {
    border: isFocused ? 'none' : 'none',
    padding: '8px',
    outline: 'none',
  };
  return (
    <>
      <div className="bg-two">
        <div className="w-full h-full bg-[#000000b1]">
        <div className="w-4/5 m-auto py-14 grid md:grid-cols-2 grid-cols-1 justify-center items-center gap-10 text-white">
        <div>ads</div>
        <div>
              <div className='w-fit font-[lato] text-sm flex flex-col gap-2'>
              <h1 className="capitalize font-[playfair] font-bold text-xl">Contact us</h1>
                <p>No 30 Wuze, Maitaima , Off Crescent Road Abuja, Nigeria</p>
                <p>090-456677889, 090-22456777</p>
                <p>e-library@yahoo.com</p>
              </div>
            </div>
            <div className="w-[80%] font-[lato] flex flex-col gap-3">
              <div className="flex gap-3 items-center">
                <div>logo</div>
                {/* <img src={icon} alt="icon" className="w-10" /> */}
                <h1 className="font-[playfair] font-bold text-xl">E-library name </h1>
              </div>
              <div>
                <p className="text-sm">Your perfect sanctuary for knowledge and discovery. Where learning meets accessibility. Every book, every resource a masterpiece at your fingertips. </p>
              </div>
              <div className="flex gap-2">
                <div className="border border-white w-5 h-5 rounded-full flex items-center justify-center">
                <RiFacebookFill />
                </div>
                <div className="border border-white w-5 h-5 rounded-full flex items-center justify-center">
                <RiTwitterFill/>
                </div>
                <div className="border border-white w-5 h-5 rounded-full flex items-center justify-center">
                <RiInstagramFill/>
                </div>
              </div>
            </div>
            
            
            <div className="w-[80%] font-[lato] text-sm flex flex-col gap-3">
                <h1 className="font-[playfair] font-bold text-xl">Subscribe</h1>
                <p>Want to be notified about our services. Just sign up and we will send you notification by email</p>
                <div className="border border-white w-full h-9 rounded-3xl flex pr-1 pl-3 justify-between items-center">
                    <input 
                    type="email" 
                    placeholder={isFocused? '': 'Email Address'}
                    className="bg-transparent h-7 w-4/5"
                    style={inputStyle}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    />
                    <button className={"flex items-center justify-center h-7 w-11 rounded-full bg-green-700"}> <RiArrowRightFill/> </button>
                </div>
            </div>
            

        </div>
        </div>
      </div>
    </>
  )
}

export default Footer