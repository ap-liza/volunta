/* eslint-disable @next/next/no-img-element */
'use client'; // Ensures the component is client-side

import Link from "next/link";
//import RemoveEvents from "./RemoveEvents";
//import { HiPencilAlt } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import toast from "react-hot-toast";
import axios from "axios";
import { FaCalendarAlt, FaMapMarkerAlt, FaUser, FaClock, FaBook, FaPhone } from 'react-icons/fa';



// Client-side component to display events
export default function NewEventsInfo() {

    const [events, setEvents] = useState([]);
    
     // Fetch events from the API when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/api/users/getevents');

        //sort events by their time created
        const sortedEvents = response.data.events.sort((a: any, b: any) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });

        
        setEvents(sortedEvents);
      } catch (error) {
        toast.error("Failed to fetch events. Please try again.");
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);
  
  return (
    <>
    <div className="min-h-screen bg-gray-100 py-8">

   
        <div className="max-w-7xl mx-auto space-y-6">
            {events.length > 0 ? (
                events.map((event: any) => {
                    // Create a Date object from dateAndTime
                    const eventDate = new Date(event.dateAndTime);
                    const formattedDate = eventDate.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
                    const formattedTime = eventDate.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    });

                    return (
                        <div key={event._id} className=" max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                            {/* Event Image */}
                            <div className="flex-none w-full md:w-1/2 h-64 ">
                                <img
                                    src={event.eventImage || '/default-event-image.jpg'}
                                    alt="Event Image"
                                    width={500}
                                    height={300}
                                    className=" object-cover"
                                />
                              </div>


                                {/* Event details */}
                    <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800">{event.eventTitle}</h2>
                  <p className="text-gray-600 mt-2">
                    <span className="font-medium">Date:</span> {formattedDate}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Time:</span> {formattedTime}
                  </p>
                  <p className="text-gray-600 mt-2">
                    <span className="font-medium">Location:</span> {event.location}
                  </p>

                  <p className="mt-4 text-gray-600">{event.eventDescription}</p>

                  <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                    Get Tickets
                  </button>
                            </div>

                          

                           
                        </div>
                    );
                })
      ) : (
        <p>No events available.</p>
      )}

    </div>

    </div>
      </>
    );
}


{/** 
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

*/} 