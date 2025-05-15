// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useAuth } from "../../contexts/AuthContext";

// const BookCard = ({ book, borrowedBooks, onUpdate }) => {
//   const { user } = useAuth();
//   const [status, setStatus] = useState("available");
//   const [rating, setRating] = useState(0);
//   const [showRecommendations, setShowRecommendations] = useState(false);
//   const [recommendations, setRecommendations] = useState([]);

//   useEffect(() => {
//     if (borrowedBooks.includes(book.id)) {
//       setStatus("borrowed");
//     } else if (book.available_copies === 0) {
//       setStatus("unavailable");
//     } else {
//       setStatus("available");
//     }
//   }, [borrowedBooks, book]);

//   const handleBorrow = async () => {
//     if (!book || !book.id) {
//       alert("Book ID is missing — cannot borrow.");
//       return;
//     }

//     try {
//       if (status === "available") {
//         await axios.post(
//           "http://localhost:4000/api/borrowing",
//           {
//             user_id: user.user_id,
//             bookIds: [book.id],
//           },
//           { withCredentials: true }
//         );
//         setStatus("borrowed");
//       } else if (status === "borrowed") {
//         await axios.put(
//           "http://localhost:4000/api/borrowing/return",
//           {
//             user_id: user.user_id,
//             bookIds: [book.id],
//           },
//           { withCredentials: true }
//         );
//         setStatus("available");
//       } else if (status === "unavailable") {
//         await axios.post(
//           "http://localhost:4000/api/reservations",
//           {
//             user_id: user.user_id,
//             book_id: book.id,
//           },
//           { withCredentials: true }
//         );
//         setStatus("reserved");
//       }

//       onUpdate();
//     } catch (err) {
//       alert(err.response?.data?.message || "Action failed");
//     }
//   };

//   const handleRating = async (value) => {
//     setRating(value);
//     try {
//       await axios.post(
//         "http://localhost:4000/api/reviews",
//         {
//           user_id: user.user_id,
//           book_id: book.id,
//           rating: value,
//         },
//         { withCredentials: true }
//       );
//     } catch (err) {
//       console.error("Rating failed", err);
//     }
//   };

//   const toggleRecommendations = async () => {
//     if (!showRecommendations) {
//       try {
//         const res = await axios.get(
//           "http://localhost:4000/api/recommendations/user",
//           { withCredentials: true }
//         );
//         setRecommendations(res.data.recommendations);
//       } catch (err) {
//         console.error("Failed to fetch recommendations", err);
//       }
//     }
//     setShowRecommendations(!showRecommendations);
//   };

//   return (
//     <div className="border p-4 rounded shadow-md">
//       <h2 className="text-lg font-bold">{book.title}</h2>
//       <p>By: {book.author_name}</p>
//       <p>Status: {status}</p>

//       {/* Action Buttons */}
//       {status === "available" && (
//         <button
//           onClick={handleBorrow}
//           className="bg-green-500 text-white px-4 py-2 rounded mt-2"
//         >
//           Borrow
//         </button>
//       )}
//       {status === "borrowed" && (
//         <button
//           onClick={handleBorrow}
//           className="bg-yellow-500 text-white px-4 py-2 rounded mt-2"
//         >
//           Return
//         </button>
//       )}
//       {status === "unavailable" && (
//         <button
//           onClick={handleBorrow}
//           className="bg-gray-500 text-white px-4 py-2 rounded mt-2"
//         >
//           Reserve
//         </button>
//       )}
//       {status === "reserved" && (
//         <p className="text-blue-500 mt-2">Reserved! We’ll notify you.</p>
//       )}

//       {/* Rating */}
//       <div className="flex mt-2">
//         {[1, 2, 3, 4, 5].map((val) => (
//           <span
//             key={val}
//             className={`cursor-pointer text-xl ${
//               val <= rating ? "text-yellow-400" : "text-gray-400"
//             }`}
//             onClick={() => handleRating(val)}
//           >
//             ★
//           </span>
//         ))}
//       </div>

//       {/* Recommendations */}
//       <div className="mt-2">
//         <button onClick={toggleRecommendations} className="text-blue-500">
//           ☰ Show Recommendations
//         </button>
//         {showRecommendations && (
//           <ul className="list-disc ml-6 mt-2">
//             {recommendations.map((rec, index) => (
//               <li key={index}>{rec.title}</li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookCard;


import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import * as Dialog from '@radix-ui/react-dialog';

