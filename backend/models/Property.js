import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
    propertyName: { type:String, required: true },
    propertyImage: { data: Buffer, type: String, required: true },
    popertyDimension: { 
        squarefeet: { type: Number, required: true }
    },
    location: { 
        country: { type:String },
        state: { type: String },
        city: { type:String },
        area: { type:String }
    },
    price: { type:Number, required: true },
    owner: { type:mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

const Property = mongoose.model('Property', propertySchema);

export default Property;