import ApproveRequest from "../models/ApproveRequest.js";

export const buyPropertyRequest = async (req,res) =>{
    try {
        const { sellerId, buyerId, status } =req.body;
        const request = new ApproveRequest({
            buyerId,
            sellerId,
            status
        })

        request.save();
        res.json({request});
        // res.json({ message: "Request Send from Backend"});
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });  
    }
}