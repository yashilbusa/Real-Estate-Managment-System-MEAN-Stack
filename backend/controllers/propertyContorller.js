import Property from '../models/Property.js';


// Get All Property
export const getAllProperty = async (req, res) => {
    try {
        const allProperties = await Property.find({});

        const formattedProperties = allProperties.map(property => ({
            ...property._doc,
            owner: property.owner || { ownerName: 'Unknown Owner' }, 
            propertyImage: property.propertyImage?.data 
                ? `data:${property.propertyImage.contentType};base64,${property.propertyImage.data.toString('base64')}`
                : null
        }));

        res.status(200).json(formattedProperties);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// Add New Property
export const listProperty = async (req,res) => {
    try {
        const { propertyName, propertyImage, squarefeet, country, state, city, price } = req.body;

        if (!propertyName || !squarefeet || !country || !state || !city || !price) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newProperty = new Property({
            propertyName,
            propertyImage: {  data: req.file.buffer, contentType: req.file.mimetype },  
            popertyDimension: { squarefeet },
            location: { country, state, city },
            price,
            owner: { ownerId: req.user.ownerId, ownerName: req.user.ownerName }
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
        const { propertyName, squarefeet, price } = req.body;

        if (!propertyId) {
            return res.status(400).json({ message: 'Property ID is required' });
        }

        const updatedFields = {};
        if (propertyName) updatedFields.propertyName = propertyName;
        if (squarefeet) updatedFields.squarefeet = squarefeet; 
        if (price) updatedFields.price = price;

        const updatedProperty = await Property.findByIdAndUpdate(
            propertyId,
            { $set: updatedFields },
            { new: true } 
        );

        if (!updatedProperty) {
            return res.status(404).json({ message: 'Property not found' });
        }

        res.status(200).json({ message: 'Property updated successfully', updatedProperty });
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


// Get Perticular Seller Properties
export const getSellerProperties = async (req,res) => {
    try{
        const sellerId = req.user.ownerId;

        const sellerProperties = await Property.find({ 'owner.ownerId': sellerId });

        res.status(200).json(sellerProperties);

    } catch (error){
        res.status(500).json({ message: 'Server error', error: error.message });  
    }
}