import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin.js';

const adminMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) throw new Error('No token provided');

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const admin = await Admin.findOne({ _id: decoded._id });

        if (!admin) throw new Error('Authentication failed');

        req.admin = admin;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate' });
    }
};

export default adminMiddleware;