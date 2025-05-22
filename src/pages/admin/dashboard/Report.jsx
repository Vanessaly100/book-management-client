import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectItem, SelectValue, SelectContent } from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const Report = () => {
  const [activities, setActivities] = useState([]);
  const [type, setType] = useState(""); // e.g. borrow, return, register
  const [startDate, setStartDate] = useState(undefined); // Date or undefined
  const [endDate, setEndDate] = useState(undefined);     // Date or undefined
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    fetchActivities();
  }, [type, startDate, endDate, page]);

  const fetchActivities = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/dashboard/all-recent-activity", {
        withCredentials: true,
        params: {
          type: type || undefined,
          page: page + 1,
          limit,
          startDate: startDate ? format(startDate, "yyyy-MM-dd") : undefined,
          endDate: endDate ? format(endDate, "yyyy-MM-dd") : undefined,
        },
      });
      console.log("recent activity", res.data);
      setActivities(res.data.data || []);
      setTotalPages(res.data.totalPages || 1);
      setPage(res.data.currentPage - 1);
    } catch (err) {
      console.error("Error fetching activities", err);
    }
  };

  const renderActivity = (activity) => {
    const date = format(new Date(activity.createdAt), "yyyy-MM-dd HH:mm");
    const type = activity.type?.toLowerCase();
    switch (type) {
      case "borrow":
        return `${activity.user} borrowed '${activity.book}' on ${date}`;
      case "return":
        return `${activity.user} returned '${activity.book}' on ${date}`;
      case "reserve":
        return `${activity.user} reserved '${activity.book_title}' on ${date}`;
      case "rating":
        return `${activity.user} rated '${activity.book}' ${activity.rating}★ on ${date}`;
      case "register":
        return `${activity.user} registered on ${date}`;
      case "register_admin":
        return `${activity.user} Registered as admin on ${date}`;
      default:
        return `Unknown activity on ${date}`;
    }
  };

  return (
    <div className="space-y-6 mt-6">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label className="mb-2 text-gray-700 dark:text-gray-300">Activity Type</Label>
          <Select onValueChange={(value) => { setType(value === "all" ? "" : value); setPage(0); }}>
            <SelectTrigger className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
              <SelectItem value="all" className="text-gray-900 dark:text-white hover:bg-ActionMiniPurple hover:text-white">All</SelectItem>
              <SelectItem value="borrow" className="text-gray-900 dark:text-white hover:bg-ActionMiniPurple hover:text-white">Borrow</SelectItem>
              <SelectItem value="return" className="text-gray-900 dark:text-white hover:bg-ActionMiniPurple hover:text-white">Return</SelectItem>
              <SelectItem value="reserve" className="text-gray-900 dark:text-white">Reserve</SelectItem>
              <SelectItem value="rating" className="text-gray-900 dark:text-white hover:bg-ActionMiniPurple hover:text-white">Rating</SelectItem>
              <SelectItem value="register" className="text-gray-900 dark:text-white hover:bg-ActionMiniPurple hover:text-white">User Registered</SelectItem>
              <SelectItem value="register_admin" className="text-gray-900 dark:text-white hover:bg-ActionMiniPurple hover:text-white">Admin Registered</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Start Date */}
        <div>
          <Label className="mb-2 text-gray-700 dark:text-gray-300">Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-700"
              >
                {startDate ? format(startDate, "PPP") : "Select start date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white dark:bg-gray-900 text-black dark:text-white">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={(date) => {
                  setStartDate(date);
                  setPage(0);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* End Date */}
        <div>
          <Label className="mb-2 text-gray-700 dark:text-gray-300">End Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-700"
              >
                {endDate ? format(endDate, "PPP") : "Select end date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white dark:bg-gray-900 text-black dark:text-white">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={(date) => {
                  setEndDate(date);
                  setPage(0);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="space-y-2 mt-4">
        {activities.length === 0 ? (
          <p className="text-sm text-muted-foreground dark:text-gray-400">No activities found.</p>
        ) : (
          activities.map((activity, idx) => (
            <div
              key={idx}
              className="border rounded p-2 shadow-sm text-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-700"
            >
              {renderActivity(activity)}
            </div>
          ))
        )}
      </div>

      <div className="flex items-center justify-between mt-6">
        <Button
          variant="outline"
          onClick={() => setPage((prev) => Math.max(0, prev - 1))}
          disabled={page === 0}
          className="dark:bg-gray-800 dark:text-white"
        >
          Previous
        </Button>

        <span className="text-sm text-muted-foreground dark:text-gray-400">
          Page {page + 1} of {totalPages}
        </span>

        <Button
          variant="outline"
          onClick={() => setPage((prev) => (prev + 1 < totalPages ? prev + 1 : prev))}
          disabled={page + 1 >= totalPages}
          className="dark:bg-gray-800 dark:text-white"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Report;
