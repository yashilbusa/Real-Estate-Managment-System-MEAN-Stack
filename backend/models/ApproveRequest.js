import mongoose from 'mongoose';

const approveRequestSchema = new mongoose.Schema({
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
    // buyerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type:String, enum: ['pending', 'approved', 'rejected'], default: 'pending'}
})

const ApproveRequest = mongoose.model('ApproveRequest', approveRequestSchema);

export default ApproveRequest;