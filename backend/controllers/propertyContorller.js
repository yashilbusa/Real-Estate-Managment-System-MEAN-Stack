import Property from '../models/Property.js';

// Get All Property
export const getAllProperty = async (req,res) => {
    try{
        const allProperties = await Property.find({});
        // console.log(allProperties);
        res.status(200).json(allProperties);
    }catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// Add New Property
export const listProperty = async (req,res) => {
    try {
        const { propertyName, propertyImage, squarefeet, country, state, city, price } = req.body;

        if (!propertyName || !squarefeet || !country || !state || !city || !price || req.file) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newProperty = new Property({
            propertyName,
            propertyImage,  
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
                country: country,
                state: state,
                city: city,
            };
        }
        if (price) updatedFields.price = price;

        const updatedProperty = await Property.updateOne(
            { _id: propertyId },
            { $set: updatedFields },
            { new: true }
        );

        res.status(200).json({ message: 'Property updated successfully', UpdatedProperty: updatedProperty });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete Property
export const deleteProperty = async (req,res) => {
    try{
        const { propertyId } = req.params;

        if (!propertyId) {
            return res.status(400).json({ message: 'Property ID is required' });
        }

        await Property.deleteOne({ _id: propertyId});
        res.status(200).json({ message: 'Property Deleted successfully'});
    } catch (error){
        res.status(500).json({ message: 'Server error', error: error.message });  
    }
}