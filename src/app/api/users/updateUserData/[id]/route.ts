import { NextRequest , NextResponse} from "next/server";
import { connect } from "@/databaseConfig/dbConfig";
import User from "@/models/userModel";

connect()

export async function GET(request: NextRequest, {params}:{params:{id:string}}){

    try{
        const { id } = params;

         // Fetch user from MongoDB
        const user = await User.findById(id);

        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        // return user data
        return NextResponse.json({ success: true, data: user }, { status: 200 });
    }
    catch(error:any){

    }
}


export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {

    try{

        const { id } = params;

        const body = await request.json();
        const { bio, skills, username } = body;

        const user = await User.findById(id);


        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        if (bio) user.bio = bio;
        if (skills) user.skills = skills;
        if (username) user.username = username;

        await user.save();

        return NextResponse.json(
            { success: true, message: "User updated successfully", data: user }, 
            { status: 200 });

    }catch(error:any){
         
        console.error("Error updating user:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}

    