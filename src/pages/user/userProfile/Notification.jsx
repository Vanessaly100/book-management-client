import React, { useEffect, useState } from "react";
import { getUserNotifications, deleteNotification } from "../../../api/notification";
import { useAuth } from "../../../contexts/AuthContext";
import { Trash2 } from "lucide-react";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";

const Notification = () => {
  const { user } = useAuth(); 
  const userId = user?.user_id;

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    async function fetchNotifications() {
      try {
        setLoading(true);
        const data = await getUserNotifications(userId);
        if (Array.isArray(data)) {
          setNotifications(data);
        } else if (data?.notifications) {
          setNotifications(data.notifications);
        } else {
          setNotifications([]);
        }
        setError(null);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err?.message || "Failed to load notifications");
      } finally {
        setLoading(false);
      }
    }

    if (userId) fetchNotifications();
  }, [userId]);

 

  if (loading) return <p>Loading notifications...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-4">
      <main className="min-h-[30vh] bg-white rounded-md shadow-md p-6 overflow-y-auto">
        <h2 className="font-semibold text-2xl text-gray-800 mb-4">Notifications</h2>
        <hr className="border-t border-gray-200 mb-6" />
        {notifications.length === 0 ? (
          <p>No notifications to display</p>
        ) : (
          <div className="flex flex-col gap-4">
            {notifications.map(({ notification_id, message, createdAt, is_read, type }) => (
  <div
    key={notification_id}
    className={`relative border rounded-md p-4 pr-12 transition-shadow hover:shadow-md ${
      is_read === "Read" ? "border-gray-300 bg-white" : "border-blue-500 bg-blue-50"
    }`}
  >
    {/* Trash Icon wrapped with ConfirmDeleteModal */}
    <ConfirmDeleteModal
      trigger={
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
          title="Delete notification"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      }
      title="Delete Notification"
      message="Are you sure you want to delete this notification?"
      onConfirm={async () => {
        try {
          await deleteNotification(notification_id);
          setNotifications((prev) =>
            prev.filter((n) => n.notification_id !== notification_id)
          );
        } catch (err) {
          console.error("Delete failed:", err);
          alert("Failed to delete notification.");
        }
      }}
    />

    <h3 className="font-semibold text-lg text-gray-800">Notification</h3>
    <p className="text-sm text-gray-600 mt-1 font-bold">{type || "No type"}</p>
    <p className="text-sm text-gray-600 mt-1">{message || "No message"}</p>
    {createdAt && (
      <p className="text-xs text-gray-400 mt-2">
        {new Date(createdAt).toLocaleString()}
      </p>
    )}
  </div>
))}

          </div>
        )}
      </main>
     
    </div>
  );
};

export default Notification;
