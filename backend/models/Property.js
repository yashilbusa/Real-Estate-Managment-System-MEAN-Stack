import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
    propertyName: { type:String, required: true },
    // propertyImage: { data: Buffer, type: String, required: true },
    popertyDimension: { 
        squarefeet: { type: Number, required: true }
    },
    location: { 
        country: { type:String },
        state: { type: String },
        city: { type:String },
    },
    price: { type:Number, required: true },
    owner: { 
        ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        ownerName: { type: String, required: true, ref: "User" }
    }
});

const Property = mongoose.model('Property', propertySchema);

export default Property;