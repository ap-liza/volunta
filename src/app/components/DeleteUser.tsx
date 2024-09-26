'use client'
import { HiOutlineTrash } from "react-icons/hi"
import axios from 'axios';
import toast from "react-hot-toast";
import Swal from 'sweetalert2';
import { useState } from "react";
import { useRouter } from "next/navigation";

interface DeleteUserProps {
    id: string;
  }

  export default function DeleteUser({ id }: DeleteUserProps){
    const router = useRouter()
    const [loading, setLoading] = useState(false);

    const deleteUser = async () =>{
        Swal.fire({
            title: 'Are you sure you want to delete your account',
            text: "This action cannot be reversed",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel',
          }).then(async (result) => {
            if (result.isConfirmed) {
              try {
                setLoading(true);
                
                const response = await axios.delete(`/api/users/deleteUser/${id}`);
                if (response.status === 200) {
                  Swal.fire('Deleted!', response.data.message, 'success');
                  // Refresh the page 
                  //window.location.reload(); 
                  router.refresh()
                }
              } catch (error) {
                Swal.fire('Error!', 'Failed to delete account', 'error');
              } finally {
                setLoading(false);
              }
            }
          });
  
    }
    return(
        <button 
        onClick={deleteUser}
        className="text-red-400">
         <HiOutlineTrash size={24}/>
        </button>
     )
  }