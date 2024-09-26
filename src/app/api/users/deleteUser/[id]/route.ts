import { connect } from "@/databaseConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


connect()

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }){

    try{
    // Extract user ID from the params
    const userId = params.id;

     // Ensure the user Id is provided
     if (!userId) {
        return NextResponse.json({ error: "User ID is required" }, { status: 400 });
      }

    // Find and delete the user by ID
    const deletedUser = await User.findByIdAndDelete(userId);

     // Check if the user was found and deleted
     if (!deletedUser) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });


      }
    
      //response to show a user was deleted

    const response = NextResponse.json(
        { message: "User deleted successfully", user: deletedUser },
        { status: 200 }
    );

    // Clear the token cookie 
    response.cookies.set('token', '', {
      httpOnly: true,
      expires: new Date(0),
    });

      return response


    } catch (error:any) {
      console.error("Error deleting user:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
    

}