'use client'

import Link from 'next/link';
import DashboardLay from '../../components/Dashboardlay'
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

 // Adjust path as needed
//import UserProfile from './UserProfile'
//import UserInfo from './UserInfo'

 

export default function EventsPage({ params }: { params: { id: string } }) {

//getting the user id to be able to highlight the link on the side bar
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

    return (
        <DashboardLay>
            <h1 className='font-semibold text-xl'>
                General Events
            </h1>

            <Link href={`/newevents/${userId}`} >
                Post New Event
            </Link>
            
            
            
        </DashboardLay>
    );
}
