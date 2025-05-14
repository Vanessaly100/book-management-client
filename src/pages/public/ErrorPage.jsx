import React from 'react';
import png from '../../assets/404.png';
import { RiArrowRightLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';


const ErrorPage = ({route, page}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate({ route});
  }
  return (
    <div className='py-20 flex items-center justify-center'> 
      <div className='flex items-center justify-center gap-8 flex-col'>  
        <div>
          <img src={png} alt="" />
        </div>
        <div className='flex flex-col gap-4 justify-center items-center'>
        <h1 className='md:text-6xl text-3xl font-[lato] font-bold'><span className='text-red-600 md:text-4xl text-2xl font-[playfair]'>OOPS!</span>{page}</h1>
        <span className='text-xl font-medium'>The page you are looking for does not exist</span>
        </div>

        <button className='capitalize flex justify-between items-center py-3 px-6 w-48 rounded-xl bg-green-700 text-white font-medium' onClick={handleClick}><span>back to home</span> <RiArrowRightLine/> </button>
      </div>
    </div>
  )
}

export default ErrorPage