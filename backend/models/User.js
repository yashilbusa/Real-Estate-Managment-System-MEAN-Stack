import mongoose from 'mongoose';

const roleMapping = {
    0: "buyer",
    1: "seller",
    2: "agent"
}

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type:String,enum:[0,1,2],default:0, required: true},
    tokens: [{ token: { type: String } }]
},{ timestamps: true });

// userSchema.methods.getRoleName = () =>  {
//     return roleMapping[this.role];
// };

const User = mongoose.model('User', userSchema); 

export default User;