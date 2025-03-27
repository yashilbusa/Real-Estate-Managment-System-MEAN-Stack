import express from 'express';
import { buyPropertyRequest } from '../controllers/approveController.js';
import { userMiddleware } from '../middlewares/userMiddleware.js';

const router = express.Router();


router.post('/buyRequest', userMiddleware, buyPropertyRequest);
export default router;
