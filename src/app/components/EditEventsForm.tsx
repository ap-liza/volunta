/* eslint-disable @next/next/no-img-element */
'use client';
import axios from 'axios';
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';


interface EventFormData {
    eventTitle: string;
    eventDescription: string;
    location: string;
    dateAndTime: string;
    eventType: string;
    volunteerRequirements: string;
    contact: string;
    deadline: string;
    organizerName: string;
    eventImage: File | null;
    questions:string[]
}

interface EditEventFormProps {
    event: {
        _id: string;
        eventTitle: string;
        eventDescription: string;
        location: string;
        dateAndTime: string;
        eventType: string;
        volunteerRequirements: string;
        contact: string;
        deadline: string;
        organizerName: string;
        eventImage: string;
        questions: string[]
    };
}


export default function EditEventsForm({ event }: EditEventFormProps) {

    const router = useRouter();
    
    const [formData, setFormData] = useState<EventFormData>({
        eventTitle: event.eventTitle,
        eventDescription: event.eventDescription,
        location: event.location,
        dateAndTime: event.dateAndTime,
        eventType: event.eventType,
        volunteerRequirements: event.volunteerRequirements,
        contact: event.contact,
        deadline: event.deadline,
        organizerName: event.organizerName,
        eventImage: null,
        questions: []
    });

    const [existingImageUrl, setExistingImageUrl] = useState<string>(event.eventImage);

//state for when the update event button is clicked
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState<string[]>([]);

    // Load initial questions from the event prop
    useEffect(() => {
        if (event.questions && event.questions.length > 0) {
            setQuestions(event.questions);
            setFormData((prevData) => ({ ...prevData, questions: event.questions }));
        }

        console.log(event.questions)
    }, [event]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, files } = e.target as HTMLInputElement;
        setFormData((prevData) => ({
            ...prevData,
        //[name]: files ? files[0] : value
            [name]: files && files.length > 0 ? files[0] : value
        }));
    };


