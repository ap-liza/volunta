'use client'
import Link from "next/link"
import RemoveEvents from "./RemoveEvents"
import {HiPencilAlt} from 'react-icons/hi'

export default function NewEventsInfo() {
    return(
        <div className="p-4 border border-[#004D40] my-3 flex justify-between items-start  ">
            <div>
                <h2>Events Title</h2>
                <h2> Event Description</h2>
                <h2>location</h2>
                <h2>Date and Time</h2>
                <h2>Event Type</h2>
                <h2>Volunteer requirements</h2>
                <h2> Contact Information</h2>
                <h2>Image</h2>
                <h2>Registration Deadline</h2>
                <h2>Organizer name</h2>
            </div>


            <div className="flex gap-2">
                <RemoveEvents/>
                <Link href={'/editEvents/123'}>
                    <HiPencilAlt size={24}/>
                </Link>
            </div>
            
           
            
            
            
            
           
           
            
            
        </div>
    )
}