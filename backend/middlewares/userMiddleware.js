import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const userMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) throw new Error('No token provided');

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findOne({ _id: decoded.ownerId, name: decoded.ownerName, role: decoded.role});

        if (!user) throw new Error('Authentication failed');

        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate' });
    }
};

export default userMiddleware;

