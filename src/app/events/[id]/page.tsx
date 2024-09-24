'use client'

import Link from 'next/link';
import DashboardLay from '../../components/Dashboardlay'
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import NewEventsInfo from '@/app/components/NewEventsInfo';
import { ClipLoader } from 'react-spinners';

 // Adjust path as needed
//import UserProfile from './UserProfile'
//import UserInfo from './UserInfo'

 

export default function EventsPage({ params }: { params: { id: string } }) {

//getting the user id to be able to highlight the link on the side bar
 const [userId, setUserId] = useState<string | null>(null);

 const [loading, setLoading] = useState(true); // Loading state of spinner

 //fetching user id
 useEffect(() => {
     const fetchUserId = async () => {
         try {
             const res = await axios.get('/api/users/user1');
             setUserId(res.data.data._id);
         } catch (error:any) {
             console.error('Failed to fetch user ID:', error.message);
             toast.error('failed to fetch user id')
         }finally {
            setLoading(false); // Stop loading once data is fetched
        }
     };

     fetchUserId(); 
 }, []);

    // Show loading spinner while fetching the user ID
    if (loading) {
        return (
            <DashboardLay>
                <div className="flex justify-center items-center min-h-screen">
                    <ClipLoader color="#36d7b7" size={150} /> {/* Loading spinner */}
                </div>
            </DashboardLay>
        );
    }

    return (
        <DashboardLay>
            <div className='flex justify-between'>
                <h1 className='font-semibold text-xl'>
                    Upcoming Events
                </h1>

                <Link 
                href={`/newevents/${userId}`}
                className='font-semibold'
                >

                    Post New Event
                </Link>
            </div>

            <NewEventsInfo/>
           
             {/* Render NewEventsInfo only after loading is complete */}
            
           
            
            
            
        </DashboardLay>
    );
}
