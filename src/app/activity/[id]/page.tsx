'use client'

import DashboardLay from '../../components/Dashboardlay'
import ActivityEventsInfo from '@/app/components/ActivityEventsInfo';


export default function ActivityPage({ params }: { params: { id: string } }) {
    return (
        <DashboardLay>
            <h1 className='font-semibold text-xl'>
                Activity
            </h1>
            You posted
            
            <ActivityEventsInfo userId={params.id}/>
            
        </DashboardLay>
    );
}
