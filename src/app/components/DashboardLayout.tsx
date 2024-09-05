"use client";
import { ReactNode } from 'react';
import axios from "axios"

import toast from "react-hot-toast"

import { useEffect, useState } from "react"

//making a common layout for the dashboard
interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  

  const [user, setUser] = useState('')
  const [userName, setUserName] = useState('')
  const getUserDetails = async () =>{
    const res = await axios.get('/api/users/user1')
    console.log(res.data);
    setUser(res.data.data._id)
}

const getUserName = async () => {
    try {
        const res = await axios.get('/api/users/user1')
        console.log(res.data)
        const { _id,  firstName} = res.data.data
        setUserName(res.data.data.firstName)
    } catch (error: any) {
        console.error('Failed to fetch user details:', error.message)
        toast.error('Failed to load user details')
    }
}

useEffect(() => {
    getUserName() // Fetch user details on component mount
}, [])

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <div className="p-4 text-center text-xl font-bold">Volunteer App</div>
        <ul className="mt-8">
          <li className="p-4 hover:bg-gray-700">Home</li>
          <li className="p-4 hover:bg-gray-700">Volunteer Opportunities</li>
          <li className="p-4 hover:bg-gray-700">My Profile</li>
          <li className="p-4 hover:bg-gray-700">Notifications</li>
          <li className="p-4 hover:bg-gray-700">Logout</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-8">
        {/* Navbar */}
        <div className="flex justify-between items-center bg-white p-4 shadow">
          <div className="text-xl font-bold">Welcome Back  <h1>{userName}</h1></div>

          {/* Search Bar */}
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 border rounded focus:outline-none"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Search
            </button>
          </div>

          {/* Profile */}
          <div className="flex items-center">
            <img
              src="profile-pic.jpg"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <span className="ml-4 font-medium">Users Name</span>
          </div>
        </div>

        {/* Content */}
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}
