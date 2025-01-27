import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    isLoggedIn:{
        type: Boolean,
        required: true
    },
    experience:{
        type: Number,
        required: true,
        default: 0
    }
   
});


const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;