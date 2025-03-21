import express from 'express';
import userMiddleware from '../middlewares/userMiddleware.js'
import listProperty from '../controllers/propertyContorller.js';
const router = express.Router();

router.post("/listNewProperty",userMiddleware,listProperty);


export default router;