import models from '../models/index.js'; // Import models

// Get all support entries
export const getAllSupports = async (req, res) => {
    try {
        const supports = await models.Support.findAll();
        res.json(supports);
    } catch (error) {
        console.error('Error fetching supports:', error);
        res.status(500).json({ message: 'Error fetching supports' });
    }
};

// Get a specific support by ID
export const getSupport = async (req, res) => {
    const { id } = req.query;
    try {
        const support = await models.Support.findByPk(id);
        if (!support) {
            return res.status(404).json({ message: 'Support entry not found' });
        }
        res.json(support);
    } catch (error) {
        console.error('Error fetching support entry:', error);
        res.status(500).json({ message: 'Error fetching support entry' });
    }
};

// Get the controller who uploaded a specific support entry
export const getSupportUploader = async (req, res) => {
    const { id } = req.query;
    try {
        const support = await models.Support.findByPk(id, {
            include: {
                model: models.Controller,
                attributes: ['id', 'user_id', 'department'], // Adjust attributes as needed
            }
        });
        if (!support) {
            return res.status(404).json({ message: 'Uploader not found for support entry' });
        }
        res.json(support.controller);
    } catch (error) {
        console.error('Error fetching uploader for support entry:', error);
        res.status(500).json({ message: 'Error fetching uploader for support entry' });
    }
};

// Create a new support entry
export const createSupport = async (req, res) => {
    const { title, description, path, uploaded_by } = req.body;
    try {
        const newSupport = await models.Support.create({
            title,
            description,
            path,
            uploaded_by,
        });
        res.status(201).json(newSupport);
    } catch (error) {
        console.error('Error creating support entry:', error);
        res.status(500).json({ message: 'Error creating support entry' });
    }
};

// Update a support entry by ID
export const updateSupport = async (req, res) => {
    const { id } = req.query;
    const { title, description, path, uploaded_by } = req.body;
    try {
        const support = await models.Support.findByPk(id);
        if (!support) {
            return res.status(404).json({ message: 'Support entry not found' });
        }
        await support.update({
            title,
            description,
            path,
            uploaded_by,
        });
        res.json(support);
    } catch (error) {
        console.error('Error updating support entry:', error);
        res.status(500).json({ message: 'Error updating support entry' });
    }
};

// Delete a support entry by ID
export const deleteSupport = async (req, res) => {
    const { id } = req.query;
    try {
        const support = await models.Support.findByPk(id);
        if (!support) {
            return res.status(404).json({ message: 'Support entry not found' });
        }
        await support.destroy();
        res.json({ message: 'Support entry deleted successfully' });
    } catch (error) {
        console.error('Error deleting support entry:', error);
        res.status(500).json({ message: 'Error deleting support entry' });
    }
};
