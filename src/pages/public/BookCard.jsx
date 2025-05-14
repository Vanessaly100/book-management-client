import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

const BookCard = ({ book, borrowedBooks, onUpdate }) => {
  const { user } = useAuth();
  const [status, setStatus] = useState("available");
  const [rating, setRating] = useState(0);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (borrowedBooks.includes(book.id)) {
      setStatus("borrowed");
    } else if (book.available_copies === 0) {
      setStatus("unavailable");
    } else {
      setStatus("available");
    }
  }, [borrowedBooks, book]);

  const handleBorrow = async () => {
    if (!book || !book.id) {
      alert("Book ID is missing — cannot borrow.");
      return;
    }

    try {
      if (status === "available") {
        await axios.post(
          "http://localhost:4000/api/borrowing",
          {
            user_id: user.user_id,
            bookIds: [book.id],
          },
          { withCredentials: true }
        );
        setStatus("borrowed");
      } else if (status === "borrowed") {
        await axios.put(
          "http://localhost:4000/api/borrowing/return",
          {
            user_id: user.user_id,
            bookIds: [book.id],
          },
          { withCredentials: true }
        );
        setStatus("available");
      } else if (status === "unavailable") {
        await axios.post(
          "http://localhost:4000/api/reservations",
          {
            user_id: user.user_id,
            book_id: book.id,
          },
          { withCredentials: true }
        );
        setStatus("reserved");
      }

      onUpdate();
    } catch (err) {
      alert(err.response?.data?.message || "Action failed");
    }
  };

  const handleRating = async (value) => {
    setRating(value);
    try {
      await axios.post(
        "http://localhost:4000/api/reviews",
        {
          user_id: user.user_id,
          book_id: book.id,
          rating: value,
        },
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Rating failed", err);
    }
  };

  const toggleRecommendations = async () => {
    if (!showRecommendations) {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/recommendations/user",
          { withCredentials: true }
        );
        setRecommendations(res.data.recommendations);
      } catch (err) {
        console.error("Failed to fetch recommendations", err);
      }
    }
    setShowRecommendations(!showRecommendations);
  };

  return (
    <div className="border p-4 rounded shadow-md">
      <h2 className="text-lg font-bold">{book.title}</h2>
      <p>By: {book.author_name}</p>
      <p>Status: {status}</p>

      {/* Action Buttons */}
      {status === "available" && (
        <button
          onClick={handleBorrow}
          className="bg-green-500 text-white px-4 py-2 rounded mt-2"
        >
          Borrow
        </button>
      )}
      {status === "borrowed" && (
        <button
          onClick={handleBorrow}
          className="bg-yellow-500 text-white px-4 py-2 rounded mt-2"
        >
          Return
        </button>
      )}
      {status === "unavailable" && (
        <button
          onClick={handleBorrow}
          className="bg-gray-500 text-white px-4 py-2 rounded mt-2"
        >
          Reserve
        </button>
      )}
      {status === "reserved" && (
        <p className="text-blue-500 mt-2">Reserved! We’ll notify you.</p>
      )}

      {/* Rating */}
      <div className="flex mt-2">
        {[1, 2, 3, 4, 5].map((val) => (
          <span
            key={val}
            className={`cursor-pointer text-xl ${
              val <= rating ? "text-yellow-400" : "text-gray-400"
            }`}
            onClick={() => handleRating(val)}
          >
            ★
          </span>
        ))}
      </div>

      {/* Recommendations */}
      <div className="mt-2">
        <button onClick={toggleRecommendations} className="text-blue-500">
          ☰ Show Recommendations
        </button>
        {showRecommendations && (
          <ul className="list-disc ml-6 mt-2">
            {recommendations.map((rec, index) => (
              <li key={index}>{rec.title}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BookCard;
