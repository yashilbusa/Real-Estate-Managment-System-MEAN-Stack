import mongoose from 'mongoose';

// const roleMapping = {
//     0: "buyer",
//     1: "seller",
//     2: "agent"
// }

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type:String,enum:["buyer","seller","agent","admin"],default:"buyer", required: true},
    token: { type: String }
});

// userSchema.methods.getRoleName = () =>  {
//     return roleMapping[this.role];
// };

const User = mongoose.model('User', userSchema); 

export default User;