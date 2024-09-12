import { connect } from "@/databaseConfig/dbConfig";
import Event from '@/models/eventModels';
import { NextResponse } from 'next/server';

connect();

export async function GET() {
    try {
      // Fetch all events data from the database

      const events = await Event.find();

      return NextResponse.json(
        { events }, 
        { status: 200 }
    );

    } catch (error: any) 
    {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }