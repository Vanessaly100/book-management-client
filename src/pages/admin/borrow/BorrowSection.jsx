import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { getData } from "../../../api/borrow";

const BorrowSection = ({ title, endpoint }) => {
  const [filters, setFilters] = useState({});
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const perPage = 5;

  const fetchData = async () => {
    setLoading(true);
    const result = await getData(endpoint, { ...filters, limit: perPage, offset: (page - 1) * perPage });
    setData(result.rows);
    setCount(result.count);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [filters, page]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border mb-6">
      <h2 className="text-xl font-bold mb-4">{title}</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div>
          <label>Search Book</label>
          <Input
            value={filters.search || ""}
            onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
          />
        </div>
        <div>
          <label>Start Date</label>
          <Input
            type="date"
            value={filters.startDate || ""}
            onChange={(e) => setFilters((prev) => ({ ...prev, startDate: e.target.value }))}
          />
        </div>
        <div>
          <label>End Date</label>
          <Input
            type="date"
            value={filters.endDate || ""}
            onChange={(e) => setFilters((prev) => ({ ...prev, endDate: e.target.value }))}
          />
        </div>
        <div className="flex items-end">
          <Button onClick={() => fetchData()}>Apply</Button>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p className="text-sm mb-2">Showing {data.length} of {count} records</p>
          <div className="overflow-x-auto">
            <table className="w-full border text-sm">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-2">Title</th>
                  <th className="p-2">Borrow Date</th>
                  <th className="p-2">Due Date</th>
                  <th className="p-2">Return Date</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.borrow_id} className="border-t">
                    <td className="p-2">{item.book?.title}</td>
                    <td className="p-2">{format(new Date(item.borrow_date), "PPP")}</td>
                    <td className="p-2">{format(new Date(item.due_date), "PPP")}</td>
                    <td className="p-2">{item.return_date ? format(new Date(item.return_date), "PPP") : "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <Button variant="outline" disabled={page === 1} onClick={() => setPage(page - 1)}>
              Previous
            </Button>
            <span>Page {page} of {Math.ceil(count / perPage)}</span>
            <Button variant="outline" disabled={page >= Math.ceil(count / perPage)} onClick={() => setPage(page + 1)}>
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default BorrowSection;
