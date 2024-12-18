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

    // Function to delete the token cookie properly (for localhost)
    const clearTokenCookie = () => {
        document.cookie = "token=; Max-Age=0; path=/;";
    };

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
                  
                  
                  
                  router.push('/')
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
            className={`text-white py-2 px-6 rounded-full transition duration-200 ease-in-out ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-400 hover:bg-red-600'
            }`}
            disabled={loading}
            >
            {loading ? (
                <>
                Deleting...
                <span className="ml-2 animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4 inline-block"></span>
                </>
            ) : (
                'Delete Account'
            )}
            
        </button>
     )
  }