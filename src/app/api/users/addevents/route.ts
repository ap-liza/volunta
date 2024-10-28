import { v2 as cloudinary } from 'cloudinary';
import { connect } from "@/databaseConfig/dbConfig";
import Event from '@/models/eventModels';
import { NextRequest, NextResponse } from "next/server";
import { PassThrough } from "stream";


connect();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper function to handle the stream upload to Cloudinary
const streamUpload = (buffer: Buffer): Promise<any> => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "event_images" },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );

        // Create a readable stream and pipe the buffer data into the Cloudinary stream
        const bufferStream = new PassThrough();
        bufferStream.end(buffer);
        bufferStream.pipe(uploadStream);
    });
};

export async function POST(request: NextRequest) {


    try {

       

        // Parse the request body to get the file and other event details
        const formData = await request.formData();
        const file = formData.get('eventImage') as Blob; // get the image file from the form data

        const userId = formData.get('userId');
      

        if (!file || !userId) {
            return NextResponse.json({ message: 'No file provided and userId' }, { status: 400 });
        }

        // Convert Blob to Buffer for Cloudinary
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload the image to Cloudinary
        const uploadResponse = await streamUpload(buffer);

        // Extract other event details
        const eventTitle = formData.get('eventTitle');
        const eventDescription = formData.get('eventDescription');
        const location = formData.get('location');
        const dateAndTime = formData.get('dateAndTime');
        const eventType = formData.get('eventType');
        const volunteerRequirements = formData.get('volunteerRequirements');
        const contact = formData.get('contact');
        const deadline = formData.get('deadline');
        const organizerName = formData.get('organizerName');
        const questions = formData.getAll('questions')
        
    

        // Create new event with the image URL from Cloudinary
        const newEvent = new Event({
            eventTitle,
            eventDescription,
            location,
            dateAndTime,
            eventType,
            volunteerRequirements,
            eventImage: uploadResponse.secure_url, //the Cloudinary URL
            contact,
            deadline,
            organizerName,
            userId,
            questions
            
            
        });

        const savedEvent = await newEvent.save();

        return NextResponse.json({
            message: 'Event created successfully',
            success: true,
            savedEvent
        });

    } catch (error: any) {
        console.error('Error creating event:', error);
        return NextResponse.json({ message: 'Event creation failed', error: error.message }, { status: 500 });
    }
}
