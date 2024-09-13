import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/databaseConfig/dbConfig';
import Event from '@/models/eventModels';

connect();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    if (typeof id !== 'string') {
        return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 });
    }

    try {
        console.log("Fetching events for userId:", id);

        const events = await Event.find({ userId: id }).exec();

        console.log("Fetched events:", events); 

        return NextResponse.json({ events });
    } catch (error) {
        console.error("Error fetching events:", error);
        if (error instanceof Error) {
            return NextResponse.json({ message: 'Error fetching events', error: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ message: 'Unknown error occurred' }, { status: 500 });
        }
    }
}
