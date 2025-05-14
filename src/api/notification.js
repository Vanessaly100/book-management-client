import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

// Get all categories with pagination, sorting, filtering
export const getAllNotifications = async ({
  page = 1,
  limit = 10,
  sort = "createdAt",
  order = "asc",
  filter = "",
} = {}) => {
  const response = await API.get(`/notifications?page=${page}&limit=${limit}`, {
    params: { page, limit, sort, order, filter },
  });
  console.log("Fetched notificationssss:", response.data);
  return response.data;
};



// Fetch notifications for a specific user
export const getUserNotifications = async (userId) => {
  try {
    const response = await API.get(`/notifications/${userId}`);
    console.log("Fetched user notifications:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user notifications:", error);
    throw error;
  }
};

export const updateNotification = async (notificationId, updatedData) => {
  try {
    const response = await API.put(
      `/notifications/${notificationId}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating notification:", error);
    throw error;
  }
}

export const getUnreadNotificationCount = async (userId) => {
  const response = await API.get(`/notifications/unread/count/${userId}`);
  return response.data.unreadCount;
};
// Mark a notification as read
export const markAsRead = async (notification_id) => {
  try {
    const response = await API.patch(
      `/notifications/mark/${notification_id}`,
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw error;
  }
};


export const markAllNotificationsAsRead = async () => {
  const response = await API.patch("/notifications/mark-all");
  return response.data;
};

// Delete a notification
export const deleteNotification = async (notificationId) => {
  try {
    const response = await API.delete(`/notifications/${notificationId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting notification:", error);
    throw error;
  }
};

export const createNotification = async (
  firstName,
  email,
  bookTitle,
  message,
  notificationType
) => {
  try {
    const response = await API.post(
      `/notifications`,
      {
        first_name: firstName,
        email,
        book_title: bookTitle,
        message,
        type: notificationType,
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error creating notification:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Create an overdue notification
export const createOverdueNotification = async (
  userId,
  bookId,
  userName,
  bookTitle,
  userEmail
) => {
  try {
    const response = await API.post(
      `/notifications/create-overdue`,
      {
        user_id: userId,
        book_id: bookId,
        user_name: userName,
        book_title: bookTitle,
        user_email: userEmail,
      },

    );
    return response.data;
  } catch (error) {
    console.error("Error creating overdue notification:", error);
    throw error;
  }
};

// Create a borrow notification
export const createBorrowNotification = async (userId, bookId, dueDate) => {
  try {
    const response = await API.post(
      `/notifications/borrow`,
      { user_id: userId, book_id: bookId, due_date: dueDate },
    );
    return response.data;
  } catch (error) {
    console.error("Error creating borrow notification:", error);
    throw error;
  }
};

// Create a reservation notification
export const createReservationNotification = async (userId, bookId) => {
  try {
    const response = await API.post(
      `/notifications/create-reservation`,
      { user_id: userId, book_id: bookId },
    );
    return response.data;
  } catch (error) {
    console.error("Error creating reservation notification:", error);
    throw error;
  }
};

// Create an available notification
export const createAvailableNotification = async (userId, bookId) => {
  try {
    const response = await API.post(
      `/notifications/create-available`,
      { user_id: userId, book_id: bookId },
      
    );
    return response.data;
  } catch (error) {
    console.error("Error creating available notification:", error);
    throw error;
  }
};

// Send overdue reminder
export const sendOverdueReminder = async (borrowId) => {
  try {
    const response = await API.post(
      `/notifications/send-overdue-reminder/${borrowId}`,
      {},
    );
    return response.data;
  } catch (error) {
    console.error("Error sending overdue reminder:", error);
    throw error;
  }
};
