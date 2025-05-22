import React, { useEffect, useState } from "react";
import axios from "axios";
// import { useAuth } from '../../contexts/AuthContext';
import BookCard from "./BookCard";
import BooksImage1 from "../../assets/books-Two.jpg";
import { getAllBooks } from "@/api/book";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Books = () => {
  // const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [books, setBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/categories/no-filter-all",
          {
            withCredentials: true,
          }
        );
        console.log("category", res);
        setCategories(res.data.categories); // adjust based on your response structure
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const booksRes = await getAllBooks({
          page: currentPage,
          limit: 12,
          filter: searchTerm.trim(),
          category: selectedCategory,
        });

        console.log("Books response:", booksRes);

        setBooks(Array.isArray(booksRes.data) ? booksRes.data : []);
        setTotalPages(booksRes.pagination?.totalPages || 1);

        const borrowedRes = await axios.get(
          "http://localhost:4000/api/user/borrowed-books",
          {
            withCredentials: true,
          }
        );
        setBorrowedBooks(borrowedRes.data);
      } catch (err) {
        console.error("Fetch failed:", err);
        setError("Failed to fetch books.");
      }
    };

    fetchData();
  }, [searchTerm, currentPage, selectedCategory]);

  const refreshBorrowedBooks = () => {
    axios
      .get("http://localhost:4000/api/user/borrowed-books", {
        withCredentials: true,
      })
      .then((res) => setBorrowedBooks(res.data))
      .catch((err) => console.error("Refresh failed:", err));
  };

  return (
    <div className="">
      <section>
        <div className="relative h-[400px] pt-[80px]">
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: `url(${BooksImage1})`,
            }}
          >
            <div className="absolute inset-0 bg-black opacity-75"></div>
          </div>

          {/* Content Inside Hero Section */}
          <div className="relative z-10 h-full flex items-center justify-center text-center px-6 text-white">
            <div>
              <h1
                data-aos="flip-right"
                data-aos-duration="300"
                className="text-4xl md:text-5xl mb-4"
              >
                Books
              </h1>
              <p
                data-aos="flip-right"
                data-aos-duration="500"
                className="text-lg md:text-xl mb-8 w-4/5 xl:w-1/2 mx-auto"
              >
                Explore thousands of books. Discover your next great read.
                Browse. Reserve. Read.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/*  Search */}
      <div className="p-6 px-10 bg-lightMainBg">
        <div className="flex items-center justify-between gap-24">
          <div className="my-8 w-[60%]">
            <input
              type="text"
              placeholder="Search by title, category, or author..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to page 1 on new search
              }}
              className="w-full p-2 border border-black rounded-md focus:ring-2 focus:ring-ActionPurple outline-0 placeholder:text-black text-black cursor-pointer"
            />
          </div>
          <div className="my-8 w-[60%]">
            {categories.length > 0 && (
              <div className="">
                <Select
                  onValueChange={(val) => {
                    setSelectedCategory(val === "all" ? "" : val);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filter by Category" className="cursor-pointer" />
                  </SelectTrigger>
                  <SelectContent className="bg-darkMainCardBg text-white cursor-pointer">
                    <SelectItem value="all">All Categories</SelectItem>{" "}
                    {/* <-- this resets filter */}
                    {categories
                      .filter((cat) => cat.name && cat.name.trim() !== "")
                      .map((cat) => (
                        <SelectItem key={cat.category_id} value={cat.name} className="hover:bg-ActionMiniPurple hover:text-white cursor-pointer">
                          {cat.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>

        {/* {error && <p className="text-red-500 mb-4">{error}</p>} */}

        {/* Book List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-12">
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

        {/*  Pagination */}
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
    </div>
  );
};

export default Books;
