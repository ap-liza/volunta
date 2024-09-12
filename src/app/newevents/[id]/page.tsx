'use client'

import DashboardLay from '../../components/Dashboardlay'
import NewEventsForm from '@/app/components/NewEventsForm';
import NewEventsInfo from '@/app/components/NewEventsInfo';



export default function NewEventPage({ params }: { params: { id: string } }) {
    return (
        <DashboardLay>
            <NewEventsForm/>  
        </DashboardLay>
    );
}
