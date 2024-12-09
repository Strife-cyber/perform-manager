import api from "../api";

interface Notification {
  id?: string;
  user_id?: string;
  message: string;
  status?: boolean; // false for unread, true for read
  createdAt?: Date;
  updatedAt?: Date;
}

const useNotification = () => {
  // Send a notification
  const sendNotification = async (notification: Notification) => {
    try {
      const response = await api.post('/notifications', notification);
      if (response.status === 201) {
        return response.data;
      } else {
        console.error("Failed to send notification: Unexpected response status");
        return null;
      }
    } catch (error) {
      console.error("An error occurred while sending notification:", error);
      return null;
    }
  };

  // Get all notifications for a user
  const getNotifications = async (userId: string) => {
    try {
      const response = await api.get('/notifications', {
        params: { user_id: userId },
      });
      if (response.status === 200) {
        return response.data;
      } else {
        console.error("Failed to fetch notifications: Unexpected response status");
        return [];
      }
    } catch (error) {
      console.error("An error occurred while fetching notifications:", error);
      return [];
    }
  };

  // Get unread or read notifications
  const getUnreadNotifications = async (userId: string) => {
    return await getNotificationsByStatus(userId, '/notifications/unread');
  };

  const getReadNotifications = async (userId: string) => {
    return await getNotificationsByStatus(userId, '/notifications/read');
  };

  const getNotificationsByStatus = async (userId: string, endpoint: string) => {
    try {
      const response = await api.get(endpoint, {
        params: { user_id: userId },
      });
      if (response.status === 200) {
        return response.data;
      } else {
        console.error("Failed to fetch notifications by status: Unexpected response status");
        return [];
      }
    } catch (error) {
      console.error(`An error occurred while fetching ${endpoint}:`, error);
      return [];
    }
  };

  // Mark a notification as read
  const markAsRead = async (notificationId: string) => {
    try {
      const response = await api.put(`/notifications/${notificationId}/mark-as-read`);
      if (response.status === 200) {
        return response.data;
      } else {
        console.error("Failed to mark notification as read: Unexpected response status");
        return null;
      }
    } catch (error) {
      console.error("An error occurred while marking notification as read:", error);
      return null;
    }
  };

  return {
    sendNotification,
    getNotifications,
    getUnreadNotifications,
    getReadNotifications,
    markAsRead,
  };
};

export default useNotification;
