'use client'
import { HiOutlineTrash } from "react-icons/hi"
import axios from 'axios';
//import toast from "react-hot-toast";
import Swal from 'sweetalert2';
import { useState } from "react";
import { useRouter } from "next/navigation";

interface RemoveEventsProps {
    id: string;
  }

  

export default function RemoveEvents({ id }: RemoveEventsProps){

   
    const router = useRouter()
    const [loading, setLoading] = useState(false);

    const deleteEvent = async () => {

        Swal.fire({
          title: 'Are you sure you want to delete this event?',
          text: "",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'Cancel',
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              setLoading(true);
              
              const response = await axios.delete(`/api/users/deleteEvents/${id}`);
              if (response.status === 200) {
                Swal.fire('Deleted!', response.data.message, 'success');
                // Refresh the page 
                window.location.reload(); 
                //router.refresh()
              }
            } catch (error) {
              Swal.fire('Error!', 'Failed to delete event', 'error');
            } finally {
              setLoading(false);
            }
          }
        });

        
      };
    return(
       <button 
       onClick={deleteEvent}
       className="text-red-400">
        <HiOutlineTrash size={24}/>
       </button>
    )
}