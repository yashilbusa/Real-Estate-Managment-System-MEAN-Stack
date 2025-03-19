import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
    propertyName: { type:String },
    propertyImage:{ data: Buffer, type: String },
    popertyDimension:{ 
        squarefeet: { type: Number }
    },
    location: { 
        country:{ type:String },
        city: { type:String },
        area: { type:String }
    },
    price:{ type:Number },
    owner: { type:String }
});

export const Property = mongoose.model('Property', propertySchema);