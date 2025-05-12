import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { getAllBooks, reserveBook  } from "@/api/book";
import { useAuth } from "@/contexts/AuthContext";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function Books() {

  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  // const [userId, setUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [description, setDescription] = useState(null);
  // useRef to manage the description state

  const descriptionRef = useRef();

useEffect(() => {
  const handleClickOutside = (event) => {
    if (descriptionRef.current && !descriptionRef.current.contains(event.target)) {
      setDescription(null);
    }
  };

  if (description !== null) {
    document.addEventListener("mousedown", handleClickOutside);
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [description]);


  // Fetch books
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const userId = user?.user_id; 

useEffect(() => {
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await getAllBooks({ page: currentPage, limit: 12, filter: searchTerm.trim() });
      console.log("📘 API response:", res); 
      setBooks(Array.isArray(res.data) ? res.data : []);
      setTotalPages(res.pagination?.totalPages || 1);
    } catch (error) {
      console.error("⚠️ Fetch Books Error:", error.message);
      setError("Failed to load books.");
    } finally {
      setLoading(false);
    }
  };

  fetchBooks();
}, [currentPage, searchTerm]);

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  console.log("👤 user from context:", user);
  console.log("👤 userId from context:", userId);


  const handleBorrow = async (borrowId) => {
    try {
      await axios.post(
        `http://localhost:4000/api/borrowing/${borrowId}`,
        { userId },
        { withCredentials: true }
      );
      alert("📖 Borrow request sent!");
    } catch (error) {
      console.error("Error borrowing book:", error);
      alert("Failed to borrow the book.");
    }
  };

  const handleReserve = async (bookId) => {
    console.log ("userId", userId)
    console.log ("bookId", bookId)
    if (!userId) {
      alert("❌ You must be logged in to reserve a book.");
      return;
    }
  
    try {
      console.log("📘 Reserving book with ID:", bookId);
      await reserveBook(bookId, userId);  // Pass the userId here
      alert("✅ Reservation request sent!");
    } catch (error) {
      alert("❌ Failed to reserve the book.");
    }
  };
  

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">📚 Books List</h2>

      {/* 🔎 Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title, genre, or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-0"
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {/* 📖 Book Grid */}
      {loading ? (
  <p className="text-center text-gray-500">Loading books...</p>
) : books.length > 0 ? (
  <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {books.map((book) => (
      <li key={book.id} className="p-4 relative rounded-lg shadow-lg bg-white">
        {/* books description */}
        <div className={`absolute h-full w-full ${description == book.id ? 'top-0 block' : '-top-full hidden'} left-0 bg-black/80 backdrop-blur-xs rounded-lg`}   ref={descriptionRef}>
        <div className="relative h-full w-full  rounded-lg text-white">
        <span className="absolute right-2 top-0 cursor-pointer text-xl text-white font-bold rounded-full "
        onClick={() => setDescription(null)}
        >x</span>
            <span className="font-medium text-center m-auto pl-3 w-full">Description</span>
            <hr />
            <div className="flex flex-col items-center justify-center p-2">
                <h3 className="text-md font-semibold">{book.title}</h3>
              <p className="text-center text-sm p-2">{book.description}</p>
                <span className="text-sm font-medium">Authored by: {book.author}</span>
                <span className="text-sm font-medium">Genre: {book.genres}</span>
            </div>
        </div>
        </div>
        {book.CoverImage && (
          <img
            src={book.CoverImage}
            alt={book.title}
            className="w-full h-48 object-cover rounded-lg mb-2"
          />
        )}
        <p className="text-gray-600">{book.author}</p>
        <h3 className="text-lg font-semibold truncate w-full">{book.title}</h3>
        <p className="text-gray-500">Published: {book.publishedYear}</p>
        <div className="flex text-yellow-400 mt-2">
          {"★★★★★".split("").map((star, index) => (
            <span key={index}>{star}</span>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between">
          <button
            onClick={() => handleBorrow(book.id)}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            📖 Borrow
          </button>
          <button
            onClick={() => handleReserve(book.id)}
            className="bg-orange-500 text-white px-3 py-1 rounded"
          >
            🏷️ Reserve
          </button>
        </div>
        <div
            onClick={() => setDescription(book.id)}
            className="bg-gray-200 text-gray-700 mt-2 cursor-pointer py-1 rounded text-center font-medium"
          >View details</div>
      </li>
    ))}
  </ul>
) : (
  <p className="text-center text-gray-500">No books found.</p>
)}


      {/* 📄 Pagination */}
      <div className="mt-10"> 
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
}

export default Books;



