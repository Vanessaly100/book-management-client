import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from 'react';
import axios from "axios";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { getUserBorrowedBooks } from "@/api/borrow";
import { getMyReservations } from "../../../api/reservationApi";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination"; 
// import 'swiper/css/scrollbar';

const Dashboard = () => {
  const navigate = useNavigate();
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [reservations, setReservations] = useState([]);
  const { user } = useAuth();
  const userId = user?.user_id;
  console.log(user);

  // Fetch borrowed books on component mount
  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      if (!userId) return;
      try {
        const data = await getUserBorrowedBooks(userId);
        console.log("API response data:", data);
        // console.log("First borrowed book:", data[0]); 
        setBorrowedBooks(data || []); 
      } catch (error) {
        console.error("Error fetching borrowed books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBorrowedBooks();
  }, [userId]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await getMyReservations();
        setReservations(
          Array.isArray(data?.reservations) ? data.reservations : []
        );
      } catch (err) {
        console.error("Failed to load reservations", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

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
        setRecommendedBooks(res.data.data);
      } catch (error) {
        console.error("Failed to fetch recommended books:", error);
      }
    };   

    fetchRecommendedBooks();
  }, []);

  return (
    <div>
      <main className="min-h-[90vh]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex gap-4 w-full">
            <div className="bg-white rounded-md p-6 w-1/2 flex flex-col justify-between items-center">
              <span className="font-semibold">Borrowed</span>
              {/* borrowed books  */}
              <div className=" h-68 w-full rounded-md flex   flex-col gap-2">
                {loading ? (
                  <p>Loading...</p>
                ) : borrowedBooks.length === 0 ? (
                  <p>No borrowed books</p>
                ) : (
                  <div className="relative">
                    <Swiper
                      modules={[
                        Navigation,
                        Pagination,
                        Scrollbar,
                        A11y,
                        Autoplay,
                      ]}
                      spaceBetween={10}
                      slidesPerView={1}
                      // navigation={{
                      //   nextEl: '.swiper-next',
                      //   prevEl: '.swiper-prev',
                      // }}
                      // loop={true}
                      loop={borrowedBooks.length > 1}
                      autoplay={{ delay: 3000, disableOnInteraction: false }}
                      pagination={{ clickable: true }}
                      scrollbar={{ draggable: true }}
                      className="!w-full h-full"
                    >
                      {Array.isArray(borrowedBooks) &&
                        borrowedBooks.slice(0, 6).map((book, index) => (
                          <SwiperSlide key={index}>
                            <div className="bg-gray-300 shadow rounded-md p-4 h-full flex flex-col justify-between">
                              <h4 className="text-md font-semibold truncate">
                                {book.book.title}
                              </h4>
                              <img
                                src={book.book.cover_url}
                                alt={book.book.title}
                                className="h-48 w-full object-cover"
                              />
                              <p className="text-xs text-black mt-2">
                                Due:{" "}
                                {new Date(book.due_date).toLocaleDateString()}
                              </p>
                            </div>
                          </SwiperSlide>
                        ))}
                    </Swiper>
                  </div>
                )}
              </div>
              <button
                className="flex items-center gap-2 text-ActionMiniPurple font-semibold mt-2 hover:text-ActionPurple transition cursor-pointer duration-300"
                onClick={() => navigate("/user/borrowed")}
              >
                <span className="">See all</span>
              </button>
            </div>
            <div className="bg-white rounded-md p-6 w-1/2 flex flex-col justify-between items-center">
              <span className="font-semibold">Reserved</span>

              <div className="h-68 w-full bg-gray-300 rounded-md p-4 flex flex-col gap-2">
                {loading ? (
                  <p>Loading...</p>
                ) : reservations.length === 0 ? (
                  <p className="text-gray-500">No reservations available</p>
                ) : reservations.length === 1 ? (
                  <div className="p-2  rounded-md shadow-sm">
                    <img
                      src={reservations[0].book?.cover_url}
                      alt={reservations[0].book?.title}
                      className="h-48 w-full object-cover"
                    />
                    <p className="text-sm text-gray-600">
              Reserved on: {new Date(reservations[0].createdAt).toLocaleDateString()}
            </p>
                  </div>
                ) : (
                  <Swiper spaceBetween={10} slidesPerView={1}>
                    {reservations.map((res) => (
                      <SwiperSlide key={res.reservation_id}>
                        <div className="p-2 border rounded-md shadow-sm">
                          <p className="font-semibold">
                            {res.book?.title || "Untitled Book"}
                          </p>
                          <p className="text-sm text-gray-600">
                            Reserved on:{" "}
                            {new Date(res.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </div>

              <button
                className="flex items-center gap-2 text-ActionMiniPurple cursor-pointer font-semibold mt-2 hover:text-ActionPurple transition duration-300"
                onClick={() => navigate("/user/reservations")}
              >
                <span className="">See all</span>
              </button>
            </div>
          </div>
          {/* user profile */}
          <div className="bg-white rounded-md p-6 h-96">
            <div className="flex gap-3">
              <div className="h-18 w-18 rounded-full cursor-pointer overflow-hidden">
                <div className="h-18 w-18 rounded-full bg-gray-300">
                  <img
                    src={user.profile_picture_url}
                    alt="profile"
                    className="h-18 w-18 rounded-full object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="text-xl font-semibold">
                  {user.first_name + " " + user.last_name}
                </h2>
                <p className="text-gray-500">{user.email}</p>
              </div>
            </div>
            <div className="mt-2 border border-gray-200 rounded-md p-4">
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                <div className="flex flex-col">
                  <span className="text-gray-500 font-medium">First Name</span>
                  <span>{user.first_name}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500 font-medium">Last Name</span>
                  <span>{user.last_name}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500 font-medium">Email</span>
                  <span>{user.email}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500 font-medium">
                    Phone Number
                  </span>
                  <span>{user.phone_number}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500 font-medium">Location</span>
                  <span>{user.location}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500 font-medium">Membership</span>
                  <span
                    className={`
        font-semibold 
        ${
          user.membership_type === "premium"
            ? "text-yellow-600"
            : "text-gray-800"
        }
      `}
                  >
                    {user.membership_type}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500 font-medium">Points</span>
                  <span className="font-semibold">{user.points}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500 font-medium">Joined</span>
                  <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <button
                className="bg-ActionMiniPurple text-white font-semibold py-2 px-4 rounded-md mt-2 hover:bg-ActionPurple transition duration-300"
                onClick={() => navigate("/user/edit")}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
        {/* sliders */}
        <div>
          <h1 className="font-bold">Recommendation</h1>
          <div className="bg-white rounded-md  mt-6">
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
              spaceBetween={20}
              className="!w-full"
              centeredSlides={true}
              navigation
              loop={true} // <-- This makes the Swiper loop infinitely
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {recommendedBooks.map((book, index) => (
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
      </main>
    </div>
  );
};

export default Dashboard;
