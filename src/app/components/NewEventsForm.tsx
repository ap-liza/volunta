'use client'

export default function NewEventsForm(){
    return(
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">

            <h1 className="text-2xl font-bold mb-6 text-center">Create New Event</h1>

            <form>
        
                <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 text-sm font-semibold mb-2">Event Title</label>
                <input type="text" id="title" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#004D40]" placeholder="Enter event title"/>
                </div>

                <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 text-sm font-semibold mb-2">Event Title</label>
                <input type="text" id="title" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#004D40]" placeholder="Enter event title"/>
                </div>



                <div className="relative  bg-gray-100">
        <input
            type="email"
            
            
            id="floating_input"
            className="block px-4 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-transparent  border-b-4 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#004D40] peer"
            placeholder=" "
        />
        <label
            htmlFor="floating_input"
            className="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0]  px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
        >
            Email
        </label>
    </div>
            </form>
            
        </div>
    )
}