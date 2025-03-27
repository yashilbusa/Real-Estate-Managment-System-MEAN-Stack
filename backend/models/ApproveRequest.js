import mongoose from 'mongoose';

const approveRequestSchema = new mongoose.Schema({
    buyerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type:String, enum: ['pending', 'approved', 'rejected']}
})

const ApproveRequest = mongoose.model('ApproveRequest', approveRequestSchema);

export default ApproveRequest;