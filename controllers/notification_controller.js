import models from "../models/index.js"; // Import models

// Get all notifications for a specific user
export const getNotificationsByUser = async (req, res) => {
    const { user_id } = req.query;
    try {
        const notifications = await models.Notification.findAll({
            where: { user_id },
            include: {
                model: models.User, // Include associated User model
                attributes: ["id", "name", "email"], // Customize attributes
            },
        });
        res.json(notifications);
    } catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).json({ message: "Error fetching notifications" });
    }
};

// Get a specific notification by ID
export const getNotification = async (req, res) => {
    const { id } = req.query;
    try {
        const notification = await models.Notification.findByPk(id, {
            include: {
                model: models.User, // Include associated User model
                attributes: ["id", "name", "email"],
            },
        });
        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }
        res.json(notification);
    } catch (error) {
        console.error("Error fetching notification:", error);
        res.status(500).json({ message: "Error fetching notification" });
    }
};

// Create a new notification
export const createNotification = async (req, res) => {
    const { user_id, message, status } = req.body;
    try {
        const user = await models.User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const notification = await models.Notification.create({
            user_id,
            message,
            status: status || false, // Default status to false if not provided
        });
        res.status(201).json(notification);
    } catch (error) {
        console.error("Error creating notification:", error);
        res.status(500).json({ message: "Error creating notification" });
    }
};

// Update a notification by ID
export const updateNotification = async (req, res) => {
    const { id } = req.query;
    const { message, status } = req.body;
    try {
        const notification = await models.Notification.findByPk(id);
        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }
        await notification.update({ message, status });
        res.json(notification);
    } catch (error) {
        console.error("Error updating notification:", error);
        res.status(500).json({ message: "Error updating notification" });
    }
};

// Delete a notification by ID
export const deleteNotification = async (req, res) => {
    const { id } = req.query;
    try {
        const notification = await models.Notification.findByPk(id);
        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }
        await notification.destroy();
        res.json({ message: "Notification deleted successfully" });
    } catch (error) {
        console.error("Error deleting notification:", error);
        res.status(500).json({ message: "Error deleting notification" });
    }
};

// Mark a notification as read
export const markAsRead = async (req, res) => {
    const { id } = req.query;
    try {
        const notification = await models.Notification.findByPk(id);
        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }
        await notification.update({ status: true }); // Mark status as true (read)
        res.json({ message: "Notification marked as read", notification });
    } catch (error) {
        console.error("Error marking notification as read:", error);
        res.status(500).json({ message: "Error marking notification as read" });
    }
};

// Get unread notifications for a specific user
export const getUnreadNotifications = async (req, res) => {
    const { user_id } = req.query;
    try {
        const unreadNotifications = await models.Notification.findAll({
            where: { user_id, status: false }, // Fetch only unread notifications
            include: {
                model: models.User,
                attributes: ["id", "name", "email"],
            },
        });
        res.json(unreadNotifications);
    } catch (error) {
        console.error("Error fetching unread notifications:", error);
        res.status(500).json({ message: "Error fetching unread notifications" });
    }
};

// Get read notifications for a specific user
export const getReadNotifications = async (req, res) => {
    const { user_id } = req.query;
    try {
        const readNotifications = await models.Notification.findAll({
            where: { user_id, status: true },
            include: {
                model: models.User,
                attributes: ["id", "name", "email"]
            }
        });
        res.json(readNotifications);
    } catch (error) {
        console.error("Error fetching read notifications:", error);
        res.status(500).json({ message: "Error fetching read notifications" });
    }
}