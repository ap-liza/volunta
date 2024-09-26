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
      <div className="bg-white p-[50px] rounded-lg w-full max-w-2xl relative">
        {/* Close Button */}
        <button 
          className="absolute mb-10 top-4 right-4 text-[#FF6F61] hover:text-[#C7A500]" 
          onClick={onClose}
        >
          <FaTimes size={30} />
        </button>

{/**Modal content */}
        {/* Event Image */}

    <div className="max-h-[80vh] overflow-y-scroll p-4">
    
        <img 
          src={event.eventImage || '/default-event-image.jpg'} 
          alt="Event Image" 
          className="w-full h-64 object-cover rounded-lg"
        />

        {/* Event Title */}
        <h2 className="text-2xl font-bold text-gray-800 mt-4">
          {event.eventTitle}
        </h2>

        {/* Event Description */}
        <p className="text-gray-600 mt-2">{event.eventDescription}</p>

        {/* Event Details */}
        <div className="mt-4 flex flex-col gap-2 text-gray-600">
          <div className="flex items-center gap-2">
            <FaCalendarAlt />
            <span>{new Date(event.dateAndTime).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaClock />
            <span>{new Date(event.dateAndTime).toLocaleTimeString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt />
            <span>{event.location}</span>
          </div>
          <p>{event.organizerName}</p>
          <p>{event.volunteerRequirements}</p>
          <p>{event.contact}</p>
          <p>{event.eventType}</p>
          <p>{event.deadline}</p>
        </div>
        <button>register</button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal;
