import { v2 as cloudinary } from 'cloudinary';
import { connect } from "@/databaseConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { PassThrough } from "stream";
import { AnyKeys } from 'mongoose';

connect();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Helper function to handle the stream upload to Cloudinary
const streamUpload = (buffer: Buffer): Promise<any> => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "user_profile_pics" },
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
        // Parse the request body to get the file
        const formData = await request.formData();
        const file = formData.get('file') as Blob;

        if (!file) {
            return NextResponse.json({ message: 'No file provided' }, { status: 400 });
        }

        // Convert Blob to Buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload the buffer to Cloudinary using the helper function
        const uploadResponse = await streamUpload(buffer);

        // Update user profile picture in MongoDB
        const userId = request.headers.get('user-id');
        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        // Store the Cloudinary image URL in the user's profile
        user.profilePicture = uploadResponse.secure_url;
        await user.save();

        return NextResponse.json({ message: 'Profile picture updated', imageUrl: uploadResponse.secure_url });
    } catch (error:any) 
    {
        console.error('Error uploading image:', error);
        return NextResponse.json({ message: 'Image upload failed', error: error.message }, { status: 500 });
    }
}
