
// import { useState, useEffect, useRef } from "react";
// import { getAllBooks, reserveBook } from "@/api/book";
// import { borrowBook, getUserBorrowedBooks, returnBook } from "@/api/borrow";
// import { useAuth } from "@/contexts/AuthContext";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";

// function Books({ book }) {
//   console.log("Book component loaded", book);
//   const [books, setBooks] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [description, setDescription] = useState(null);
//   const descriptionRef = useRef();
//   const [borrowedBookIds, setBorrowedBookIds] = useState([]);

//   const { user } = useAuth();
//   const userId = user?.user_id;

//   // Fetch books
//   const [loading, setLoading] = useState(true);

//   // Handle click outside for description modal
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (descriptionRef.current && !descriptionRef.current.contains(event.target)) {
//         setDescription(null);
//       }
//     };

//     if (description !== null) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [description]);

//   // Fetch books data from API
//   useEffect(() => {
//     const fetchBooks = async () => {
//       setLoading(true);
//       try {
//         const res = await getAllBooks({ page: currentPage, limit: 12, filter: searchTerm.trim() });
//         console.log("📘 API response:", res);
//         setBooks(Array.isArray(res.data) ? res.data : []);
//         setTotalPages(res.pagination?.totalPages || 1);
//       } catch (error) {
//         console.error("⚠️ Fetch Books Error:", error.message);
//         setError("Failed to load books.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBooks();
//   }, [currentPage, searchTerm]);

//   // Reset page when search term changes
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm]);

//   // Load borrowed books from the database
//   const fetchBorrowedBooks = async () => {
//     if (!userId) return;
  
//     try {
//       const res = await getUserBorrowedBooks(userId);
//       const borrowed = res.data || [];
  
//       // Extract book IDs correctly
//       const ids = borrowed.map((b) => b.book_id);
//       setBorrowedBookIds(ids);
//     } catch (err) {
//       console.error("Failed to fetch borrowed books:", err);
//     }
//   };
//   useEffect(() => {
//     if (!userId) return;
  
//     const loadBorrowedBooks = async () => {
//       await fetchBorrowedBooks();
//     };
  
//     loadBorrowedBooks();
//   }, [userId]);
  
  
  

//   // Usage
//   const handleBorrow = async () => {
//     try {
//       const res = await borrowBook({ user_id: user.user_id, bookId: book.book_id });
//       console.log("Borrow book API response:", res);
//       alert(res.message || "Borrowed successfully");
//     } catch (err) {
//       alert(err.message || "Failed to borrow");
//     }
//   };
//   // Handle returning a book
//   const handleReturn = async (bookId) => {
//     try {
//       // Call API to return the book
//       const res = await returnBook(userId, bookId);
//       alert("✅ Book returned!");

//       // Remove the returned book ID from the state
//       setBorrowedBookIds((prev) => prev.filter(id => id !== bookId));
//       console.log("Return book API response:", res);

//       // Optionally, fetch the updated list of borrowed books from the database again
//       const updatedRes = await getUserBorrowedBooks(userId);
//       const updated = updatedRes.data || [];
//       const ids = updated.map((b) => b.book_id);
//       setBorrowedBookIds(ids);
//       fetchBorrowedBooks();
//       console.log("Updated borrowed books:", updated);

//     } catch (err) {
//       console.error("Failed to return book:", err);
//       alert("❌ Failed to return the book.");
//     }
//   };

//   const handleReserve = async (bookId) => {
//     if (!userId) {
//       alert("❌ You must be logged in to reserve a book.");
//       return;
//     }

//     try {
//       await reserveBook(bookId, userId);
//       alert("✅ Reservation request sent!");
//     } catch (error) {
//       alert("❌ Failed to reserve the book.");
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">📚 Books List</h2>

//       {/* 🔎 Search */}
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Search by title, genre, or author..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
//           className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-0"
//         />
//       </div>

//       {error && <p className="text-red-500">{error}</p>}

