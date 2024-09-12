'use client'
import DashboardLay from '../../components/Dashboardlay'
import EditEventsForm from '@/app/components/EditEventsForm';


export default function EditEvents({ params }: { params: { id: string } }) {
    return (
        <DashboardLay>
            <div>
                <EditEventsForm/>
            </div>  
        </DashboardLay>
    );
}
