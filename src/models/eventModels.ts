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
        default: ''  // Optional: can leave it empty initially
    },
    deadline:{
        type: Date,
        required: [true, 'Please provide date']
    },
    organizerName:{
        type: String,
        required: [true, 'Please provide the name of the organizer']

    },
     // Reference to the User model (the user who created the event)
    userId: {
    type: mongoose.Schema.Types.ObjectId, 
    // MongoDB ObjectId
    ref: "users", // This references the 'users' collection (from User model)
    required: true,
    },
    createdAt: {
    type: Date,
    default: Date.now,
  },
    
},
{
    timestamps: true,
}
)

const Event = mongoose.models.events || mongoose.model('events', eventSchema)

export default Event