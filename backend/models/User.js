import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role:{ type:String,enum:["buyer","seller","agent"],default:"buyer", required: true},
    tokens: [{ token: { type: String } }]
});
export const User = mongoose.model('User', userSchema); 