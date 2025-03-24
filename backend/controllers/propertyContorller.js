import express from 'express';
import multer from 'multer';
import Property from '../models/Property.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/create-listing', upload.single('propertyImage'), async (req, res) => {
    try {
        const { propertyName, squarefeet, country, state, city, price, owner } = req.body;

        if (!propertyName || !squarefeet || !country || !state || !city || !price || !req.file) {
            return res.status(400).json({ message: 'All fields are required including an image' });
        }

        const newProperty = new Property({
            propertyName,
            propertyImage: req.file.buffer.toString('base64'), 
            popertyDimension: { squarefeet },
            location: { country, state, city },
            price,
            owner: { ownerId: owner._id, ownerName: owner.name } 
        });

        await newProperty.save();
        res.status(201).json({ message: 'Property listed successfully', property: newProperty });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default router;
