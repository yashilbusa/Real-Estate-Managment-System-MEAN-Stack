import express from 'express';
import { getAllProperty, listProperty, updateProperty, deleteProperty } from '../controllers/propertyContorller.js';
import multer from 'multer';
import userMiddleware  from '../middlewares/userMiddleware.js';


const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/getAllProperty', getAllProperty);
router.post('/listNewProperty', upload.single('propertyImage'), userMiddleware, listProperty);
router.put('/updateProperty/:propertyId', upload.single('propertyImage'), userMiddleware, updateProperty);
router.delete('/deleteProperty/:propertyId', userMiddleware, deleteProperty);


export default router;
