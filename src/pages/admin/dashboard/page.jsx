
import { useEffect, useState } from "react";
import { Footer } from "../../../layouts/Footer";
import DashboardCharts from '../../admin/dashboard/DashboardCharts';

import {
  CreditCard,
  DollarSign,
  Package,
  Trash,
  TrendingUp,
  Users, 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import api from "../../../utils/axios";
import {  deleteBook } from "../../../api/book";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";

const DashboardPage = () => {
  const [mounted, setMounted] = useState(false);
  const [overview, setOverview] = useState(null);
  const [popularBooks, setPopularBooks] = useState([]);
  const [lowStockBooks, setLowStockBooks] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    data: {
      recentActivity: [],
    }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchDashboard = async () => {
    try {
      const [
        overviewRes,
        popularBooksRes,
        lowStockBooksRes,
        recentActivityRes,
      ] = await Promise.all([
        api.get("/dashboard/overview"),
        api.get("/dashboard/popular-books"),
        api.get("/dashboard/low-stock-books"),
        api.get("/dashboard/recent-activity"),
      ]);

      setOverview(overviewRes.data.data);
      setPopularBooks(popularBooksRes.data.data);
      console.log("Popular", popularBooksRes.data.data);
      setLowStockBooks(lowStockBooksRes.data.data);
      setRecentActivity(recentActivityRes.data.data.activities);
      console.log("Activity", recentActivityRes.data.data);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      setError("Dashboard failed to load")
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

useEffect(() => {
  const fetchStats = async () => {
      try {
  const response = await api.get('/dashboard/overview', { 
    withCredentials: true,
  });

  const data = response.data;

  setStats({
    data: {
      ...data.data,
      recentActivity: data.data?.recentActivity || [],
      mostBorrowedBooks: data.data?.mostBorrowedBooks || [],
      lowStockBooks: data.data?.lowStockBooks || [],
    }
  });

  setIsLoading(false);
} catch (error) {
  console.error("Failed to fetch stats:", error);
  setError("Failed to load stats");
}

      
      setStats({
        data: {
          ...data.data,
          recentActivity: data.data?.recentActivity || [],
          mostBorrowedBooks: data.data?.mostBorrowedBooks || [],
          lowStockBooks: data.data?.lowStockBooks || [],
        }
      });
      
      setIsLoading(false);
  };

  fetchStats();
}, []);

if (loading) return <div className="p-8">Loading dashboard...</div>;

if (isLoading) return (
  <div className="p-6">
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  </div>
);

if (error) return (
  <div className="p-6 text-red-500">
    Error loading dashboard data: {error}
    <button 
      onClick={() => window.location.reload()}
      className="ml-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
    >
      Retry
    </button>
  </div>
);

const handleDelete = async (book_id) => {
    await deleteBook(book_id);
    await fetchDashboard()
  };
if (!mounted) return null;

  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="title">Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div className="card">
          <div className="card-header">
            <div className="w-fit rounded-lg bg-ActionMiniPurple p-2 text-white transition-color">
              <Package size={26} />
            </div>
            <p className="card-title">Total Books</p>
          </div>
          <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
            <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">
              {overview?.totalBooks}
            </p>
            <span className="flex w-fit items-center gap-x-2 rounded-full border border-ActionMiniPurple px-2 py-1 font-medium text-ActionMiniPurple">
              <TrendingUp size={18} />
              25%
            </span>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <div className="rounded-lg bg-ActionMiniPurple p-2 text-white transition-color">
              <DollarSign size={26} />
            </div>
            <p className="card-title">Total Users</p>
          </div>
          <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
            <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">
              {overview?.totalUsers}
            </p>
            <span className="flex w-fit items-center gap-x-2 rounded-full border border-ActionMiniPurple px-2 py-1 font-medium text-ActionMiniPurple">
              <TrendingUp size={18} />
              12%
            </span>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <div className="rounded-lg bg-ActionMiniPurple p-2 text-white transition-color">
              <Users size={26} />
            </div>
            <p className="card-title">Total Reservations</p>
          </div>
          <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
            <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">
              {overview?.totalReservations}
            </p>
            <span className="flex w-fit items-center gap-x-2 rounded-full border border-ActionMiniPurple px-2 py-1 font-medium text-ActionMiniPurple">
              <TrendingUp size={18} />
              15%
            </span>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <div className="rounded-lg bg-ActionMiniPurple p-2 text-white transition-color">
              <CreditCard size={26} />
            </div>
            <p className="card-title">Total Borrowed</p>
          </div>
          <div className="card-body bg-slate-100 transition-colors dark:bg-slate-950">
            <p className="text-3xl font-bold text-slate-900 transition-colors dark:text-slate-50">
              {overview?.totalBorrows}
            </p>
            <span className="flex w-fit items-center gap-x-2 rounded-full border border-ActionMiniPurple px-2 py-1 font-medium text-ActionMiniPurple">
              <TrendingUp size={18} />
              19%
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="card col-span-1 md:col-span-2 lg:col-span-4">
          <div className="card-header">
            <p className="card-title">Overview</p>
          </div>
          <div className="card-body p-0">
          <DashboardCharts stats={stats.data} />
          </div>
        </div>
        <div className="card col-span-1 md:col-span-2 lg:col-span-3">
          <div className="card-header">
            <p className="card-title">Popular Books</p>
          </div>
          <div className="card-body h-[300px] overflow-auto p-0 grid grid-cols-2 items-center ">
            {popularBooks.length === 0 && (
              <li className="p-4">No data found</li>
            )}
            {popularBooks.map((book) => (
              <li
                key={book.book_id}
                className="p-4 text-black dark:text-white list-none"
              >
                <img
                  src={book.cover_url}
                  alt="book cover url"
                  className="size-30 flex-shrink-0 object-cover"
                />
                <span>{book.title}</span>
              </li>
            ))}
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          <p className="card-title">Recent Activity</p>
        </div>
        <div className="card-body p-0">
          <div className="relative h-[500px] w-full flex-shrink-0 overflow-auto rounded-none [scrollbar-width:_thin]">
            <table className="table">
              <thead className="table-header">
                <tr className="table-row">
                  <th className="table-head">#</th>
                  <th className="table-head">Books</th>
                  <th className="table-head">User Email</th>
                  <th className="table-head">Status</th>
                  <th className="table-head">Date</th>
                  <th className="table-head">Actions</th>
                </tr>
              </thead>
              <tbody className="table-body">
              {recentActivity.length === 0 && <li className="p-4">No recent activity</li>}
              {recentActivity.map((activity, index) => (
                  <tr key={activity.index} className="table-row">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {index + 1}
                </td>
                    <td className="table-cell">
                      <div className="flex w-max gap-x-4">
                        <img
                          src={activity.book.cover_url}
                          alt="cover url"
                          className="size-14 rounded-lg object-cover"
                        />
                        <div className="flex flex-col">
                          <p>{activity.book.title}</p>
                          <p className="font-normal text-slate-600 dark:text-slate-400">
                            {activity.book.author.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell">{activity.user.email}</td>
                    <td className="table-cell">{activity.status}</td>
                    <td className="table-cell">
                      <div className="flex items-center gap-x-2">
                        <p>{new Date(activity.createdAt).toLocaleDateString()}</p>
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center gap-x-4">
                        <ConfirmDeleteModal
              title="Delete Book"
              message="Are you sure you want to delete this book?"
              onConfirm={() => handleDelete(activity.book.book_id)}
              trigger={
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-500 cursor-pointer"
                >
                  <Trash size={16} />
                  Delete
                </Button>
              }
            />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;