//       {/* 📖 Book Grid */}
//       {loading ? (
//         <p className="text-center text-gray-500">Loading books...</p>
//       ) : books.length > 0 ? (
//         <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {books.map((book) => (
//             <li key={book.book_id} book={book} className="p-4 relative rounded-lg shadow-lg bg-white">
//               {/* Book Description */}
//               <div
//                 className={`absolute h-full w-full ${description === book.book_id ? 'top-0 block' : '-top-full hidden'} left-0 bg-black/80 backdrop-blur-xs rounded-lg`}
//                 ref={descriptionRef}
//               >
//                 <div className="relative h-full w-full rounded-lg text-white">
//                   <span
//                     className="absolute right-2 top-0 cursor-pointer text-xl text-white font-bold rounded-full"
//                     onClick={() => setDescription(null)}
//                   >
//                     x
//                   </span>
//                   <span className="font-medium text-center m-auto pl-3 w-full">Description</span>
//                   <hr />
//                   <div className="flex flex-col items-center justify-center p-2">
//                     <h3 className="text-md font-semibold">{book.title}</h3>
//                     <p className="text-center text-sm p-2">{book.description}</p>
//                     <span className="text-sm font-medium">Authored by: {book.author}</span>
//                     <span className="text-sm font-medium">Genre: {book.genres}</span>
//                   </div>
//                 </div>
//               </div>
//               {book.CoverImage && (
//                 <img
//                   src={book.CoverImage}
//                   alt={book.title}
//                   className="w-full h-48 object-cover rounded-lg mb-2"
//                 />
//               )}
//               <p className="text-gray-600">{book.author}</p>
//               <h3 className="text-lg font-semibold truncate w-full">{book.title}</h3>
//               <p className="text-gray-500">Published: {book.publishedYear}</p>
//               <div className="flex text-yellow-400 mt-2">
//                 {"★★★★★".split("").map((star, index) => (
//                   <span key={index}>{star}</span>
//                 ))}
//               </div>
//               <div className="mt-3 flex items-center justify-between">
//                 {borrowedBookIds.includes(book.id) ? (
//                   <button
//                     onClick={() => handleReturn(book.id)}
//                     className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
//                   >
//                     Return
//                   </button>
//                 ) : (
//                   <button
//                     onClick={() => handleBorrow(book.id)}
//                     className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition duration-300"
//                   >
//                     Borrow
//                   </button>
//                 )}

//                 <button
//                   onClick={() => handleReserve(book.id)}
//                   className="bg-orange-500 text-white px-3 py-1 rounded"
//                 >
//                   🏷️ Reserve
//                 </button>
//               </div>
//               <div
//                 onClick={() => setDescription(book.id)}
//                 className="bg-gray-200 text-gray-700 mt-2 cursor-pointer py-1 rounded text-center font-medium"
//               >
//                 View details
//               </div>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p className="text-center text-gray-500">No books found.</p>
//       )}

//       {/* 📄 Pagination */}
//       <div className="mt-10">
//         <Pagination>
//           <PaginationContent>
//             <PaginationItem>
//               <PaginationPrevious
//                 href="#"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   currentPage > 1 && setCurrentPage(currentPage - 1);
//                 }}
//               />
//             </PaginationItem>

//             {[...Array(totalPages).keys()].map((_, idx) => (
//               <PaginationItem key={idx}>
//                 <PaginationLink
//                   href="#"
//                   isActive={currentPage === idx + 1}
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setCurrentPage(idx + 1);
//                   }}
//                 >
//                   {idx + 1}
//                 </PaginationLink>
//               </PaginationItem>
//             ))}

//             <PaginationItem>
//               <PaginationNext
//                 href="#"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   currentPage < totalPages && setCurrentPage(currentPage + 1);
//                 }}
//               />
//             </PaginationItem>
//           </PaginationContent>
//         </Pagination>
//       </div>
//     </div>
//   );
// }

// export default Books;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import BookCard from './BookCard';
import {getAllBooks} from "@/api/book";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Books = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [books, setBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const booksRes = await getAllBooks({
          page: currentPage,
          limit: 12,
          filter: searchTerm.trim(),
        });
  
        setBooks(Array.isArray(booksRes.data) ? booksRes.data : []);
        setTotalPages(booksRes.pagination?.totalPages || 1);
  
        const borrowedRes = await axios.get('http://localhost:4000/api/user/borrowed-books', {
          withCredentials: true
        });
        setBorrowedBooks(borrowedRes.data);
      } catch (err) {
        console.error('Fetch failed:', err);
        setError("Failed to fetch books.");
      }
    };
  
    fetchData();
  }, [searchTerm, currentPage]);
  
  const refreshBorrowedBooks = () => {
    axios
      .get('http://localhost:4000/api/user/borrowed-books', {
        withCredentials: true
      })
      .then(res => setBorrowedBooks(res.data))
      .catch(err => console.error("Refresh failed:", err));
  };


  return (
    <div className="p-6 px-10">

      {/* 🔎 Search */}
      <div className="my-6">
        <input
          type="text"
          placeholder="Search by title, category, or author..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to page 1 on new search
          }}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-0"
        />
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* 📚 Book List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {books.length > 0 ? (
          books.map((book) => {
            const isBorrowed = borrowedBooks.some(
              (b) => b.book_id === book.id && !b.returned
            );

            return (
              <BookCard
                key={book.id}
                book={book}
                isBorrowed={isBorrowed}
                availableCopies={book.availableCopies}
                onActionComplete={refreshBorrowedBooks}
              />
            );
          })
        ) : (
          <p>No books found.</p>
        )}
      </div>

      {/* 📄 Pagination */}
      <div className="mt-10 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  currentPage > 1 && setCurrentPage(currentPage - 1);
                }}
              />
            </PaginationItem>

            {[...Array(totalPages).keys()].map((_, idx) => (
              <PaginationItem key={idx}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === idx + 1}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(idx + 1);
                  }}
                >
                  {idx + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  currentPage < totalPages && setCurrentPage(currentPage + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Books;

