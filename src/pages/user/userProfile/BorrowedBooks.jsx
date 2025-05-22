import React, { useState, useEffect } from 'react';
import { returnBook, getUserBorrowedBooks } from '@/api/borrow';
import { useAuth } from '@/contexts/AuthContext';
import { History } from 'lucide-react';

const BorrowedBooks = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]); 
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const { user } = useAuth();
  const userId = user?.user_id;

  // Fetch borrowed books on component mount
  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      if (!userId) return; 
      try {
        const data = await getUserBorrowedBooks(userId);
        console.log("API response data:", data);
        
        setBorrowedBooks(data || []);  
      } catch (error) {
        console.error("Error fetching borrowed books:", error);
      }
    };
  
    fetchBorrowedBooks();
  }, [userId]);

  const handleReturn = async (bookId) => {
    try {
      const res = await returnBook(userId, bookId);
  
      if (res?.message === 'Books returned successfully.') {
        alert(" Book returned!");
        setBorrowedBooks((prev) => prev.filter((book) => book.book_id !== bookId));
        const updatedBooks = await getUserBorrowedBooks(userId);
        setBorrowedBooks(updatedBooks || []);
      } else {
        throw new Error("Failed to return the book.");
      }
    } catch (err) {
      console.error("Failed to return book:", err);
      alert(" Failed to return the book.");
    }
  };
  
  
  

  return (
    <div>
      <div className='flex items-center justify-between'>
      <h2 className="font-semibold text-2xl text-gray-800 mb-4">Borrowed Books</h2>
      <div>
      <button
  onClick={() => setShowHistoryModal(true)}
  className="hover:text-ActionMiniPurple transition duration-300"
  aria-label="View Borrow History"
>
  <History size={32} />
</button>
{showHistoryModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white w-full max-w-2xl rounded-md p-6 relative shadow-lg">
      <button
        onClick={() => setShowHistoryModal(false)}
        className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
      >
        ✕
      </button>
      <h3 className="text-xl font-semibold mb-4">Borrowed History</h3>
      <div className="max-h-[400px] overflow-y-auto space-y-4">
        {borrowedBooks.length === 0 ? (
          <p className="text-gray-500">No borrowed books history found.</p>
        ) : (
          borrowedBooks.map((book, index) => (
            <div
              key={index}
              className="border p-3 rounded-md flex items-center justify-between gap-4"
            >
              <div>
                <p className="font-medium">{book.book.title}</p>
                <p className="text-sm text-gray-500">
                  Borrowed: {new Date(book.borrowed_date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">
                  Due: {new Date(book.due_date).toLocaleDateString()}
                </p>
              </div>
              <img
                src={book.book.cover_url}
                alt={book.book.title}
                className="w-12 h- object-cover rounded"
              />
            </div>
          ))
        )}
      </div>
    </div>
  </div>
)}

      </div>
      </div>
      <hr className="border-t border-gray-200 mb-6" />
      
      {/* Borrowed Books List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {borrowedBooks.length > 0 ? (
          borrowedBooks.map(book => (
            <div key={book.borrow_id} className="bg-gray-300 rounded-md p-4 transition-shadow hover:shadow-md">
              <div>
                <h3 className="font-semibold text-lg text-gray-800 truncate">{book.book.title}</h3>
                <div>
                  <img
                    src={book.book.cover_url}
                    alt={book.book.title}
                    className="w-full h-48 object-cover rounded-md"
                  />
                </div>
                <p className="text-sm text-gray-600">
                  Due: {new Date(book.due_date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex justify-center items-center">
                <button
                  onClick={() => handleReturn(book.book_id)} // Return the book
                  className="bg-green-700 text-white font-semibold py-2 px-8 rounded-md hover:bg-green-800 transition duration-300"
                >
                  Return
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No borrowed books found.</p>
        )}
      </div>
    </div>
  );
};

export default BorrowedBooks;