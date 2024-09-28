/* eslint-disable @next/next/no-img-element */
import { FaTimes, FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

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
  
interface EventDetailsModalProps {
  event: EventType | null; // The event can be null when no event is selected
  onClose: () => void; // Function to close the modal
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ event, onClose }) => {
  if (!event) return null; // Do not render if no event is selected

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-[50px] rounded-lg w-full max-w-md md:max-w-2xl  relative">
        {/* Close Button */}

        <p className='text-center'>DETAILS</p>
        <button 
          className="absolute mb-10 top-4 right-4 text-[#FF6F61] hover:text-[#C7A500]" 
          onClick={onClose}
        >
          <FaTimes size={30} />
        </button>

{/**Modal content */}
        {/* Event Image */}

    <div className="max-h-[75vh] overflow-y-scroll p-4">
    
        <img 
          src={event.eventImage || '/default-event-image.jpg'} 
          alt="Event Image" 
          className="w-full h-full object-cover rounded-lg"
        />

        {/* Event Title */}
        <h2 className="text-2xl font-bold text-gray-800 mt-4">
          {event.eventTitle}
        </h2>

        {/* Event Description */}
        <div className='flex mt-4 gap-4 text-gray-600'>
            <h2 className='font-bold '>Event Description: </h2>
            <p className="text-gray-600">{event.eventDescription}</p>
        </div>
        

        {/* Event Details */}
        <div className="mt-2 flex flex-col gap-2 text-gray-600">

        <div className="flex items-center gap-2">
            <h2 className='font-bold'>Event Type: </h2>
            <span>{event.eventType}</span>
          </div>

          <div className="flex items-center gap-2">
            {/**<FaCalendarAlt /> */}
            <h2 className='font-bold'>Date: </h2>
            <span>{new Date(event.dateAndTime).toLocaleDateString()}</span>
          </div>

          <div className="flex items-center gap-2">
            {/** <FaClock /> */}
            <h2 className='font-bold'>Time: </h2>
            <span>{new Date(event.dateAndTime).toLocaleTimeString()}</span>
          </div>

          <div className="flex items-center gap-2">
            {/** <FaMapMarkerAlt />*/}
            <h2 className='font-bold'>Location: </h2>
            <span>{event.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <h2 className='font-bold'>Requirements: </h2>
            <span>{event.volunteerRequirements}</span>
          </div>

          <div className="flex items-center gap-2">
            <h2 className='font-bold'>Organizer: </h2>
            <span>{event.organizerName}</span>
          </div>

          <div className="flex items-center gap-2">
            <h2 className='font-bold'>Deadline for Registration: </h2>
            <span>{event.deadline}</span>
          </div>

          <div className="flex items-center gap-2">
            <h2 className='font-bold'>Contact Organizer: </h2>
            <span>{event.contact}</span>
          </div>

        </div>
        {/**to registration page */}
        <button
          className=" bg-[#FF6F61] hover:bg-[#C7A500] text-white mt-4 py-2 px-4 rounded-full" 
        >
            Register
        </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal;
