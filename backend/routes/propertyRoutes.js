import express from 'express';
import { getAllProperty, listProperty, updateProperty, deleteProperty } from '../controllers/propertyContorller.js';
import multer from 'multer';
import userMiddleware  from '../middlewares/userMiddleware.js';


const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/getAllProperty', getAllProperty);
router.post('/listNewProperty', upload.single('propertyImage'), listProperty);
router.put('/updateProperty/:propertyId', updateProperty);
router.delete('/deleteProperty/:propertyId', deleteProperty);


export default router;