const BookCard = ({ book, isBorrowed, availableCopies, onActionComplete }) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0); 
  const [comment, setComment] = useState(''); 
  const [showReviewModal, setShowReviewModal] = useState(false);
  
   const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);
  const [avgRating, setAvgRating] = useState(book.avgRating || 0);

  const handleBorrow = async () => {
    try {
      await axios.post('http://localhost:4000/api/borrowing', {
        user_id: user.user_id,
        bookIds: [book.id],
      }, { withCredentials: true });
      onActionComplete();
    } catch (err) {
      console.error('Borrow failed:', err);
    }
  };

  const handleReturn = async () => {
    try {
      await axios.put('http://localhost:4000/api/borrowing/return', {
        user_id: user.user_id,
        bookIds: [book.id],
      }, { withCredentials: true });
      onActionComplete();
      setShowReviewModal(true); // open review modal after return
    } catch (err) {
      console.error('Return failed:', err);
    }
  };

  const handleReserve = async () => {
    try {
      await axios.post('http://localhost:4000/api/reservations', {
        user_id: user.user_id,
        bookIds: [book.id],
      }, { withCredentials: true });
      onActionComplete();
    } catch (err) {
      console.error('Reserve failed:', err);
    }
  };

  const submitReview = async () => {
    try {
      const payload = {
        book_id: book.id,
        rating,
        comment
      };

      console.log("Submitting review:", payload);

      await axios.post("http://localhost:4000/api/reviews", payload, {
        withCredentials: true
      });

      setComment("");
      setRating(0);
      setShowReviewModal(false);
      onActionComplete();
    } catch (err) {
      console.error("Review failed:", err.response?.data || err.message);
    }
  };

  const renderActionButton = () => {
    if (isBorrowed) {
      return <button onClick={handleReturn}>Return</button>;
    } else if (availableCopies === 0) {
      return <button onClick={handleReserve}>Reserve</button>;
    } else {
      return <button onClick={handleBorrow}>Borrow</button>;
    }
  };

const submitRating = async (ratingValue) => {
  if (!book.book.book_id || !ratingValue) {
    console.error("Book ID or Rating is missing!");
    return;
  }

  try {
    const res = await axios.post(
      "http://localhost:4000/api/ratings", // Ensure this URL is correct
      {
        book_id: book.book_id, // Correct field to pass book ID
        rating: ratingValue,   // Ensure rating value is correctly passed
      },
      {
        withCredentials: true
      }
    );
console.log("bookidddddd", res)
    if (res.status === 200) {
      setSelected(ratingValue);
      setAvgRating(res.data.avgRating); // Update UI with new average if needed
    } else {
      console.error("Rating submission failed", res);
    }
    
  } catch (err) {
    if (err.response) {
      // Backend error
      console.error("Rating submission failed with error response", err.response.data);
    } else if (err.request) {
      // No response received from the server
      console.error("No response received", err.request);
    } else {
      // Any other errors during setting up the request
      console.error("Error during rating submission", err.message);
    }
  }
};


//   const submitRating = async (ratingValue) => {
//     try {
//       const res = await axios.post(
//         "http://localhost:4000/api/ratings",
//         {
//           book_id: book.book.id, 
//           rating: ratingValue,
//         },
//         {
//         withCredentials: true
//       }
//       );
//       setSelected(ratingValue);
//       setAvgRating(res.data.avgRating); // update with new average if returned
//     } catch (err) {
//       console.error("Rating submission failed", err.response?.data);
//     }
//   };

  return (
    <div className="p-4 border rounded shadow">
      <h3 className="text-lg font-semibold">{book.title}</h3>

      {/* ⭐ Show average rating if available */}
      <div className="flex items-center mb-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => submitRating(star)}
          className={`text-xl cursor-pointer transition-colors duration-200 ${
            (hovered || selected || avgRating) >= star
              ? "text-yellow-500"
              : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
      <span className="ml-2 text-sm text-gray-500">
        ({avgRating?.toFixed(1) || "0.0"})
      </span>
    </div>
      <p>{book.description}</p>
      <p>Available: {availableCopies}</p>
      {renderActionButton()}

      {/* Optional manual trigger */}
      <button onClick={() => setShowReviewModal(true)} className="text-xl ml-2">⋮</button>

      {/* Review Modal */}
      <Dialog.Root open={showReviewModal} onOpenChange={setShowReviewModal}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <Dialog.Content className="fixed p-6 bg-white rounded-md w-96 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Dialog.Title className="text-lg font-bold mb-2">Rate and Review</Dialog.Title>

            {/* ⭐ Rating Stars */}
            <div className="flex gap-1 my-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  className={`cursor-pointer text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
                >
                  ★
                </span>
              ))}
            </div>

            {/* 📝 Review Textarea */}
            <textarea
              className="w-full p-2 border rounded"
              rows="3"
              placeholder="Write your review here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            {/* Modal Actions */}
            <div className="flex justify-end mt-4">
              <button onClick={() => setShowReviewModal(false)} className="mr-2 text-gray-600">Cancel</button>
              <button onClick={submitReview} className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default BookCard;
