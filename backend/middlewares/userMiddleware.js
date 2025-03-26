import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const userMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) return res.status(401).json({ error: 'No token provided' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded.ownerId);

        if (!user) return res.status(401).json({ error: 'Authentication failed' });

<<<<<<< HEAD
        req.user = { 
            ownerId: user._id.toString(), 
            ownerName: user.name,
            email: user.email 
        }; 
=======
        req.user = {  ownerId: user._id.toString(), ownerName: user.name, email: user.email }; 
>>>>>>> 368ffe0968e6368bdf11e91d68ba901e17ac8a56
        req.token = token;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};

export default userMiddleware;
