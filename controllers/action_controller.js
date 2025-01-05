import models from '../models/index.js'; // Import models

// Get all actions
export const getAllActions = async (req, res) => {
    try {
        const actions = await models.Action.findAll();
        res.json(actions);
    } catch (error) {
        console.error('Error fetching actions:', error);
        res.status(500).json({ message: 'Error fetching actions' });
    }
};

// Get a specific action by ID
export const getAction = async (req, res) => {
    const { id } = req.query;
    try {
        const action = await models.Action.findByPk(id);
        if (!action) {
            return res.status(404).json({ message: 'Action not found' });
        }
        res.json(action);
    } catch (error) {
        console.error('Error fetching action:', error);
        res.status(500).json({ message: 'Error fetching action' });
    }
};

// Get all actions for a specific goal
export const getActionsByGoal = async (req, res) => {
    const { goalId } = req.query;
    try {
        const actions = await models.Action.findAll({ where: { goal_form: goalId } });
        res.json(actions);
    } catch (error) {
        console.error('Error fetching actions for the goal:', error);
        res.status(500).json({ message: 'Error fetching actions for this goal' });
    }
};

// Get all actions assigned to a specific employee
export const getActionsByEmployee = async (req, res) => {
    const { employeeId } = req.query;
    try {
        const actions = await models.Action.findAll({ where: { employee_id: employeeId } });
        res.json(actions);
    } catch (error) {
        console.error('Error fetching actions for the employee:', error);
        res.status(500).json({ message: 'Error fetching actions for this employee' });
    }
};

// Get the goal related to a specific action
export const getActionGoal = async (req, res) => {
    const { id } = req.query;
    try {
        const action = await models.Action.findByPk(id, {
            include: {
                model: models.Goal,
                attributes: ['id', 'title', 'description'], // Adjust attributes as needed
            },
        });
        if (!action) {
            return res.status(404).json({ message: 'Goal not found for this action' });
        }
        res.json(action.goal);
    } catch (error) {
        console.error('Error fetching goal for the action:', error);
        res.status(500).json({ message: 'Error fetching goal for the action' });
    }
};

// Get the employee assigned to a specific action
export const getActionEmployee = async (req, res) => {
    const { id } = req.query;
    try {
        const action = await models.Action.findByPk(id, {
            include: {
                model: models.Employee,
                attributes: ['id', 'user_id', 'department'], // Adjust attributes as needed
            },
        });
        if (!action) {
            return res.status(404).json({ message: 'Employee not found for this action' });
        }
        res.json(action.employee);
    } catch (error) {
        console.error('Error fetching employee for the action:', error);
        res.status(500).json({ message: 'Error fetching employee for the action' });
    }
};

// Create a new action
export const createAction = async (req, res) => {
    const { goal_form, employee_id, description, status, path } = req.body;
    try {
        const action = await models.Action.create({
            goal_form,
            employee_id,
            description,
            status,
            path
        });
        res.status(201).json(action);
    } catch (error) {
        console.error('Error creating action:', error);
        res.status(500).json({ message: 'Error creating action' });
    }
};

// Update an action by ID
export const updateAction = async (req, res) => {
    const { id } = req.query;
    const { goal_form, employee_id, description, status, path } = req.body;
    try {
        const action = await models.Action.findByPk(id);
        if (!action) {
            return res.status(404).json({ message: 'Action Form not found' });
        }
        await action.update({ goal_form, employee_id, description, status, path });
        res.json(action);
    } catch (error) {
        console.error('Error updating action:', error);
        res.status(500).json({ message: 'Error updating action form' });
    }
};

// Delete an action by ID
export const deleteAction = async (req, res) => {
    const { id } = req.query;
    try {
        const action = await models.Action.findByPk(id);
        if (!action) {
            return res.status(404).json({ message: 'Action Form not found' });
        }
        await action.destroy();
        res.json({ message: 'Action deleted successfully' });
    } catch (error) {
        console.error('Error deleting action:', error);
        res.status(500).json({ message: 'Error deleting action form' });
    }
};
