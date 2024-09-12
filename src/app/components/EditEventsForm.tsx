'use client'

export default function EditEventsForm(){
    return(
        <div className="mx-auto p-6  rounded-lg ">

            <h1 className="text-2xl font-bold mb-6 text-center">Edit Event Information</h1>

            <form>
        {/**event title */}
            <div className="mb-4">

                <label htmlFor="title" className="block text-gray-700 text-sm font-semibold mb-2">
                    Event Title
                </label>

                <input 
                type="text"
                id="title" 
                className="w-full px-3 py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#004D40]" placeholder="Enter event title"/>

            </div>

          {/**event description */}
            <div className="mb-4">

                <label htmlFor="title" className="block text-gray-700 text-sm font-semibold mb-2">
                    Event Description
                </label>

                <textarea  
                id="description" 
                className="w-full px-3 py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#004D40]" 
                placeholder="Enter event description"/>
            </div>

        {/**Location */}

            <div className="mb-4">

                <label 
                htmlFor="location" 
                className="block text-gray-700 text-sm font-semibold mb-2">
                    Location
                </label>

                <input 
                type="text"
                id="location" 
                className="w-full px-3 py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#004D40]" 
                placeholder="Enter location"/>

            </div>

        {/**Date and time */}

            <div className="mb-4">
                <label htmlFor="date" 
                className="block text-gray-700 text-sm font-semibold mb-2">
                    Date and Time
                </label>

                <input type="datetime-local" id="date" className="w-full px-3 py-4 border  rounded-md focus:outline-none focus:ring-2 focus:ring-[#004D40]"/>

            </div>

        {/**Event type*/}
            <div className="mb-4">
                <label htmlFor="event-type" className="block text-gray-700 text-sm font-semibold mb-2">
                    Event Type
                </label>

                <select id="event-type"
                className="w-full px-3 py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#004D40]">
                <option value="">Select event type</option>
                <option value="online">Online</option>
                <option value="in-person">In-Person</option>
                </select>
            </div>

            {/**Volunteer Requirements */}
            <div className="mb-4">
                <label htmlFor="requirements"
                className="block text-gray-700 text-sm font-semibold mb-2">
                    Volunteer Requirements
                </label>

                <textarea 
                id="requirements" 
                className="w-full px-3 py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#004D40]" 
                placeholder="Enter volunteer requirements"></textarea>
            </div>

            {/**Contact information */}
            <div className="mb-4">
                <label htmlFor="contact" 
                className="block text-gray-700 text-sm font-semibold mb-2">
                    Contact Information
                </label>

                <input 
                type="text" 
                id="contact" 
                className="w-full px-3 py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#004D40]" 
                placeholder="Enter contact information"/>
            </div>

            {/**Image upload */}

            <div className="mb-4">
                <label htmlFor="image" 
                className="block text-gray-700 text-sm font-semibold mb-2">
                    Event Image
                </label>

                <input 
                type="file" 
                id="image" 
                className="w-full px-3 py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#004D40]"/>
            </div>

        {/**Registration deadline */}

            <div className="mb-4">

                <label htmlFor="deadline" 
                className="block text-gray-700 text-sm font-semibold mb-2">
                    Registration Deadline
                </label>

                <input 
                type="date" 
                id="deadline" 
                className="w-full px-3 py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#004D40]"/>
                
            </div>
        
        {/**Organizer */}
            <div className="mb-4">

                <label 
                htmlFor="organizer" 
                className="block text-gray-700 text-sm font-semibold mb-2">
                    Organizer Name
                </label>

                <input 
                type="text" 
                id="organizer" 
                className="w-full px-3 py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#004D40]" 
                placeholder="Enter organizer name"/>

            </div>

        {/**Submit button */}
            <div className="flex justify-center mt-6">

                <button 
                type="submit" 
                className="px-6 py-3 bg-[#FF6F61] text-white font-semibold rounded-md shadow hover:bg-[#C7A500] transition duration-300">
                    Update Event
                </button>
            </div>  
        </form>
            
        </div>
    )
}