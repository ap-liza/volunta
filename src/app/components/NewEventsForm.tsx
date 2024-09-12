'use client'

import axios from "axios"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function NewEventsForm() {

//getting the user id to navigate back to the events page
 const [userId, setUserId] = useState<string | null>(null);

 useEffect(() => {
     const fetchUserId = async () => {
         try {
             const res = await axios.get('/api/users/user1');
             setUserId(res.data.data._id);
         } catch (error:any) {
             console.error('Failed to fetch user ID:', error.message);
             toast.error('failed to fetch user id')
         }
     };

     fetchUserId();
 }, []);
 
  const [event, setEvent] = useState({
    eventTitle: '',
    eventDescription: '',
    location: '',
    dateAndTime: '',
    eventType: '',
    volunteerRequirements: '',
    eventImage: '' as File | string,
    contact: '',
    deadline: '',
    organizerName: ''
  })

  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]
    if (file) {
      setEvent({ ...event, eventImage: file })
    }
  }

  const postEvent = async (e: React.FormEvent) => {
    e.preventDefault()
    if (loading) return
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('eventTitle', event.eventTitle)
      formData.append('eventDescription', event.eventDescription)
      formData.append('location', event.location)
      formData.append('dateAndTime', event.dateAndTime)
      formData.append('eventType', event.eventType)
      formData.append('volunteerRequirements', event.volunteerRequirements)
      formData.append('eventImage', event.eventImage as Blob) // Ensure eventImage is added as a Blob
      formData.append('contact', event.contact)
      formData.append('deadline', event.deadline)
      formData.append('organizerName', event.organizerName)

      const response = await axios.post('/api/users/addevents/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      toast.success('Your event has been posted')
      router.push(`/events/${userId}`)
    } catch (error: any) {
      toast.error('Failed to post the event. Please try again.')
      console.log('Error posting event:', error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto p-6 rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Create New Event</h1>

      <form onSubmit={postEvent}>
        {/* Event Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-semibold mb-2">
            Event Title
          </label>
          <input
            type="text"
            value={event.eventTitle}
            onChange={(e) => setEvent({ ...event, eventTitle: e.target.value })}
            id="title"
            className="w-full px-3 py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#004D40]"
            placeholder="Enter event title"
          />
        </div>

        {/* Event Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 text-sm font-semibold mb-2">
            Event Description
          </label>
          <textarea
            value={event.eventDescription}
            onChange={(e) => setEvent({ ...event, eventDescription: e.target.value })}
            id="description"
            className="w-full px-3 py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#004D40]"
            placeholder="Enter event description"
          />
        </div>

        {/* Location */}
        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-700 text-sm font-semibold mb-2">
            Location
          </label>
          <input
            type="text"
            value={event.location}
            onChange={(e) => setEvent({ ...event, location: e.target.value })}
            id="location"
            className="w-full px-3 py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#004D40]"
            placeholder="Enter event location"
          />
        </div>

        {/* Date and Time */}
        <div className="mb-4">
          <label htmlFor="dateAndTime" className="block text-gray-700 text-sm font-semibold mb-2">
            Date and Time
          </label>
          <input
            type="datetime-local"
            value={event.dateAndTime}
            onChange={(e) => setEvent({ ...event, dateAndTime: e.target.value })}
            id="dateAndTime"
            className="w-full px-3 py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#004D40]"
          />
        </div>

        {/* Event Type */}
        <div className="mb-4">
          <label htmlFor="eventType" className="block text-gray-700 text-sm font-semibold mb-2">
            Event Type
          </label>
          <input
            type="text"
            value={event.eventType}
            onChange={(e) => setEvent({ ...event, eventType: e.target.value })}
            id="eventType"
            className="w-full px-3 py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#004D40]"
            placeholder="Enter event type (e.g., Online, In-person)"
          />
        </div>

        {/* Volunteer Requirements */}
        <div className="mb-4">
          <label htmlFor="volunteerRequirements" className="block text-gray-700 text-sm font-semibold mb-2">
            Volunteer Requirements
          </label>
          <textarea
            value={event.volunteerRequirements}
            onChange={(e) => setEvent({ ...event, volunteerRequirements: e.target.value })}
            id="volunteerRequirements"
            className="w-full px-3 py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#004D40]"
            placeholder="Enter volunteer requirements"
          />
        </div>

        {/* Event Image */}
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 text-sm font-semibold mb-2">
            Event Image
          </label>
          <input
            type="file"
            id="image"
            onChange={handleFileChange}
            className="w-full px-3 py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#004D40]"
          />
        </div>

        {/* Contact Information */}
        <div className="mb-4">
          <label htmlFor="contact" className="block text-gray-700 text-sm font-semibold mb-2">
            Contact Information
          </label>
          <input
            type="text"
            value={event.contact}
            onChange={(e) => setEvent({ ...event, contact: e.target.value })}
            id="contact"
            className="w-full px-3 py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#004D40]"
            placeholder="Enter contact information"
          />
        </div>

        {/* Deadline */}
        <div className="mb-4">
          <label htmlFor="deadline" className="block text-gray-700 text-sm font-semibold mb-2">
            Application Deadline
          </label>
          <input
            type="date"
            value={event.deadline}
            onChange={(e) => setEvent({ ...event, deadline: e.target.value })}
            id="deadline"
            className="w-full px-3 py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#004D40]"
          />
        </div>

        {/* Organizer Name */}
        <div className="mb-4">
          <label htmlFor="organizerName" className="block text-gray-700 text-sm font-semibold mb-2">
            Organizer Name
          </label>
          <input
            type="text"
            value={event.organizerName}
            onChange={(e) => setEvent({ ...event, organizerName: e.target.value })}
            id="organizerName"
            className="w-full px-3 py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#004D40]"
            placeholder="Enter organizer name"
          />
        </div>

        {/* Submit button */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="px-6 py-3 bg-[#FF6F61] text-white font-semibold rounded-md shadow hover:bg-[#C7A500] transition duration-300"
            disabled={loading}
          >
            {loading ? 'Posting...' : 'Post Event'}
          </button>
        </div>
      </form>
    </div>
  )
}
