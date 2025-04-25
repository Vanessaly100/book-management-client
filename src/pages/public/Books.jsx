import { useState, useEffect } from "react";
import axios from "axios";


function Books() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/books", { withCredentials: true });
        console.log("📚 Books:", res.data);
        setBooks(res.data);
        setFilteredBooks(res.data);
      } catch (error) {
        console.error("⚠️ Fetch Books Error:", error.response?.data || error.message);
        setError("Failed to load books. Please try again.");
      }
    };

    fetchBooks();
  }, []);




  useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/user/all", { withCredentials: true });
      setUserId(response.data.id);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  fetchUser();
}, []); 

  const handleBorrow = async (borrowId) => {
    try {
      await axios.post(`http://localhost:4000/api/borrowing/${borrowId}`, { userId },{ withCredentials: true });
      alert(" Borrow request sent!");
    } catch (error) {
      console.error(" Error borrowing book:", error);
      alert("Failed to borrow the book.");
    }
  };

  const handleReserve = async (bookId) => {
    try {
      await axios.post(`http://localhost:4000/api/books/${bookId}/reserve`, { userId });
      alert("✅ Reservation request sent!");
    } catch (error) {
      console.error("❌ Error reserving book:", error);
      alert("Failed to reserve the book.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">📚 Books List</h2>

      {/* 🔎 Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title, genre, or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {/* 📖 Book List */}
      <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <li key={book.book_id} className="p-4 border rounded-lg shadow-lg bg-white">
              {/* 📕 Book Cover */}
              {book.cover_url && (
                <img src={book.cover_url} alt={book.title} className="w-full h-48 object-cover rounded-lg mb-2" />
              )}

              <p className="text-gray-600"> {book.author?.name}</p>
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <p className="text-gray-500"> Published: {book.publication_year}</p>

              {/* ⭐ Star Ratings */}
              <div className="flex text-yellow-400 mt-2">{"★★★★★".split("").map((star, index) => <span key={index}>{star}</span>)}</div>

              {/* 📌 Borrow & Reserve Buttons */}
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => handleBorrow(book.book_id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  📖 Borrow
                </button>
                <button
                  onClick={() => handleReserve(book.book_id)}
                  className="bg-orange-500 text-white px-3 py-1 rounded"
                >
                  🏷️ Reserve
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">No books found.</p>
        )}
      </ul>
    </div>
  );
}

export default Books;
