import models from '../models/index.js'; // Import models

// Get all performances
export const getAllPerformances = async (req, res) => {
    try {
        const performances = await models.Performance.findAll();
        res.json(performances);
    } catch (error) {
        console.error('Error fetching performances:', error);
        res.status(500).json({ message: 'Error fetching performances' });
    }
};

// Get a specific performance by ID
export const getPerformance = async (req, res) => {
    const { id } = req.query;
    try {
        const performance = await models.Performance.findByPk(id);
        if (!performance) {
            return res.status(404).json({ message: 'Performance not found' });
        }
        res.json(performance);
    } catch (error) {
        console.error('Error fetching performance:', error);
        res.status(500).json({ message: 'Error fetching performance' });
    }
};

// Get all ratings for a specific performance
export const getPerformanceRatings = async (req, res) => {
    const { id } = req.query;
    try {
        const ratings = await models.Rating.findAll({ where: { performance_form: id } });
        res.json(ratings);
    } catch (error) {
        console.error('Error fetching performance ratings:', error);
        res.status(500).json({ message: 'Error fetching ratings for this performance' });
    }
};

// Get the employee assigned to a performance
export const getPerformanceEmployee = async (req, res) => {
    const { id } = req.query;
    try {
        const performance = await models.Performance.findByPk(id, {
            include: {
                model: models.Employee,
                attributes: ['id', 'user_id', 'department'], // Adjust attributes as needed
            }
        });
        if (!performance) {
            return res.status(404).json({ message: 'Assigned employee not found' });
        }
        res.json(performance.employee);
    } catch (error) {
        console.error('Error fetching performance employee:', error);
        res.status(500).json({ message: 'Error fetching assigned employee for performance' });
    }
};

// Get the controller who created the performance
export const getPerformanceController = async (req, res) => {
    const { id } = req.query;
    try {
        const performance = await models.Performance.findByPk(id, {
            include: {
                model: models.Controller,
                attributes: ['id', 'user_id'], // Adjust attributes as needed
            }
        });
        if (!performance) {
            return res.status(404).json({ message: 'Creating controller not found' });
        }
        res.json(performance.controller);
    } catch (error) {
        console.error('Error fetching performance controller:', error);
        res.status(500).json({ message: 'Error fetching creating controller for performance' });
    }
};

// Create a new performance
export const createPerformance = async (req, res) => {
    const { title, description, path, created_by, assigned_to, due_date } = req.body;
    try {
        const performance = await models.Performance.create({
            title, description, path, created_by, assigned_to, due_date
        });
        res.status(201).json(performance);
    } catch (error) {
        console.error('Error creating performance:', error);
        res.status(500).json({ message: 'Error creating performance' });
    }
};

// Update a performance by ID
export const updatePerformance = async (req, res) => {
    const { id } = req.query;
    const { title, description, path, created_by, assigned_to, due_date } = req.body;
    try {
        const performance = await models.Performance.findByPk(id);
        if (!performance) {
            return res.status(404).json({ message: 'Performance not found' });
        }
        await performance.update({ title, description, path, created_by, assigned_to, due_date });
        res.json(performance);
    } catch (error) {
        console.error('Error updating performance:', error);
        res.status(500).json({ message: 'Error updating performance' });
    }
};

// Delete a performance by ID
export const deletePerformance = async (req, res) => {
    const { id } = req.query;
    try {
        const performance = await models.Performance.findByPk(id);
        if (!performance) {
            return res.status(404).json({ message: 'Performance not found' });
        }
        await performance.destroy();
        res.json({ message: 'Performance deleted successfully' });
    } catch (error) {
        console.error('Error deleting performance:', error);
        res.status(500).json({ message: 'Error deleting performance' });
    }
};
