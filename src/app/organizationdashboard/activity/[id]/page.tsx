'use client'

import OrganizationDashboardLay from '../../../components/OrganizationDashboardLay'

import ActivityEventsInfo from '@/app/components/organization/ActivityEventsInfo';
import { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';

export default function ActivityPage({ params }: { params: { id: string } }) {

    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        // Simulate loading time or data fetch logic
        const fetchData = async () => {
            try {
                // Add any data fetching logic here if needed
                await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); // Set loading to false after fetch
            }
        };
        fetchData();
    }, []);


    return (
        <OrganizationDashboardLay>

{loading ? (
                <div className="flex justify-center items-center min-h-screen">
                    <ClipLoader color="#36d7b7" size={150} /> {/* Spinner while loading */}
                </div>
            ) : (
                <div>
                    <h1 className="font-semibold text-xl">Activity</h1>
                    Your events
                    <ActivityEventsInfo userId={params.id} />
                </div>
            )}


            {/**
             * <h1 className='font-semibold text-xl'>
                Activity
            </h1>
            You posted
            
            <ActivityEventsInfo userId={params.id}/>
             */}
            
            
        </OrganizationDashboardLay>
    );
}