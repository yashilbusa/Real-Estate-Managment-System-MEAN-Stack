import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    name: String,
    email:String,
    password: String,
    tokens: [{ token: String }]
});

export const Admin = mongoose.model('Admin', adminSchema);