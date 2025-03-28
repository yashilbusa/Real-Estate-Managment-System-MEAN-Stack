import express from 'express';
import { buyPropertyRequest, getSellerBuyRequests,updateReqStatus } from '../controllers/approveController.js';
import { userMiddleware } from '../middlewares/userMiddleware.js';

const router = express.Router();


router.post('/buyRequest', userMiddleware, buyPropertyRequest);
router.get('/sellerBuyRequests/:sellerId', userMiddleware, getSellerBuyRequests);
router.put('/updateRequest/:reqId', userMiddleware, updateReqStatus);



export default router;
