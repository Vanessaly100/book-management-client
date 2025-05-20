import { useState, useEffect } from "react";
import BorrowSection from "./BorrowSection";
import api from "../api"; 



const BorrowSummaryPage = () => {
  const [activeFilters, setActiveFilters] = useState({});
  const [overdueFilters, setOverdueFilters] = useState({});
  const [returnsFilters, setReturnsFilters] = useState({});
  const [lowStockBooks, setLowStockBooks] = useState([]);

  const [activeData, setActiveData] = useState([]);
  const [overdueData, setOverdueData] = useState([]);
  const [returnsData, setReturnsData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLowStockBooks = async () => {
      setLoading(true);
      try {
        const [lowStockBooksRes] = await Promise.all([
          api.get("/low-stock-books"),
        ]);
        setLowStockBooks(lowStockBooksRes.data.data);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLowStockBooks();
  }, []);

  return (
    <div className="p-6 space-y-6 h-screen">
      <section className="border border-gray-500">
        <h2 className="text-xl font-semibold mb-4 text-black dark:text-white py-4 pl-3">Books Running Low</h2>
        <ul className="divide-y divide-gray-200 bg-white text-black dark:bg-darkMainCardBg dark:text-white border border-gray-500 rounded-lg shadow">
          {lowStockBooks.length === 0 && <li className="p-4">No low stock books</li>}
          {lowStockBooks.map((book) => (
            <li key={book.book_id} className="p-4 flex justify-between">
              <span>{book.title}</span>
              <span className="font-semibold text-red-600">{book.available_copies}</span>
            </li>
          ))}
        </ul>
      </section>
      <BorrowSection
        title="Active Borrows"
        endpoint="/borrowing/borrows/active"
        filters={activeFilters}
        setFilters={setActiveFilters}
        data={activeData}
        setData={setActiveData}
      />

      <BorrowSection
        title="Overdue Borrows"
        endpoint="/borrowing/borrows/overdue"
        filters={overdueFilters}
        setFilters={setOverdueFilters}
        data={overdueData}
        setData={setOverdueData}
      />

      <BorrowSection
        title="Return History"
        endpoint="/borrowing/returns"
        filters={returnsFilters}
        setFilters={setReturnsFilters}
        data={returnsData}
        setData={setReturnsData}
      />
    </div>
  );
}

export default BorrowSummaryPage