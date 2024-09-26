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


  <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-md shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Account Settings</h1>

                {/* Profile Image Section */}
                <div className="flex items-center gap-6 mb-8">
                    <div className="relative w-[100px] h-[100px]">
                        <img
                            src="/profile-default.png" // Placeholder profile image
                            alt="Profile"
                            className="rounded-full object-cover w-full h-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="profilePicture" className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md">
                            Upload New Image
                        </label>
                        <input
                            type="file"
                            id="profilePicture"
                            className="hidden"
                        />
                    </div>
                </div>

                {/* User Details */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold">Personal Information</h2>
                    <div className="mt-4">
                        <div className="flex flex-col md:flex-row md:gap-8 mb-4">
                            <div className="w-full">
                                <label className="block text-gray-600">Name</label>
                                <input
                                    type="text"
                                    value="John Doe"
                                    disabled
                                    className="mt-2 w-full p-3 border rounded-md bg-gray-200 text-gray-500"
                                />
                            </div>
                            <div className="w-full">
                                <label className="block text-gray-600">Email</label>
                                <input
                                    type="email"
                                    value="johndoe@example.com"
                                    disabled
                                    className="mt-2 w-full p-3 border rounded-md bg-gray-200 text-gray-500"
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-600">Contact Number</label>
                            <input
                                type="text"
                                placeholder="Enter your contact number"
                                className="mt-2 w-full p-3 border rounded-md bg-white"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-600">Bio</label>
                            <textarea
                                placeholder="Tell us about yourself..."
                                className="mt-2 w-full p-3 border rounded-md bg-white"
                            />
                        </div>
                    </div>
                </div>

                {/* Skills Section */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold">Skills</h2>
                    <div className="mt-4">
                        <ul className="flex flex-wrap gap-2">
                            <li className="bg-gray-200 px-3 py-1 rounded-full text-sm">JavaScript</li>
                            <li className="bg-gray-200 px-3 py-1 rounded-full text-sm">React</li>
                            <li className="bg-gray-200 px-3 py-1 rounded-full text-sm">Node.js</li>
                        </ul>

                        <div className="mt-4">
                            <input
                                type="text"
                                placeholder="Add a new skill"
                                className="p-2 border rounded-md w-full mb-2"
                            />
                            <button className="bg-green-500 text-white px-4 py-2 rounded-md">
                                Add Skill
                            </button>
                        </div>
                    </div>
                </div>

                {/* Edit/Save Buttons */}
                <div className="flex gap-4">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                        Edit Profile
                    </button>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-md">
                        Save Changes
                    </button>
                </div>
            </div>
  </div>

  <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-md shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Account Information</h1>

                {/* Profile Image Section */}
                <div className="flex items-center gap-6 mb-8">
                    <div className="relative w-[120px] h-[120px]">
                        <img
                            src="/profile-default.png" // Placeholder profile image
                            alt="Profile"
                            className="rounded-full object-cover w-full h-full"
                        />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold">John Doe</h2>
                        <p className="text-gray-600">johndoe@example.com</p>
                    </div>
                </div>

                {/* User Details */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-700">Personal Information</h2>
                    <div className="mt-4 space-y-4">
                        <div className="flex flex-col md:flex-row md:gap-8">
                            <div className="w-full">
                                <label className="block text-gray-600">Name</label>
                                <p className="mt-1 text-lg text-gray-900">John Doe</p>
                            </div>
                            <div className="w-full">
                                <label className="block text-gray-600">Email</label>
                                <p className="mt-1 text-lg text-gray-900">johndoe@example.com</p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-600">Contact Number</label>
                            <p className="mt-1 text-lg text-gray-900">+1 234 567 890</p>
                        </div>

                        <div>
                            <label className="block text-gray-600">Bio</label>
                            <p className="mt-1 text-lg text-gray-900">Software developer with a passion for building web applications and solving real-world problems.</p>
                        </div>
                    </div>
                </div>

                {/* Skills Section */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-700">Skills</h2>
                    <div className="mt-4">
                        <ul className="flex flex-wrap gap-2">
                            <li className="bg-gray-200 px-3 py-1 rounded-full text-sm">JavaScript</li>
                            <li className="bg-gray-200 px-3 py-1 rounded-full text-sm">React</li>
                            <li className="bg-gray-200 px-3 py-1 rounded-full text-sm">Node.js</li>
                            {/* Add more skills as needed */}
                        </ul>
                    </div>
                </div>

                {/* Edit Button */}
                <div className="flex justify-end">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>



     </>

    </Dashboardlay>
  );
}
