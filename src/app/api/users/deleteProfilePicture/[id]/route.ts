import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, {params}: {params:{id:string}}){

    try{

        const userId = params.id;

        if (!userId) {
            return NextResponse.json(
              { message: 'User ID not found' }, 
              { status: 400 });
          }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePicture: '' },
            { new: true }
          );

          if (!updatedUser) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
          }

          return NextResponse.json({
            message: 'Profile picture deleted successfully',
            user: updatedUser,
          },
          { status: 200 }
        );
    }catch (error:any) {
        
        return NextResponse.json(
          {
            message: 'An error occurred while deleting the profile picture',
            error: error.message,
          },
          { status: 500 }
        );
      }
}