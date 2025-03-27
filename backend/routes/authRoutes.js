import express from 'express';
import { signup, login, getProfile } from '../controllers/authController.js';
import { userMiddleware } from '../middlewares/userMiddleware.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/userProfile", userMiddleware, getProfile);
router.get("/adminProfile", userMiddleware, getProfile);



export default router;