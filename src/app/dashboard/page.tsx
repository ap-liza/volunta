/* eslint-disable @next/next/no-img-element */
'use client'
import React from 'react';
import Dashboardlay from '../components/Dashboardlay';

export default function DashboardPage() {
  return (
    <Dashboardlay>
    <>
      <h2>Dashboard</h2>
  <div className="min-h-screen bg-gray-100 py-8">

  <div className="max-w-7xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2">
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Event Image */}
      <div className="relative h-64">
        <img 
          src="/event.jpg" // Placeholder image, replace with your image path
          alt="Event Image"
        />
        {/* Overlaying text on the image */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4 text-white">
          <h2 className="text-2xl font-semibold">Event Title</h2>
        </div>
      </div>

      {/* Middle Section: Date and Location */}
      <div className="p-6 bg-gray-100">
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Date:</span> Oct 30, 2024
        </p>
        <p className="text-sm text-gray-600 mt-1">
          <span className="font-semibold">Time:</span> 7:00 PM - 9:00 PM
        </p>
        <div className="mt-3 text-sm text-gray-600 flex items-center">
          <svg className="w-5 h-5 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          Event Location
        </div>
      </div>

      {/* Bottom Section: Description and Call to Action */}
      <div className="p-6 bg-gray-800 text-white">
        <p className="text-sm">
          Join us for an amazing event with live performances, keynote speakers, and more. This event is perfect for networking, learning, and entertainment.
        </p>

        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
          Get Tickets
        </button>
      </div>
    </div>

    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Event Image */}
      <div className="relative h-64">
        <img 
          src="/event.jpg" // Placeholder image, replace with your image path
          alt="Event Image"
          
        />
        {/* Overlaying text on the image */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4 text-white">
          <h2 className="text-2xl font-semibold">Event Title</h2>
        </div>
      </div>

      {/* Middle Section: Date and Location */}
      <div className="p-6 bg-gray-100">
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Date:</span> Oct 30, 2024
        </p>
        <p className="text-sm text-gray-600 mt-1">
          <span className="font-semibold">Time:</span> 7:00 PM - 9:00 PM
        </p>
        <div className="mt-3 text-sm text-gray-600 flex items-center">
          <svg className="w-5 h-5 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          Event Location
        </div>
      </div>

      {/* Bottom Section: Description and Call to Action */}
      <div className="p-6 bg-gray-800 text-white">
        <p className="text-sm">
          Join us for an amazing event with live performances, keynote speakers, and more. This event is perfect for networking, learning, and entertainment.
        </p>

        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
          Get Tickets
        </button>
      </div>
    </div>
</div>
</div>


     </>

    </Dashboardlay>
  );
}
