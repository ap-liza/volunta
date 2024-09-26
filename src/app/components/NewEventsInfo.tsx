/* eslint-disable @next/next/no-img-element */
'use client'; // Ensures the component is client-side

import Link from "next/link";
//import RemoveEvents from "./RemoveEvents";
//import { HiPencilAlt } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import toast from "react-hot-toast";
import axios from "axios";
import { FaCalendarAlt, FaMapMarkerAlt, FaUser, FaClock, FaBook, FaPhone } from 'react-icons/fa';
import EventDetailsModal from "./EventsDetailsModal";

interface EventType {
  _id: string;
  eventTitle: string;
  eventDescription: string;
  eventImage?: string;
  dateAndTime: string;
  location: string;
  volunteerRequirements: string;
  eventType: string;
  contact: string;
  deadline: string;
  organizerName: string;
  createdAt: string;
  // Add other fields if needed
}



// Client-side component to display events
export default function NewEventsInfo() {

    const [events, setEvents] = useState([]);

    //modal
    const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null); // Use EventType for selected event
    
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
    <div className="min-h-screen ">

   
        <div className=" grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
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
                        <div key={event._id} className=" ">

                            {/* Event Image */}

                          <div className="relative 
                            h-[250px] md:h-[270px]  w-full ">
                                <img
                                    src={event.eventImage || '/default-event-image.jpg'}
                                    alt="Event Image"
                                    className=" object-cover h-full w-full"
                                />
                          </div>

                              {/* Event Title */}
                          <div className=" pt-10">
                      
                      <h2 className="text-3xl font-bold text-gray-800 mb-2">
                        {event.eventTitle}
                      </h2>
                          </div>
                           
                         {/**Event description */}

                          <div className="border-b border-[#00332E] pt-4 pb-4">
                      <p className="text-gray-700 text-wrap">{event.eventDescription}</p>
                          </div>

                          {/**det */}
                          <div className="pt-6 flex flex-col text-gray-600  gap-2">
                            {/**Date */}
                            <div className="flex justify-start items-center gap-4">
                              <FaCalendarAlt className="" />
                              <span>{formattedDate}</span> 
                            </div>

                            {/**Time */}
                            <div className="flex justify-start items-center gap-4">
                              <FaClock className="" />
                              <span>{formattedTime}</span>
                            </div>

                            {/**Location */}
                            <div className="flex justify-start items-center gap-4">
                              <FaMapMarkerAlt className="" />
                              <span>{event.location}</span>
                            </div>

                            


                          
                          </div>

                        {/**View details button */}
                          <button  
                          className="text-gray-600 hover:text-blue-500 flex items-center mt-5"
                          onClick={() => setSelectedEvent(event)}
                          >
                          <span className="text-sm hover:border-b hover:border-blue-500 flex items-center">
                            View Details
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                          </button>

                


                    <div>
                  </div>
                  </div>


              );
            })
      ) : (
        <p className="text-center text-gray-500">No events available.</p>
      )}

        </div>
         {/* Modal */}
      {selectedEvent && (
        <div>
          <EventDetailsModal 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)} // Close the modal
        />
        </div>
        
      )}

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