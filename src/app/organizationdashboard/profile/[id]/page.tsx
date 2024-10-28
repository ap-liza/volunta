'use client'

import OrganizationDashboardLay from '../../../components/OrganizationDashboardLay'

 // Adjust path as needed
import UserProfile from './UserProfile'
//import UserInfo from './UserInfo'

export default function ProfilePage({ params }: { params: { id: string } }) {
    return (
        <OrganizationDashboardLay>
            <h1 className='font-semibold text-xl'>My Profile</h1>
            
            
            <UserProfile params={params} />
            
        </OrganizationDashboardLay>
    );
}
