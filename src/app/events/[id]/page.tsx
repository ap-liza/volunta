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
            <div className='flex justify-between items-end'>
                <h1 className='font-semibold text-xl text-[#00332E]'>
                    Upcoming Events
                </h1>

                <button className='text-[#00332E] hover:underline'>
                    Recommended For You
                </button>

               
{/**Initially used to create new events so will be commented out
                <Link 
                href={`/newevents/${userId}`}
                className='hidden  items-center justify-center bg-gradient-to-r from-[#FF9F8B] to-[#FF6F61] text-white rounded-full w-10 h-10 shadow-lg transition duration-200 hover:from-[#D1B500] hover:to-[#C7A500]'
                >
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    
                </Link>
 */}
            </div>

            <NewEventsInfo/>
           
             {/* Render NewEventsInfo only after loading is complete */}
            
           
            
            
            
        </DashboardLay>
    );
}
