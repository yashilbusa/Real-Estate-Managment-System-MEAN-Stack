import Property from '../models/Property.js';

// Add New Property
export const listProperty = async (req,res) => {
    try {
        const { propertyName, squarefeet, country, state, city, price } = req.body;

        if (!propertyName || !squarefeet || !country || !state || !city || !price) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newProperty = new Property({
            propertyName,
            // propertyImage: req.file.buffer,  
            popertyDimension: { squarefeet },
            location: { country, state, city },
            price,
            // owner: { ownerId: req.user.ownerId, ownerName: req.user.ownerName }
        });

        await newProperty.save();
        res.status(201).json({ message: 'Property listed successfully', property: newProperty });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// Update Existing Property
export const updateProperty = async (req, res) => {
    try {
        const { propertyId } = req.params;
        const { propertyName, squarefeet, country, state, city, price } = req.body;

        if (!propertyId) {
            return res.status(400).json({ message: 'Property ID is required' });
        }

        const updatedFields = {};

        if (propertyName) updatedFields.propertyName = propertyName;
        if (squarefeet) updatedFields.popertyDimension = { squarefeet };
        if (country || state || city) {
            updatedFields.location = {
                country: country || undefined,
                state: state || undefined,
                city: city || undefined,
            };
        }
        if (price) updatedFields.price = price;

        const updatedProperty = await Property.findByIdAndUpdate(
            propertyId,
            { $set: updatedFields },
            { new: true }
        );

        updatedProperty.save();
        if (!updatedProperty) {
            return res.status(404).json({ message: 'Property not found' });
        }

        res.status(200).json({ message: 'Property updated successfully', property: updatedProperty });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};