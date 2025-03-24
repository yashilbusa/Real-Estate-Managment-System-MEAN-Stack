import express from 'express';
import listProperty from '../controllers/propertyContorller.js';
import multer from 'multer';


const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/listNewProperty",upload.single('propertyImage'),listProperty);


export default router;