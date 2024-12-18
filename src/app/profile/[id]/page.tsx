'use client'

import DashboardLay from '../../components/Dashboardlay'

 // Adjust path as needed
import UserProfile from './UserProfile'
//import UserInfo from './UserInfo'

export default function ProfilePage({ params }: { params: { id: string } }) {
    return (
        <DashboardLay>
            <h1 className='font-semibold text-xl'>My Profile</h1>
            
            
            <UserProfile params={params} />
            
        </DashboardLay>
    );
}
