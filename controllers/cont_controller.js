import models from '../models/index.js';

export const getAllControllers = async (req, res) => {
    try {
        const controllers = await models.Controller.findAll();
        res.json(controllers);
    } catch (error) {
        console.error(`[GET ALL CONTROLLERS ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'An error occurred while fetching controllers.' });
    }
};

export const getController = async (req, res) => {
    const { id } = req.query;

    try {
        const controller = await models.Controller.findByPk(id);
        if (!controller) {
            return res.status(404).json({ message: 'Controller not found.' });
        }

        res.json(controller);
    } catch (error) {
        console.error(`[GET CONTROLLER ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'An error occurred while fetching a controller.' });
    }
};

export const createController = async (req, res) => {
    const { user_id, department } = req.body;

    try {
        // Ensure the user exists
        const user = await models.User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ message: 'Cannot create controller. User does not exist.' });
        }

        // Create the controller
        const controller = await models.Controller.create({
            user_id,
            department: department || 'General', // Default value
        });

        res.status(201).json({
            message: 'Controller created successfully.',
            controller,
        });
    } catch (error) {
        console.error(`[CREATE CONTROLLER ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'An error occurred while creating the controller.' });
    }
};

export const updateController = async (req, res) => {
    const { id } = req.query;
    const { department } = req.body;

    try {
        const controller = await models.Controller.findByPk(id);
        if (!controller) {
            return res.status(404).json({ message: 'Controller not found.' });
        }

        // Update the controller
        await controller.update({
            department: department || controller.department, // Keep existing department if not provided
        });

        res.json({
            message: 'Controller updated successfully.',
            controller,
        });
    } catch (error) {
        console.error(`[UPDATE CONTROLLER ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'An error occurred while updating the controller.' });
    }
};

export const deleteController = async (req, res) => {
    const { id } = req.query;

    try {
        const controller = await models.Controller.findByPk(id);
        if (!controller) {
            return res.status(404).json({ message: 'Controller not found.' });
        }

        // Delete the controller
        await controller.destroy();
        res.status(204).send(); // No content response
    } catch (error) {
        console.error(`[DELETE CONTROLLER ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'An error occurred while deleting the controller.' });
    }
};

export const getControllerEmployees = async (req, res) => {
    const { id } = req.query;

    try {
        const controller = await models.Controller.findByPk(id);
        if (!controller) {
            return res.status(404).json({ message: 'Controller not found.' });
        }

        const employees = await models.Employee.findAll({
            where: { controller_id: id },
        });

        res.json(employees);
    } catch (error) {
        console.error(`[GET CONTROLLER EMPLOYEES ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'An error occurred while fetching employees.' });
    }
};

export const getControllerPerformances = async (req, res) => {
    const { id } = req.query;

    try {
        const controller = await models.Controller.findByPk(id);
        if (!controller) {
            return res.status(404).json({ message: 'Controller not found.' });
        }

        const performances = await models.Performance.findAll({
            where: { created_by: id },
        });

        res.json(performances);
    } catch (error) {
        console.error(`[GET CONTROLLER PERFORMANCES ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'An error occurred while fetching performances.' });
    }
};

export const getControllerGoals = async (req, res) => {
    const { id } = req.query;

    try {
        const controller = await models.Controller.findByPk(id);
        if (!controller) {
            return res.status(404).json({ message: 'Controller not found.' });
        }

        const goals = await models.Goal.findAll({
            where: { created_by: id },
        });

        res.json(goals);
    } catch (error) {
        console.error(`[GET CONTROLLER GOALS ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'An error occurred while fetching goals.' });
    }
};

export const getControllerSupports = async (req, res) => {
    const { id } = req.query;

    try {
        const controller = await models.Controller.findByPk(id);
        if (!controller) {
            return res.status(404).json({ message: 'Controller not found.' });
        }

        const supports = await models.Support.findAll({
            where: { uploaded_by: id },
        });

        res.json(supports);
    } catch (error) {
        console.error(`[GET CONTROLLER SUPPORTS ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'An error occurred while fetching supports.' });
    }
};
