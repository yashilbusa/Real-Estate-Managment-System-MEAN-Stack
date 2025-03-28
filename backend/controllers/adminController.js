import User from '../models/User.js';
import Property from '../models/Property.js';

export const getAllBuyers = async (req, res) => {
    try {
        const buyers = await User.find({ role: 'buyer' });
        res.status(200).json(buyers);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getAllSellers = async (req, res) => {
    try {
        const sellers = await User.find({ role: 'seller' });
        res.status(200).json(sellers);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {   
        const { userId } = req.params;
        await User.findByIdAndDelete(userId);
        await Property.deleteMany({ 'owner.ownerId': userId });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const fetchSellerProperties = async (req,res) => {
    try{
        const { sellerId } = req.params;

        const sellerProperties = await Property.find({ 'owner.ownerId': sellerId });

        res.status(200).json(sellerProperties);

    } catch (error){
        res.status(500).json({ message: 'Server error', error: error.message });  
    }
}

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