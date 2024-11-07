import Event from "@/models/eventModels";
import { connect } from "@/databaseConfig/dbConfig";
import { NextResponse } from "next/server";

connect()

export async function POST(req:any){

    const { userId, eventId, type } = await req.json(); 

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return NextResponse.json({ error: "Event not found" }, { status: 404 });
        }

        event.interactions.push({ userId, type });
        await event.save();

        return NextResponse.json({ message: "Interaction logged successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error logging interaction" }, { status: 500 });
    }

}