//getting the user id
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




 

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = new FormData();

            for (const key in formData) {
                if (formData.hasOwnProperty(key)) {
                    const value = formData[key as keyof EventFormData];

                    if (value === '' || value === null) {
                        // Use existing values if form field is empty
                        data.append(key, event[key as keyof EventFormData] as string);
                    } else {
                        data.append(key, value as string | Blob);
                    }
                }
            }

            if (formData.eventImage === null && existingImageUrl) {
                data.append('eventImage', existingImageUrl);
            }

            // Append questions to the FormData
            formData.questions.forEach((question, index) => {
            data.append(`questions[${index}]`, question);
            });


            await axios.put(`/api/users/editevents/${event._id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            toast.success('Event updated successfully!');
            router.push(`/activity/${userId}`)
        } catch (error) {
            console.error('Error updating event:', error);
            toast.error('Failed to update event.');
        }finally {
            setLoading(false); 
        }
    };


    return (
        <div className="mx-auto p-6 rounded-lg">
            <h1 className="text-2xl font-bold mb-6 text-center">Edit Event Information</h1>

            <form onSubmit={handleSubmit} >

                {/**Event Title */}
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 text-sm font-semibold mb-2">
                        Event Title
                    </label>
                    <input 
                        name="eventTitle"
                        value={formData.eventTitle}
                        onChange={handleChange}
                        type="text"
                        id="title"
                        className="w-full px-3 py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#004D40]"
                    />
                </div>

                {/**Event Description */}
                <div className="mb-4">

                    <label htmlFor="description" className="block text-gray-700 text-sm font-semibold mb-2">
                        Event Description
                    </label>

                    <textarea 
                        name="eventDescription"
                        value={formData.eventDescription}
                        onChange={handleChange}
                        id="description"
                        className="w-full px-3 py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#004D40]"
                    />
                </div>

                {/**Event location */}
                <div className="mb-4">
                    <label htmlFor="location" className="block text-gray-700 text-sm font-semibold mb-2">
                        Location
                    </label>
                    <input 
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        type="text"
                        id="location"
                        className="w-full px-3 py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#004D40]"
                    />
                </div>

                {/**Date and Time */}
                <div className="mb-4">
                    <label htmlFor="date" className="block text-gray-700 text-sm font-semibold mb-2">
                        Date and Time
                    </label>
                    <input 
                        name="dateAndTime"
                        value={formData.dateAndTime}
                        onChange={handleChange}
                        type="datetime-local"
                        id="date"
                        className="w-full px-3 py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#004D40]"
                    />
                </div>

                {/**Event Type */}
                <div className="mb-4">
                    <label htmlFor="eventType" className="block text-gray-700 text-sm font-semibold mb-2">
                        Event Type
                    </label>
                    <input 
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleChange}
                        type="text"
                        id="eventType"
                        className="w-full px-3 py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#004D40]"
                    />
                </div>

                {/**volunteer requirements*/}
                <div className="mb-4">
                    <label htmlFor="requirements" className="block text-gray-700 text-sm font-semibold mb-2">
                        Volunteer Requirements
                    </label>

                    <textarea 
                        name='volunteerRequirements'
                        value={formData.volunteerRequirements}
                        onChange={handleChange}
                        id="requirements"
                        className="w-full px-3 py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#004D40]"
                    />
                </div>

                {/**contact */}
                <div className="mb-4">
                    <label htmlFor="contact" className="block text-gray-700 text-sm font-semibold mb-2">
                        Contact Information
                    </label>
                    <input 
                        name = 'contact'
                        value={formData.contact}
                        onChange={handleChange}
                        type="text"
                        id="contact"
                        className="w-full px-3 py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#004D40]"
                    />
                </div>

            {/* Display Existing Event Image */}
            {existingImageUrl && (
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Current Event Image</label>
                        <img src={existingImageUrl} alt="Current Event" className="w-32 h-32 object-cover mb-2" />
                    </div>
                )}


                {/**Event image */}  

                <div className="mb-4">

                    <label htmlFor="image" className="block text-gray-700 text-sm font-semibold mb-2">
                    Upload New Event Image (Optional)
                    </label>

                    <input 
                        name="eventImage"
                        onChange={handleChange}
                        type="file"
                        id="image"
                        className="w-full px-3 py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#004D40]"
                    />
                    
                   
                </div>


                {/**Event deadline */}
                <div className="mb-4">
                    <label htmlFor="deadline" className="block text-gray-700 text-sm font-semibold mb-2">
                        Registration Deadline
                    </label>
                    <input 
                        name='deadline'
                        value={formData.deadline}
                        onChange={handleChange}
                        type="date"
                        id="deadline"
                        className="w-full px-3 py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#004D40]"
                    />
                </div>

                {/**organizerName problem commenting it out for now*/}

                <div className="mb-4">
                <label htmlFor="organizerName" className="block text-gray-700 text-sm font-semibold mb-2">
                        Organizer Name
                    </label>
                    <input 
                        name="organizerName"
                        value={formData.organizerName}
                        onChange={handleChange}
                        type="text"
                        id="organizerName"
                        className="w-full px-3 py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#004D40]"
                    />
                </div>

               
                {/**questions */}
                {questions.map((question, index) => (
                    <div key={index} className="mb-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            Question {index + 1}
                        </label>
                        <input
                            type="text"
                            value={question}
                            onChange={(e) => {
                                const updatedQuestions = [...questions];
                                updatedQuestions[index] = e.target.value;
                                setQuestions(updatedQuestions);
                                setFormData((prev) => ({ ...prev, questions: updatedQuestions }));
                            }}
                            className="w-full px-3 py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#004D40]"
                        />
                    </div>
                ))}


               {/**submit button */}
                <div className="flex justify-center mt-6">
                    <button 
                        type="submit"
                        disabled={loading}
                        className={`px-6 py-3 ${loading ? 'bg-gray-400 cursor-not-allowed hover:bg-gray-400' : 'bg-[#FF6F61]'} text-white font-semibold rounded-md shadow hover:bg-[#C7A500] transition duration-300`}
                        
                    >
                       Update Event
                    </button>
                </div>
                
               
            </form>
        </div>
    );
}

                    