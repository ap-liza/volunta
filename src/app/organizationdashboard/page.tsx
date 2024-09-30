'use client'

import axios from 'axios'
import {useRouter} from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

export default function Dashboard(){

    const router = useRouter()
    const logout =async ()=>{
        try{

            await axios.get('/api/organization/logout')

            toast.success('logout success')

            router.push('/organizationlogin')

        }catch(error:any){
            console.log(error.message)

            toast.error(error.message)
        }
    }
    
  return (
    <div>
        <button 
        onClick={logout}
        className='bg-blue-500 text-white hover:bg-blue-800'>
            Log out
        </button>
    </div>
  )
}

