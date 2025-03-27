import express from 'express';

import { getAllBuyers, getAllSellers, deleteUser, fetchSellerProperties, deleteProperty } from '../controllers/adminController.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';

const router = express.Router();

router.get('/getAllBuyers', adminMiddleware,  getAllBuyers);
router.get('/getAllSellers', adminMiddleware, getAllSellers);
router.delete('/deleteUser/:userId', adminMiddleware,  deleteUser);
router.get('/fetchSellerProperties/:sellerId', adminMiddleware, fetchSellerProperties);
router.delete('/deleteProperty/:propId', adminMiddleware, deleteProperty);


export default router;
