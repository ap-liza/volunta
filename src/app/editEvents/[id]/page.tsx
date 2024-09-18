'use client';

import DashboardLay from '../../components/Dashboardlay';
import EditEventsForm from '@/app/components/EditEventsForm';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

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

    if (loading) return <p>Loading...</p>;

    return (
        <DashboardLay>
            <div>
                {eventData ? <EditEventsForm event={eventData} /> : <p>Event not found.</p>}
            </div>
        </DashboardLay>
    );
}
