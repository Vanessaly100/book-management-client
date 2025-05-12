import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Navigation, Pagination, Scrollbar, A11y,Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';


const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <div>
      <main className="min-h-[90vh]">
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>

          <div className='flex gap-4 w-full'>
            <div className='bg-white rounded-md p-6 w-1/2 flex flex-col justify-between items-center'>
              <span className='font-semibold'>Borrowed</span>
              {/* borrowed books  */}
              <div className='border h-68 w-full rounded-md p-4 flex flex-col gap-2'>

              </div>
              <button className='flex items-center gap-2 text-green-700 font-semibold mt-2 hover:text-green-800 transition cursor-pointer duration-300'
              onClick={() => navigate('/user/borrowed')} >
                <span className=''>See all</span>
              </button>
            </div>
            <div className='bg-white rounded-md p-6 w-1/2 flex flex-col justify-between items-center'>
            <span className='font-semibold'>Reserved</span>
              {/* borrowed books  */}
              <div className='border h-68 w-full rounded-md p-4 flex flex-col gap-2'>

              </div>
              <button className='flex items-center gap-2 text-green-700 cursor-pointer font-semibold mt-2 hover:text-green-800 transition duration-300'
              onClick={() => navigate('/user/reservations')} >
                <span className=''>See all</span>
              </button>
            </div>
          </div>
          {/* user profile */}
          <div className='bg-white rounded-md p-6 h-96'>
            <div className='flex gap-4'>
              <div className='h-24 w-24 rounded-full cursor-pointer overflow-hidden'>
                <div
                  className='h-24 w-24 rounded-full bg-gray-300'
                >
                  <img 
                    src={user.profile_picture_url} 
                    alt="profile"
                    className='h-24 w-24 object-cover'
                  />
                </div>
              </div>
              <div className='flex flex-col justify-center'>
                <h2 className='text-xl font-semibold'>{user.first_name + ' '
                + user.last_name}</h2>
                <p className='text-gray-500'>{user.email}</p>
              </div>

            </div>
            <div className='flex flex-col gap-2 mt-2 border border-red-950 h-48 rounded-md p-4'>
              
            </div>

            <div className='flex items-center justify-center'>
            <button className='bg-green-700 text-white font-semibold py-2 px-4 rounded-md mt-2 hover:bg-green-800 transition duration-300'
            onClick={() => navigate('/user/edit-profile')}
            >
              Edit Profile
            </button>
            </div>
          </div>

        </div>
        {/* sliders */}
        <div>
          <div className='bg-white rounded-md p-6 mt-6'>
          <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={20}
      className="!w-full" 
      centeredSlides={true}
      navigation
      autoplay ={{ delay: 2000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      <SwiperSlide>
        <div className='h-68 w-full bg-gray-300 rounded-md'>
          
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='h-68 w-full bg-gray-300 rounded-md'>
          
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='h-68 w-full bg-gray-300 rounded-md'>
          
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='h-68 w-full bg-gray-300 rounded-md'>
          
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='h-68 w-full bg-gray-300 rounded-md'>
          
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='h-68 w-full bg-gray-300 rounded-md'>
          
        </div>
      </SwiperSlide>
    </Swiper>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard