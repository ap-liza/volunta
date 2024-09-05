'use client'

import DashboardLay from '../../components/Dashboardlay'

 // Adjust path as needed
import UserProfile from './UserProfile'

export default function ProfilePage({ params }: { params: { id: string } }) {
    return (
        <DashboardLay>
            <UserProfile params={params} />
        </DashboardLay>
    );
}
