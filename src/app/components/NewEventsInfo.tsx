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
                        <div key={event._id} className=" bg-white shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-105 duration-300">

                            {/* Event Image */}

                            <div className="relative 
                            h-[275px] md:h-[290px]  w-full ">
                                <img
                                    src={event.eventImage || '/default-event-image.jpg'}
                                    alt="Event Image"
                                    className=" object-cover h-full w-full"
                                />

                                <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black via-transparent to-transparent w-full h-24"></div>
                              </div>


                                {/* Event details */}
                    <div className="p-6">
                      
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        {event.eventTitle}
                      </h2>

                      <div className="flex items-center text-gray-600 space-x-4 mb-4" >

                      {/**date */}
                      <div className="flex items-center">
                        <FaCalendarAlt className="mr-2" />
                        <span>{formattedDate}</span>
                      </div>

                      {/**time */}
                      <div className="flex items-center">
                        <FaClock className="mr-2" />
                        <span>{formattedTime}</span>
                      </div>

                      {/**location */}
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="mr-2" />
                        <span>{event.location}</span>
                      </div>

                    </div>

                      {/**Event description */}
                    <p className="text-gray-700 mb-6">{event.eventDescription}</p>

                    <div className="flex justify-between items-center">

                    <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                      Register
                    </button>
                    <Link href={`/events/${event._id}`} passHref 
                    className="text-blue-500 hover:underline"
                    >
                      View Details
                    </Link>
                    </div>
                  </div>
                </div>


              );
            })
      ) : (
        <p className="text-center text-gray-500">No events available.</p>
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
              <p className="text-sm">Volunteer Requirements: {event.volunteerRequirements}</p>~
              <p className="text-sm">Contact: {event.contact}</p>
              <p className="text-sm">Deadline: {event.deadline}</p>
              <p className="text-sm">Organizer: {event.organizerName}</p>
            </div>

*/} 