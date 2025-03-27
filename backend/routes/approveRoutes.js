import express from 'express';
import { buyPropertyRequest } from '../controllers/approveController.js';

const router = express.Router();


router.post('/buyRequest',buyPropertyRequest);
export default router;
