import { Request, Response } from 'express';
import { User } from '../models/userModel';

export const addUser = async (req: Request, res: Response) => {
    try {
        const { name,
            email } = req.body;

        // Validate required fields
        if (!name || !email) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Check if user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                error: 'User with the same email already exists'
            });
        }

        // Create a new user object
        const newUser = new User({
            name,
            email,
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: 'User added successfully', user: newUser });
    } catch (error) {
        res.status(500).json({
            error:
                'An error occurred while adding the user'
        });
    }
};

export const getUsers = async (_req: Request, res: Response) => {
    const users = await User.find();
    res.status(200).json(users);
};
