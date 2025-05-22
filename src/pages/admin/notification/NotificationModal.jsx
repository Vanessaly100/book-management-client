import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  getUserNotifications,
  markAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} from "../../../api/notification";

export default function NotificationModal({ userId, onClose }) {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const fetchNotifications = async () => {
    try {
      const data = await getUserNotifications(userId);
      console.log("Fetched notifications:", data);
      setNotifications(data);
    } catch (err) {
      console.error("Failed to load notifications:", err);
    }
  };

  useEffect(() => {
    if (userId) fetchNotifications();
  }, [userId]);

  const handleMarkAsRead = async (id) => {
    try {
      await markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) =>
          n.notification_id === id ? { ...n, is_read: true } : n
        )
      );
    } catch (err) {
      console.error("Failed to mark as read:", err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead();
      await fetchNotifications();
    } catch (error) {
      console.error("Failed to mark all as read:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this notification?"
    );
    if (!confirm) return;

    try {
      await deleteNotification(id);
      setNotifications((prev) =>
        prev.filter((n) => n.notification_id !== id)
      );
    } catch (err) {
      console.error("Failed to delete notification:", err);
    }
  };

  return (
    <div className="absolute right-4 top-14 z-50 w-80 max-h-96 overflow-y-auto rounded-md border bg-white p-4 shadow-lg dark:bg-gray-800">
      <div className="flex gap-2 items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Notifications</h2>
        <Button
          type="button"
          onClick={handleMarkAllAsRead}
          className="bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400 cursor-pointer"
        >
          Mark all as read
        </Button>
      </div>

     {notifications.length === 0 ? (
  <p className="text-sm text-gray-600 dark:text-gray-300">
    No notifications
  </p>
) : (
  <ul className="space-y-2">
    {notifications.map((n) => (
      <li
        key={n.notification_id}
        className={`relative flex items-start gap-2 p-2 rounded cursor-pointer ${
          n.is_read ? "bg-gray-100" : "bg-teal-100"
        }`}
        onClick={() => {
          handleMarkAsRead(n.notification_id);
          setSelectedNotification(n);
        }}
      >
        <img
          src={n.user?.profile_picture_url || "/default-avatar.png"}
          alt="User"
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="flex-1">
          <p className={`font-medium text-sm text-gray-900 ${n.is_read === "Unread" ? "font-bold" : "font-normal"}`}>
            {n?.user?.first_name || "Unknown User"}
          </p>
          <p className={`text-sm text-gray-700 line-clamp-2 ${n.is_read === "Unread" ? "font-bold" : "font-normal"}`}>
            {n.message}
          </p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(n.notification_id);
          }}
          className="text-red-500 hover:text-gold cursor-pointer bg-darkOffWhite rounded-full p-2"
          title="Delete"
        >
          <Trash2 size={16} />
        </button>
      </li>
    ))}
  </ul>
)}

      {selectedNotification && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 p-6 rounded shadow-lg w-96">
            <div className="flex items-center mb-4">
              <img
                src={
                  selectedNotification.user?.profile_picture_url || "/default-avatar.png"
                }
                alt="User"
                className="w-10 h-10 rounded-full mr-2 object-cover"
              />
              <div>
                <p className="font-semibold text-gray-800 dark:text-white">
                  {selectedNotification.user?.email || "Unknown User"}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(selectedNotification.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            <p className="text-gray-800 dark:text-gray-200">
              {selectedNotification.message}
            </p>
            <div className="mt-4 text-right">
              <Button onClick={() => setSelectedNotification(null)}  className="bg-Gold hover:bg-amber-500 px-4 py-2 rounded cursor-pointer text-white">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      <button
        className="mt-3 w-full rounded bg-teal-600 px-4 py-2 text-white hover:bg-teal-700"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
}