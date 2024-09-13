/* eslint-disable @next/next/no-img-element */
'use client'; // Ensures the component is client-side

import Link from "next/link";
import RemoveEvents from "./RemoveEvents";
import { HiPencilAlt } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import toast from "react-hot-toast";
import axios from "axios";



// Client-side component to display events
export default function NewEventsInfo() {

    const [events, setEvents] = useState([]);
    
     // Fetch events from the API when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/api/users/getevents');
        setEvents(response.data.events);
      } catch (error) {
        toast.error("Failed to fetch events. Please try again.");
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);
  
    return (
        <>
             {events.length > 0 ? (
        events.map((event: any) => (
          <div key={event._id} className="p-4 border border-[#004D40] my-3 flex justify-between items-start">
            <div>
              <img
                src={event.eventImage || '/default-event-image.jpg'} // Fallback if no image
                alt="event image"
                className="w-20 h-20"
              />
              <h2 className="text-lg font-bold">{event.eventTitle}</h2>
              <p className="text-sm">{event.eventDescription}</p>
              <p className="text-sm">Location: {event.location}</p>
              <p className="text-sm">Date and Time: {event.dateAndTime}</p>
              <p className="text-sm">Type: {event.eventType}</p>
              <p className="text-sm">Volunteer Requirements: {event.volunteerRequirements}</p>
              <p className="text-sm">Contact: {event.contact}</p>
              <p className="text-sm">Deadline: {event.deadline}</p>
              <p className="text-sm">Organizer: {event.organizerName}</p>
            </div>

            {/**
             * <div className="flex gap-2">
              <RemoveEvents  />
              <Link href={`/editEvents/${event._id}`}>
                <HiPencilAlt size={24} />
              </Link>
            </div> */}
            
          </div>
        ))
      ) : (
        <p>No events available.</p>
      )}
            
        </>
    );
}
