import ApproveRequest from "../models/ApproveRequest.js";

export const buyPropertyRequest = async (req,res) =>{
    try {
        res.json({ message: "Request Send from Backend"});
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });  
    }
}