import ApproveRequest from "../models/ApproveRequest.js";

// Request to Buy Property
export const buyPropertyRequest = async (req,res) =>{
    try {
        const { propertyId, buyerId, sellerId, status, reqFlag } = req.body;
        if(reqFlag === true){
            const request = new ApproveRequest({
                propertyId,
                buyerId,
                sellerId,
                status,
            })
            await request.save();
        }
        res.json({ message: "Request Send from Backend"});
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });  
    }
}


// Get Seller Buy Request
export const getSellerBuyRequests = async (req,res) => {
    try {
        // const {sellerId}  = req.params;
        // console.info(sellerId);

        // const buyRequest = await ApproveRequest.find({ sellerId: sellerId});
        
        const buyRequest = await ApproveRequest.find();
        res.json(buyRequest);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });  
    }
}

export const updateReqStatus = async (req,res) => {
   try {
    const { reqId } = req.params;
    const { status } = req.body;

    if(status === 'pending' || status === 'approved' || status === 'rejected') {
        const updatedRequest = await ApproveRequest.findOneAndUpdate(
            { _id:reqId },
            { $set : { status:status }}
        )
    }
   } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });  
   }
}