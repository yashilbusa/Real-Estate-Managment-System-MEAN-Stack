import express from 'express';

import { getAllBuyers, getAllSellers, deleteUser, fetchSellerProperties } from '../controllers/adminController.js';
// import { adminMiddleware } from '../middlewares/adminMiddleware.js';

const router = express.Router();

router.get('/getAllBuyers',  getAllBuyers);
router.get('/getAllSellers',  getAllSellers);
router.delete('/deleteUser/:userId',  deleteUser);
router.get('/fetchSellerProperties/:sellerId',  fetchSellerProperties);



export default router;
