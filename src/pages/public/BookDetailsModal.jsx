import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import BooksImage1 from "../../assets/books-Two.jpg";
import {
    Navigation,
    Pagination,
    Scrollbar,
    A11y,
    Autoplay,
  } from "swiper/modules";
  import { Swiper, SwiperSlide } from "swiper/react";
  
  // Import Swiper styles
  import "swiper/css";
  import "swiper/css/navigation";
  import "swiper/css/pagination";
  // import 'swiper/css/scrollbar';
  

const BookDetailsModal = ({ book, onClose }) => {
  const [recommended, setRecommended] = useState([]);

//   const swiperRef = useRef();
  const swiperRef = useRef(null);


  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.update(); // Force re-render
      swiperRef.current.swiper.autoplay.start(); // Force autoplay to start
    }
  }, [recommended]);
  

useEffect(() => {
    const fetchRecommendedBooks = async () => {
      try {
        const res = await axios.get(
          "https://project-backend-7hi1.onrender.com/api/recommendations/user",
          {
            withCredentials: true,
          }
        );
        console.log("recommendation", res.data.data);
        setRecommended(res.data.data);
      } catch (error) {
        console.error("Failed to fetch recommended books:", error);
      }
    };   

    if (book?.id) fetchRecommendedBooks();
  }, [book.id]);


  const handleClose = () => {
    if (typeof onClose === "function") {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black opacity-100">

<div className="relative max-h-[90vh] w-[90%] overflow-y-auto bg-white rounded-lg">
<section>
          <div className="relative h-[300px] rounded-md overflow-hidden mb-8">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${BooksImage1})` }}
            >
              <div className="absolute inset-0 bg-black opacity-30"></div>
            </div>
            <div className="relative z-10 h-full flex items-center justify-center text-white px-6">
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold">Books</h1>
                <p className="mt-4 text-lg md:text-xl w-full md:w-3/4 mx-auto">
                  Explore thousands of books. Discover your next great read. Browse. Reserve. Read.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="   bg-white rounded-lg shadow-lg text-black p-6">
        {/* Hero Section */}

        <div className=" max-w-5xl">
          {/* Close Button (Top Right) */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-700 hover:text-red-500 text-2xl font-bold"
          >
            &times;
          </button>

          {/* Book Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {book.CoverImage && (
              <img
                src={book.CoverImage}
                alt={book.title}
                className="w-full h-[350px] object-cover rounded-lg shadow"
              />
            )}
            <div>
              <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
              <p>
                <strong>Author:</strong> {book.author}
              </p>
              <p>
                <strong>Category:</strong> {book.category}
              </p>
              <p>
                <strong>Available Copies:</strong> {book.availableCopies}
              </p>
              
            </div>
          </div>
          <div className="mt-6">
                <strong>Summary:</strong>
                <p className="mt-1 whitespace-pre-wrap text-gray-700">
                  {book.description}
                </p>
              </div>
        </div>
      </div>

      {/* Recommendation */}
      
        {/* Recommended Section */}
        {/* sliders */}
        <div>
          <h1 className="font-bold">Recommendation</h1>
          <div className="bg-white rounded-md  mt-6">
            <Swiper
            ref={swiperRef}
              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
              spaceBetween={20}
              centeredSlides={true}
              navigation={true} // enables prev/next buttons
              loop={true} // continuous loop
              autoplay={{
                delay: 3000,
                disableOnInteraction: false, // keeps autoplay after manual navigation
              }}
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {recommended.map((book, index) => (
                <SwiperSlide key={index}>
                  <div className="h-full w-full bg-gray-100 rounded-md p-4 flex flex-col items-center">
                    <img
                      src={book.cover_url}
                      alt={book.title}
                      className="h-[300px] w-full object-cover rounded-md mb-2"
                    />
                    <h4 className="text-sm font-semibold truncate">
                      {book.title}
                    </h4>
                    <p className="text-xs text-gray-700">
                      {book.author?.name || "Unknown Author"}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

      {/* Bottom Close Button */}
      <div className="my-8 flex justify-end">
        <button onClick={handleClose} className="bg-ActionMiniPurple cursor-pointer text-white px-4 py-2 rounded">Close</button>
        </div>

</div>
    </div>
  );
};

export default BookDetailsModal;
