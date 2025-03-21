import User from '../models/User.js';
import Property from '../models/Property.js';


const listProperty = async (req, res) => {
    try {
        const { propertyName, propertyImage, popertyDimension, location, price} = req.body;
        const property = new Property({ 
            propertyName, 
            propertyImage, 
            popertyDimension, 
            location, 
            price, 
            owner: req.user._id 
        });
        await property.save();
        res.status(201).json(property);
    } catch (error) {
        console.error("Error in ListingProperty:", error);
        res.status(500).json({ error: "Server Error" });
    }
};

export default listProperty;