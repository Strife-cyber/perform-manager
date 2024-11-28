import models from '../models/index.js'; // Import models

// Get all ratings
export const getAllRatings = async (req, res) => {
    try {
        const ratings = await models.Rating.findAll();
        res.json(ratings);
    } catch (error) {
        console.error('Error fetching ratings:', error);
        res.status(500).json({ message: 'Error fetching ratings' });
    }
};

// Get a specific rating by ID
export const getRating = async (req, res) => {
    const { id } = req.query;
    try {
        const rating = await models.Rating.findByPk(id);
        if (!rating) {
            return res.status(404).json({ message: 'Rating not found' });
        }
        res.json(rating);
    } catch (error) {
        console.error('Error fetching rating:', error);
        res.status(500).json({ message: 'Error fetching rating' });
    }
};

// Get the performance form associated with a rating
export const getRatingPerformance = async (req, res) => {
    const { id } = req.query;
    try {
        const rating = await models.Rating.findByPk(id, {
            include: {
                model: models.Performance,
                attributes: ['id', 'title', 'description'], // Adjust attributes as needed
            }
        });
        if (!rating) {
            return res.status(404).json({ message: 'Performance form not found for rating' });
        }
        res.json(rating.performance);
    } catch (error) {
        console.error('Error fetching performance form for rating:', error);
        res.status(500).json({ message: 'Error fetching performance form for rating' });
    }
};

// Get the employee who submitted a rating
export const getRatingEmployee = async (req, res) => {
    const { id } = req.query;
    try {
        const rating = await models.Rating.findByPk(id, {
            include: {
                model: models.Employee,
                attributes: ['id', 'user_id', 'department'], // Adjust attributes as needed
            }
        });
        if (!rating) {
            return res.status(404).json({ message: 'Employee not found for rating' });
        }
        res.json(rating.employee);
    } catch (error) {
        console.error('Error fetching employee for rating:', error);
        res.status(500).json({ message: 'Error fetching employee for rating' });
    }
};

// Create a new rating
export const createRating = async (req, res) => {
    const { performance_form, employee_id, rating, comments } = req.body;
    try {
        const newRating = await models.Rating.create({
            performance_form, employee_id, rating, comments
        });
        res.status(201).json(newRating);
    } catch (error) {
        console.error('Error creating rating:', error);
        res.status(500).json({ message: 'Error creating rating' });
    }
};

// Update a rating by ID
export const updateRating = async (req, res) => {
    const { id } = req.query;
    const { performance_form, employee_id, rating, comments } = req.body;
    try {
        const existingRating = await models.Rating.findByPk(id);
        if (!existingRating) {
            return res.status(404).json({ message: 'Rating not found' });
        }
        await existingRating.update({ performance_form, employee_id, rating, comments });
        res.json(existingRating);
    } catch (error) {
        console.error('Error updating rating:', error);
        res.status(500).json({ message: 'Error updating rating' });
    }
};

// Delete a rating by ID
export const deleteRating = async (req, res) => {
    const { id } = req.query;
    try {
        const rating = await models.Rating.findByPk(id);
        if (!rating) {
            return res.status(404).json({ message: 'Rating not found' });
        }
        await rating.destroy();
        res.json({ message: 'Rating deleted successfully' });
    } catch (error) {
        console.error('Error deleting rating:', error);
        res.status(500).json({ message: 'Error deleting rating' });
    }
};
