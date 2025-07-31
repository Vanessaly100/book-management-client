
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import * as Dialog from '@radix-ui/react-dialog';
import { toast } from 'react-toastify';
import BookDetailsModal from './BookDetailsModal';

const RatingStars = ({ rating }) => (
  <div className="flex items-center mb-2">
    {[1, 2, 3, 4, 5].map((star) => (
      <span
        key={star}
        className={`text-xl ${rating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
      >
        ★
      </span>
    ))}
    <span className="ml-2 text-sm text-gray-500">
      ({rating?.toFixed(1) || "0.0"})
    </span>
  </div>
);

const BookCard = ({ book, isBorrowed, availableCopies, onActionComplete }) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [averageRating, setAverageRating] = useState(book.avgRating || 0);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  // Set initial avgRating
  useEffect(() => {
    setAverageRating(book?.avgRating || 0);
  }, [book]);

  // Check if user already reviewed
  useEffect(() => {
    const checkReview = async () => {
      if (user && book?.id) {
        try {
          const res = await axios.get(`https://project-backend-7hi1.onrender.com/api/reviews/user/${user.user_id}/book/${book.id}`, {
            withCredentials: true
          });
          setHasReviewed(res.data.hasReviewed);
        } catch (err) {
          console.error("Failed to check review:", err);
        }
      }
    };
    checkReview();
  }, [user, book]);

  const handleBorrow = async () => {
    try {
      await axios.post('https://project-backend-7hi1.onrender.com/api/borrowing', {
        user_id: user.user_id,
        bookIds: [book.id],
      }, { withCredentials: true });
      toast.success("Book borrowed successfully.");
      onActionComplete();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Borrow failed.');
    }
  };

  const handleReturn = async () => {
    try {
      await axios.put('https://project-backend-7hi1.onrender.com/api/borrowing/return', {
        user_id: user.user_id,
        bookIds: [book.id],
      }, { withCredentials: true });
      toast.success("Book returned successfully.");
      onActionComplete();
      setShowReviewModal(true);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Return failed.');
    }
  };

  const handleReserve = async () => {
    try {
      await axios.post('https://project-backend-7hi1.onrender.com/api/reservations', {
        book_id: book.id, // send single book_id
      }, { withCredentials: true });
  
      toast.success("Book reserved successfully.");
      onActionComplete();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Reservation failed.');
    }
  };
  

  const submitReview = async () => {
    try {
      const payload = {
        book_id: book.id,
        rating,
        comment
      };

      await axios.post("https://project-backend-7hi1.onrender.com/api/reviews", payload, {
        withCredentials: true
      });

      toast.success("Review submitted successfully.");
      setComment("");
      setRating(0);
      setShowReviewModal(false);

      const response = await axios.get(`https://project-backend-7hi1.onrender.com/api/books/${book.id}`, {
        withCredentials: true
      });
      setAverageRating(response.data.avgRating);
      setHasReviewed(true);
      onActionComplete();
    } catch (err) {
      toast.error(err.response?.data?.message || "Review failed.");
    }
  };

  const renderActionButton = () => {
    if (isBorrowed) {
      return <button onClick={handleReturn} className='w-full bg-red-500 py-2 text-white rounded-md cursor-pointer'>Return</button>;
    } else if (availableCopies === 0) {
      return <button onClick={handleReserve} className='w-full bg-ActionMiniPurple py-2 text-white rounded-md cursor-pointer'>Reserve</button>;
    } else {
      return <button onClick={handleBorrow} className='w-full bg-ActionPurple py-2 text-white rounded-md cursor-pointer'>Borrow</button>;
    }
  };

  return (
    <>
    <div className="p-4 rounded shadow bg-darkMainCardBg border-gray-300 border text-white">
    <div onClick={() => setSelectedBook(book)} className="cursor-pointer">
    {book.CoverImage && (
        <img
          src={book.CoverImage}
          alt={book.title}
          className="w-full h-48 object-cover rounded-lg mb-2"
        />
      )}
    </div>
      
      
      <h3 className="text-lg font-semibold truncate w-full">{book.title}</h3>
      <p className="text-gray-200">By : {book.author}</p>
      <p className="text-gray-200">Published: {book.publishedYear}</p>
      {/* <p className="text-gray-200">{book.genres}</p> */}

      {/* Avg Rating */}
      <RatingStars rating={averageRating} />

      {/* Available Copies */}
      <p className="text-sm text-gray-200 mt-1">
        Available Copies: <strong>{availableCopies}</strong>
      </p>

      <div className='flex justify-between items-center mt-2'>
        <div className='w-3/5'>{renderActionButton()}</div>
        <button onClick={() => setShowReviewModal(true)} className="text-xl cursor-pointer">⋮</button>
      </div>

      {/* Review Modal */}
      <Dialog.Root open={showReviewModal} onOpenChange={setShowReviewModal}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-70" />
          <Dialog.Content className="fixed p-6 bg-white rounded-md w-96 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Dialog.Title className="text-lg font-bold mb-2">Rate and Review</Dialog.Title>

            <div className="flex gap-1 my-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => !hasReviewed && setRating(star)}
                  className={`cursor-pointer text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-400'} ${hasReviewed ? 'cursor-not-allowed' : ''}`}
                >
                  ★
                </span>
              ))}
            </div>

            <textarea
              className="w-full p-2 border rounded"
              rows="3"
              placeholder="Write your review here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              disabled={hasReviewed}
            />

            {hasReviewed && (
              <p className="text-sm text-red-500 mt-1">You’ve already reviewed this book.</p>
            )}

            <div className="flex justify-end mt-4 gap-4">
              <button onClick={() => setShowReviewModal(false)} className="mr-2  cursor-pointer bg-red-500 text-white py-2 px-4 rounded">Cancel</button>
              <button
                onClick={submitReview}
                className={`bg-ActionMiniPurple cursor-pointer text-white px-4 py-2 rounded ${hasReviewed ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={hasReviewed}
              >
                Submit
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
    {/* <div className=""> */}
      {selectedBook && (
      <BookDetailsModal
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
      />
    )}
      {/* </div> */}
    </>
  );
};

export default BookCard;
