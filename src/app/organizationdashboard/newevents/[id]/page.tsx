'use client'

import OrganizationDashboardLay from '../../../components/OrganizationDashboardLay'
import NewEventsForm from '@/app/components/organization/NewEventsForm';

import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';



export default function NewEventPage({ params }: { params: { id: string } }) {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        const timer = setTimeout(() => {
          setLoading(false);
        }, 2000); // 
    
        return () => clearTimeout(timer); 
      }, []);
    return (
        <OrganizationDashboardLay>
           {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <ClipLoader color="#36d7b7" size={150} /> {/* Spinner during loading */}
        </div>
      ) : (
        <NewEventsForm />  
      )} 
        </OrganizationDashboardLay>
    );
}
