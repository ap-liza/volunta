import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    contact: { 
        type: Number, 
        required: true 
    },
    address: { 
        type: String,
        default:'' 
    },

    website: { 
        type: String, 
        default:''
    },
    description: { 
        type: String,
        default:''
    },
    organizationType: { 
        type: String, 
        required: true 
    },
    causes: {
        type:[String],
        default:''
    },
    skillsNeeded: {
        type: [String], 
        default: []
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
    createdAt: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: false },
})

const Organization = mongoose.models.organizations || mongoose.model("organizations", organizationSchema)

export default Organization