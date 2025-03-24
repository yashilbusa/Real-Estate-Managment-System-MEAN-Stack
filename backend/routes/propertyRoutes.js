import express from 'express';
import listProperty from '../controllers/propertyContorller.js';
import multer from 'multer';
import userMiddleware  from '../middlewares/userMiddleware.js';


const router = express.Router();

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

router.post("/listNewProperty", userMiddleware, listProperty);


export default router;