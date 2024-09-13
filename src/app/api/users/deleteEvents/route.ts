import { connect } from "@/databaseConfig/dbConfig";
import Event from '@/models/eventModels';
import { NextRequest, NextResponse } from "next/server";

connect()

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
      
      // Extract event ID from the params
      const eventId = params.id;
  
      // Find and delete the event by ID
      const deletedEvent = await Event.findByIdAndDelete(eventId);
  
      // Check if the event was found and deleted
      if (!deletedEvent) {
        return NextResponse.json({ error: "Event not found" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Event deleted successfully", event: deletedEvent }, { status: 200 });
    } catch (error) {
      console.error("Error deleting event:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }