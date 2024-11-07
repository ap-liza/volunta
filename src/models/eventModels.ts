import mongoose from "mongoose";


//creating the event info databse in mongodb
const eventSchema = new mongoose.Schema(
    {
    eventTitle:{
        type:String,
        required: [true, 'Please provide an event title']
    },
    eventDescription:{
        type:String,
        required: [true, 'Please provide an event description']
    },
    location:{
        type:String,
        required: [true, 'Please provide location']
    },
    dateAndTime:{
        type: Date,
        required: [true, 'Please provide date']
    },
    eventType:{
        type:String,
        required: [true, 'Please provide event type']
    },
    volunteerRequirements:{
        type:String,
        required: [true, 'Please provide requirements']
    },
    contact:{
        type:String,
        required: [true, 'Please provide contact information']
    },
    eventImage: {
        type: String,
        default: ''
    },
    deadline:{
        type: Date,
        required: [true, 'Please provide date']
    },
    organizerName:{
        type: String,
        required: [true, 'Please provide the name of the organizer']

    },
    // Adding a reference to the Organization model
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'organizations', 
        required: true 
    },
    questions: { 
        type: [String], 
        default:[],
    } ,
    registrations: [{
        uSerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
        status: {
            type: String,
            enum: ['pending', 'accepted', 'rejected'],
            default: 'pending'
        },
        registrationDate: {
            type: Date,
            default: Date.now
        }
    }] ,
    interactions: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
        type: { type: String, enum: ['view', 'like', 'register'], default: 'view' },
        timestamp: { type: Date, default: Date.now }
    }],

    
    
},
//registrations for users:
    
{
    timestamps: true,
}
)

const Event = mongoose.models.events || mongoose.model('events', eventSchema)

export default Event