import { connect } from "@/databaseConfig/dbConfig";
import Event from '@/models/eventModels';
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';
import { PassThrough } from "stream";

connect();



//for image upload 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

        const bufferStream = new PassThrough();
        bufferStream.end(buffer);
        bufferStream.pipe(uploadStream);
    });
};


//fetch event
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {

    try {
        const { id } = params;
        const event = await Event.findById(id);
        if (!event) {
            return NextResponse.json(
                { message: 'Event not found' },
                 { status: 404 });
        }

        return NextResponse.json(event);
    } catch (error:any) {
        console.error('Error fetching event:', error);
        return NextResponse.json(
            { message: 'Failed to fetch event', error: error.message },
             { status: 500 });
    }
}

//put event 
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {

    const { id } = params;

    try {
        const formData = await request.formData();
        const file = formData.get('eventImage') as Blob;

        // Check if a new image is uploaded
        let eventImage = formData.get('eventImage');
        if (eventImage && eventImage instanceof Blob) {
            const buffer = Buffer.from(await eventImage.arrayBuffer());
            const uploadResult = await streamUpload(buffer);
            eventImage = uploadResult.secure_url;
        }

        // Update event fields
        const updatedEvent = {
            eventTitle: formData.get('eventTitle') || undefined,
            eventDescription: formData.get('eventDescription') || undefined,
            location: formData.get('location') || undefined,
            dateAndTime: formData.get('dateAndTime') || undefined,
            eventType: formData.get('eventType') || undefined,
            volunteerRequirements: formData.get('volunteerRequirements') || undefined,
            contact: formData.get('contact') || undefined,
            deadline: formData.get('deadline') || undefined,
            organizerName: formData.get('organizerName') || undefined,
            eventImage: eventImage || undefined,
        };

        const event = await Event.findByIdAndUpdate(id, updatedEvent, { new: true });

        if (!event) {
            return NextResponse.json({ message: 'Event not found' }, { status: 404 });
        }

        return NextResponse.json({
            message: 'Event updated successfully',
            success: true,
            event
        });
    } catch (error: any) {
        console.error('Error updating event:', error);
        return NextResponse.json({ message: 'Event update failed', error: error.message }, { status: 500 });
    }
}