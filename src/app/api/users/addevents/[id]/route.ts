import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/databaseConfig/dbConfig";
import Event from "@/models/eventModels";

interface Params {
    id: string;
  }

connect()
export async function PUT(request:NextRequest,{params}:{params: Params} ){
    const {id} = params

    const {
        neweventTitle: eventTitle,
        neweventDescription: eventDescription,
        newlocation: location,
        newdateAndTime: dateAndTime,
        neweventType: eventType,
        newvolunteerRequirements: volunteerRequirements,
        newcontact: contact,
        neweventImage: eventImage,
        newdeadline: deadline,
        neworganizerName: organizerName
    } 
    = await request.json()

    await Event.findByIdAndUpdate(id, {
        eventTitle,
        eventDescription,
        location,
        dateAndTime,
        eventType,
        volunteerRequirements,
        contact,
        eventImage,
        deadline,
        organizerName
    })

    return NextResponse.json({message:'Event has been updated'}, {status: 200})
}


export async function GET(request:NextRequest,{params}:{params: Params} ){
    const {id} = params
    const event = await Event.findOne({_id:id})
    return NextResponse.json({event}, {status:200})
}