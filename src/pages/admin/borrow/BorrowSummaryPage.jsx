import { useState } from "react";
import BorrowSection from "./BorrowSection";



const BorrowSummaryPage = () => {
  const [activeFilters, setActiveFilters] = useState({});
  const [overdueFilters, setOverdueFilters] = useState({});
  const [returnsFilters, setReturnsFilters] = useState({});

  const [activeData, setActiveData] = useState([]);
  const [overdueData, setOverdueData] = useState([]);
  const [returnsData, setReturnsData] = useState([]);

  return (
    <div className="p-6 space-y-6 h-screen">
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