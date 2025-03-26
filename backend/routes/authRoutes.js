import express from 'express';
import { signup, login, getUserProfile } from '../controllers/authController.js';
import userMiddleware from '../middlewares/userMiddleware.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/userProfile", userMiddleware, getUserProfile);
router.get("/adminProfile", userMiddleware, getUserProfile);



export default router;