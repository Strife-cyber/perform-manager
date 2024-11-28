import bcrypt from 'bcrypt';
import models from '../models/index.js';

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body)

    try {
        // Check if all required fields are provided
        if (!name || !email || !password) return res.status(400).json({ message: 'Name, email, and password are required.' });

        // Check if email already exists
        const existingUser = await models.User.findOne({ where: { email } });
        if (existingUser) return res.status(409).json({ message: 'Email is already in use.' });

        // Hash the password and create the user
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await models.User.create({name, email, password: hashedPassword, logged: false});

        res.status(201).json({
            message: 'User registered successfully',
            userId: user.id,
        });
    } catch (error) {
        console.error(`[REGISTER ERROR]: ${error.message}`, error);
        res.status(500).json({
            message: 'Internal server error. Please try again later.',
            error: error.message,
        });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await models.User.findAll();
        res.json(users);
    } catch (error) {
        console.error(`[GET ALL USERS ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'An error occurred while fetching users.' });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.query;
    const { name, email, password } = req.body;

    try {
        // Validate the user exists
        const user = await models.User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Update only the provided fields
        const updateData = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword;
        }

        await models.User.update(updateData, { where: { id } });

        // Return the updated user
        const updatedUser = await models.User.findByPk(id);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(`[UPDATE USER ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'An error occurred while updating the user.' });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.query;

    try {
        const deleted = await models.User.destroy({ where: { id } });

        if (deleted) res.status(204).send();
        else res.status(404).json({ message: 'User not found.' });
    } catch (error) {
        console.error(`[DELETE USER ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'An error occurred while deleting the user.' });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate input
        if (!email || !password) return res.status(400).json({ message: 'Email and password are required.' });

        // Find the user by email
        const user = await models.User.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ message: 'Invalid email or password.' });

        // Update the logged state
        user.logged = true;
        await user.save();

        res.json({ message: 'Login successful', userId: user.id });
    } catch (error) {
        console.error(`[LOGIN ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'Internal server error. Please try again later.' });
    }
};

export const logout = async (req, res) => {
    const { id } = req.query;

    try {
        const user = await models.User.findByPk(id);

        if (!user) return res.status(404).json({ message: 'User not found.' });

        user.logged = false;
        await user.save();

        res.json({ message: 'Logout successful.' });
    } catch (error) {
        console.error(`[LOGOUT ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'Internal server error. Please try again later.' });
    }
};

export const authenticated = async (req, res) => {
    const { id } = req.query;

    try {
        const user = await models.User.findByPk(id);

        if (!user) return res.status(404).json({ message: 'User not found.' });

        res.json({authenticated: user.logged, message: user.logged ? 'Logged In' : 'Guest'});
    } catch (error) {
        console.error(`[AUTHENTICATION CHECK ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'Internal server error. Please try again later.' });
    }
};

export const profile = async (req, res) => {
    const { id } = req.query;

    try {
        const user = await models.User.findByPk(id);

        if (!user) return res.status(404).json({ message: 'User not found.' });

        res.json({ message: 'This is your profile', user});
    } catch (error) {
        console.error(`[PROFILE ERROR]: ${error.message}`, error);
        res.status(500).json({ message: 'Internal server error. Please try again later.' });
    }
};
