import express from 'express';
import { signup, login, adminLogin } from '../controllers/authController.js';
import { userMiddleware } from '../middlewares/userMiddleware.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/adminlogin", adminLogin);

export default router;
