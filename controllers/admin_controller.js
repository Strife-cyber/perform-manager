import models from "../models/index.js"; // Import models

// Get all admins
export const getAllAdmins = async (req, res) => {
    try {
        const admins = await models.Admin.findAll({
            include: {
                model: models.User, // Include associated User model
                attributes: ["id", "name", "email"], // Customize attributes to include
            },
        });
        res.json(admins);
    } catch (error) {
        console.error("Error fetching admins:", error);
        res.status(500).json({ message: "Error fetching admins" });
    }
};

// Get a specific admin by ID
export const getAdmin = async (req, res) => {
    const { id } = req.query;
    try {
        const admin = await models.Admin.findByPk(id, {
            include: {
                model: models.User, // Include associated User model
                attributes: ["id", "name", "email"],
            },
        });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.json(admin);
    } catch (error) {
        console.error("Error fetching admin:", error);
        res.status(500).json({ message: "Error fetching admin" });
    }
};

// Create a new admin
export const createAdmin = async (req, res) => {
    const { user_id, privileges } = req.body;
    try {
        const user = await models.User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const admin = await models.Admin.create({
            user_id,
            privileges,
        });
        res.status(201).json(admin);
    } catch (error) {
        console.error("Error creating admin:", error);
        res.status(500).json({ message: "Error creating admin" });
    }
};

// Update an admin by ID
export const updateAdmin = async (req, res) => {
    const { id } = req.query;
    const { privileges } = req.body;
    try {
        const admin = await models.Admin.findByPk(id);
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        await admin.update({ privileges });
        res.json(admin);
    } catch (error) {
        console.error("Error updating admin:", error);
        res.status(500).json({ message: "Error updating admin" });
    }
};

// Delete an admin by ID
export const deleteAdmin = async (req, res) => {
    const { id } = req.query;
    try {
        const admin = await models.Admin.findByPk(id);
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        await admin.destroy();
        res.json({ message: "Admin deleted successfully" });
    } catch (error) {
        console.error("Error deleting admin:", error);
        res.status(500).json({ message: "Error deleting admin" });
    }
};

// Get the user associated with an admin
export const getAdminUser = async (req, res) => {
    const { id } = req.query;
    try {
        const admin = await models.Admin.findByPk(id, {
            include: {
                model: models.User,
                attributes: ["id", "name", "email"], // Customize as needed
            },
        });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.json(admin.user);
    } catch (error) {
        console.error("Error fetching associated user:", error);
        res.status(500).json({ message: "Error fetching associated user" });
    }
};
