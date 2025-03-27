import express from 'express';
import { getAllProperty, listProperty, updateProperty, deleteProperty, getSellerProperties } from '../controllers/propertyContorller.js';
import multer from 'multer';
import { userMiddleware }  from '../middlewares/userMiddleware.js';


const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/getAllProperty', getAllProperty);
router.post('/listNewProperty', userMiddleware, upload.single('propertyImage'), listProperty);
router.put('/updateProperty/:propertyId', userMiddleware, upload.single('propertyImage'), updateProperty);
router.delete('/deleteProperty/:propertyId', userMiddleware, deleteProperty);
router.get('/getSellerProperties', userMiddleware, getSellerProperties);

export default router;
