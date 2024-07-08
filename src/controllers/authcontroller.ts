import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import config from '../config/config';

export const signup = async (req: Request, res: Response) => {
    try {
        const { name, email, password, role } = req.body;

        const hashedPassword = await bcrypt.hash(password, 8);

        const user = new User({ name, email, password: hashedPassword, role });
        await user.save();

        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ error: 'Invalid login credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ error: 'Invalid login credentials' });
        }

        const token = jwt.sign({ _id: user._id, role: user.role }, "28cbf6bf7e4bcdc27f3ed3b9a1aa6a901232bc1d1533a1490fb9f9e76e7f15476897acb7a8b5605fd87a6d8ed0a1f9900f61b9457d32a43dfa8664e54a9f56aa");
        res.send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
};

