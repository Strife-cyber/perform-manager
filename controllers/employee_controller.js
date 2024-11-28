import models from '../models/index.js';

// Get all employees (without related data)
export const getAllEmployees = async (req, res) => {
    try {
        const employees = await models.Employee.findAll();
        res.json(employees);
    } catch (error) {
        console.error(`[GET ALL EMPLOYEES ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'An error occurred while fetching employees.' });
    }
};

// Get a specific employee by ID (basic data only)
export const getEmployee = async (req, res) => {
    const { id } = req.query;
    console.log(id)

    try {
        const employee = await models.Employee.findByPk(id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found.' });
        }

        res.json(employee);
    } catch (error) {
        console.error(`[GET EMPLOYEE ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'An error occurred while fetching the employee.' });
    }
};

// Get related performances for an employee
export const getEmployeePerformances = async (req, res) => {
    const { id } = req.query;

    try {
        const employee = await models.Employee.findByPk(id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found.' });
        }

        const performances = await models.Performance.findAll({
            where: { assigned_to: id },
        });

        res.json(performances);
    } catch (error) {
        console.error(`[GET EMPLOYEE PERFORMANCES ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'An error occurred while fetching performances.' });
    }
};

// Get related goals for an employee
export const getEmployeeGoals = async (req, res) => {
    const { id } = req.query;

    try {
        const employee = await models.Employee.findByPk(id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found.' });
        }

        const goals = await models.Goal.findAll({
            where: { employee_id: id },
        });

        res.json(goals);
    } catch (error) {
        console.error(`[GET EMPLOYEE GOALS ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'An error occurred while fetching goals.' });
    }
};

// Get related actions for an employee
export const getEmployeeActions = async (req, res) => {
    const { id } = req.query;

    try {
        const employee = await models.Employee.findByPk(id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found.' });
        }

        const actions = await models.Action.findAll({
            where: { employee_id: id },
        });

        res.json(actions);
    } catch (error) {
        console.error(`[GET EMPLOYEE ACTIONS ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'An error occurred while fetching actions.' });
    }
};

// Get related ratings for an employee
export const getEmployeeRatings = async (req, res) => {
    const { id } = req.query;

    try {
        const employee = await models.Employee.findByPk(id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found.' });
        }

        const ratings = await models.Rating.findAll({
            where: { employee_id: id },
        });

        res.json(ratings);
    } catch (error) {
        console.error(`[GET EMPLOYEE RATINGS ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'An error occurred while fetching ratings.' });
    }
};

// Create a new employee
export const createEmployee = async (req, res) => {
    const { user_id, controller_id, department } = req.body;

    try {
        const controller = await models.Controller.findByPk(controller_id);
        if (!controller) {
            return res.status(400).json({ message: 'Invalid controller ID. Controller does not exist.' });
        }

        const employee = await models.Employee.create({ user_id, controller_id, department: department || 'General' });
        res.status(201).json(employee);
    } catch (error) {
        console.error(`[CREATE EMPLOYEE ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'An error occurred while creating the employee.' });
    }
};

// Update an existing employee
export const updateEmployee = async (req, res) => {
    const { id } = req.query;
    const { user_id, controller_id, department } = req.body;

    try {
        const employee = await models.Employee.findByPk(id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found.' });
        }

        if (controller_id) {
            const controller = await models.Controller.findByPk(controller_id);
            if (!controller) {
                return res.status(400).json({ message: 'Invalid controller ID. Controller does not exist.' });
            }
        }

        await employee.update({ user_id, controller_id, department });
        res.json(employee);
    } catch (error) {
        console.error(`[UPDATE EMPLOYEE ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'An error occurred while updating the employee.' });
    }
};

// Delete an employee
export const deleteEmployee = async (req, res) => {
    const { id } = req.query;

    try {
        const employee = await models.Employee.findByPk(id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found.' });
        }

        await employee.destroy();
        res.json({ message: 'Employee deleted successfully.' });
    } catch (error) {
        console.error(`[DELETE EMPLOYEE ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'An error occurred while deleting the employee.' });
    }
};
