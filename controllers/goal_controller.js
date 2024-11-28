import models from '../models/index.js'; // Import models

// Get all goals
export const getAllGoals = async (req, res) => {
    try {
        const goals = await models.Goal.findAll();
        res.json(goals);
    } catch (error) {
        console.error('Error fetching goals:', error);
        res.status(500).json({ message: 'Error fetching goals' });
    }
};

// Get a specific goal by ID
export const getGoal = async (req, res) => {
    const { id } = req.query;
    try {
        const goal = await models.Goal.findByPk(id);
        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }
        res.json(goal);
    } catch (error) {
        console.error('Error fetching goal:', error);
        res.status(500).json({ message: 'Error fetching goal' });
    }
};

// Get all goals for a specific employee
export const getGoalsByEmployee = async (req, res) => {
    const { employeeId } = req.query;
    try {
        const goals = await models.Goal.findAll({ where: { employee_id: employeeId } });
        res.json(goals);
    } catch (error) {
        console.error('Error fetching goals for the employee:', error);
        res.status(500).json({ message: 'Error fetching goals for this employee' });
    }
};

// Get all goals created by a specific controller
export const getGoalsByController = async (req, res) => {
    const { controllerId } = req.query;
    try {
        const goals = await models.Goal.findAll({ where: { created_by: controllerId } });
        res.json(goals);
    } catch (error) {
        console.error('Error fetching goals for the controller:', error);
        res.status(500).json({ message: 'Error fetching goals for this controller' });
    }
};

// Get the action related to a specific goal
export const getGoalAction = async (req, res) => {
    const { id } = req.query;
    try {
        const goal = await models.Goal.findByPk(id, {
            include: {
                model: models.Action,
                attributes: ['id', 'description', 'status', 'employee_id'], // Adjust as needed
            },
        });
        if (!goal) {
            return res.status(404).json({ message: 'Action not found for this goal' });
        }
        res.json(goal.action);
    } catch (error) {
        console.error('Error fetching action for the goal:', error);
        res.status(500).json({ message: 'Error fetching action for this goal' });
    }
};

// Create a new goal
export const createGoal = async (req, res) => {
    const { employee_id, title, description, path, created_by } = req.body;
    try {
        const goal = await models.Goal.create({
            employee_id,
            title,
            description,
            path,
            created_by,
        });
        res.status(201).json(goal);
    } catch (error) {
        console.error('Error creating goal:', error);
        res.status(500).json({ message: 'Error creating goal' });
    }
};

// Update a goal by ID
export const updateGoal = async (req, res) => {
    const { id } = req.query;
    const { employee_id, title, description, path, created_by } = req.body;
    try {
        const goal = await models.Goal.findByPk(id);
        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }
        await goal.update({ employee_id, title, description, path, created_by });
        res.json(goal);
    } catch (error) {
        console.error('Error updating goal:', error);
        res.status(500).json({ message: 'Error updating goal' });
    }
};

// Delete a goal by ID
export const deleteGoal = async (req, res) => {
    const { id } = req.query;
    try {
        const goal = await models.Goal.findByPk(id);
        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }
        await goal.destroy();
        res.json({ message: 'Goal deleted successfully' });
    } catch (error) {
        console.error('Error deleting goal:', error);
        res.status(500).json({ message: 'Error deleting goal' });
    }
};

// Get the employee assigned to a goal
export const getGoalEmployee = async (req, res) => {
    const { id } = req.query;
    try {
        const goal = await models.Goal.findByPk(id, {
            include: {
                model: models.Employee,
                attributes: ['id', 'user_id', 'department'], // Adjust attributes as needed
            },
        });
        if (!goal) {
            return res.status(404).json({ message: 'Employee not found for this goal' });
        }
        res.json(goal.employee);
    } catch (error) {
        console.error('Error fetching employee for the goal:', error);
        res.status(500).json({ message: 'Error fetching employee for the goal' });
    }
};

// Get the controller who created a goal
export const getGoalController = async (req, res) => {
    const { id } = req.query;
    try {
        const goal = await models.Goal.findByPk(id, {
            include: {
                model: models.Controller,
                attributes: ['id', 'user_id', 'department'], // Adjust attributes as needed
            },
        });
        if (!goal) {
            return res.status(404).json({ message: 'Controller not found for this goal' });
        }
        res.json(goal.controller);
    } catch (error) {
        console.error('Error fetching controller for the goal:', error);
        res.status(500).json({ message: 'Error fetching controller for the goal' });
    }
};
