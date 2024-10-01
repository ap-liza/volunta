'use client';

import OrganizationDashboardLay from '../../../components/OrganizationDashboardLay';
import EditEventsForm from '@/app/components/organization/EditEventsForm';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

export default function EditEvents() {
    const { id } = useParams(); // Get event ID from URL
    const [eventData, setEventData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const fetchEvent = async () => {
                try {
                    console.log('Fetching event with ID:', id);

                    const response = await axios.get(`/api/users/editevents/${id}`);

                    console.log('Event data:', response.data);

                    setEventData(response.data);
                } catch (error) {
                    console.error('Error fetching event data:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchEvent();
        }
    }, [id]);

   

    return (
        <OrganizationDashboardLay>

            {loading ? (
                <div className="flex justify-center items-center min-h-screen">
                    <ClipLoader color="#36d7b7" size={150} /> {/* Spinner during loading */}
                </div>
            ) : (
                <div>
                    {eventData ? <EditEventsForm event={eventData} /> : <p>Event not found.</p>}
                </div>
            )}
            
            {/*<div>
                {eventData ? <EditEventsForm event={eventData} /> : <p>Event not found.</p>}
            </div>*/}
        </OrganizationDashboardLay>
    );
}
