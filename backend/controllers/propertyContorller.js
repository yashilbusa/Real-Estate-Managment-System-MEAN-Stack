import Property from '../models/Property.js';

const listProperty = async (req,res) => {
    try {
        const { propertyName, squarefeet, country, state, city, price, owner } = req.body;

        if (!propertyName || !squarefeet || !country || !state || !city || !price) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newProperty = new Property({
            propertyName,
            // propertyImage: req.file.buffer, 
            popertyDimension: { squarefeet },
            location: { country, state, city },
            price,
            owner: { ownerId: req.user._id, ownerName: req.user.name } 
        });

        await newProperty.save();
        res.status(201).json({ message: 'Property listed successfully', property: newProperty });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export default listProperty;
