import mongoose from "mongoose";

//creating a user database in MongodB

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: [true, 'Please provide a firstName'],
        
    },
    lastName:{
        type: String,
        required: [true, 'Please provide a lastname'],
        
    },
    username:{
        type: String,
        required: [true, 'Please provide a username'],
        unique: true
    },
    email:{
        type: String,
        required: [true, 'Please provide a valid email'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'Please provide a password'],
    },

    bio: {
        type: String,
        default: '', 
    },
    
      // List of skills as an array of strings
    skills: {
        type: [String], 
        default: []
    },
    // list of user interests
    interests: {
        type: [String], 
        default: [],
    },

    availability: {
        type: String, 
        default: '',
      },
    isVerified:{
        type: Boolean,
        default: false
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    profilePicture: {
        type: String,
        default: '' 
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date

})

const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User