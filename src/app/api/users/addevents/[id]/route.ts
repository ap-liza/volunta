import { connect } from "@/databaseConfig/dbConfig";
import Event from '@/models/eventModels';
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';
import { PassThrough } from "stream";
connect();

interface EventParams {
    eventId: string;
  }


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
export async function GET(request: NextRequest, { params }: { params: EventParams }) {

    const { eventId } = params;

    try {
        const event = await Event.findById(eventId);
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
export async function PUT(request: NextRequest,{ params }: { params: EventParams }) {
    const { eventId } = params;

    try {
        const formData = await request.formData();
        const file = formData.get('eventImage') as Blob;

        let eventImageUrl = null;
        if (file) {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const uploadResponse = await streamUpload(buffer);
            eventImageUrl = uploadResponse.secure_url;
        }

        const updatedEvent = {
            eventTitle: formData.get('eventTitle'),
            eventDescription: formData.get('eventDescription'),
            location: formData.get('location'),
            dateAndTime: formData.get('dateAndTime'),
            eventType: formData.get('eventType'),
            volunteerRequirements: formData.get('volunteerRequirements'),
            contact: formData.get('contact'),
            deadline: formData.get('deadline'),
            organizerName: formData.get('organizerName'),
            ...(eventImageUrl && { eventImage: eventImageUrl })
        };

        const event = await Event.findByIdAndUpdate(eventId, updatedEvent, { new: true });

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