'use client'
import axios from "axios"
import Link from "next/link"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"





//use useEffect later
export default function Profile(){

    const router = useRouter()
    const [user, setUser] = useState('')
    const [userName, setUserName] = useState('')
    
    const logout =async ()=>{
        try{

            await axios.get('/api/users/logout')

            toast.success('logout success')

            router.push('/login')

        }catch(error:any){
            console.log(error.message)

            toast.error(error.message)
        }
    }

    const getUserDetails = async () =>{
        const res = await axios.get('/api/users/user1')
        console.log(res.data);
        setUser(res.data.data._id)
    }
  
    const getUserName = async () => {
        try {
            const res = await axios.get('/api/users/user1')
            console.log(res.data)
            const { _id, username } = res.data.data
            setUserName(res.data.data.firstName)
        } catch (error: any) {
            console.error('Failed to fetch user details:', error.message)
            toast.error('Failed to load user details')
        }
    }

    useEffect(() => {
        getUserName() // Fetch user details on component mount
    }, [])

    
    return(
        <div className="flex flex-col gap-4 p-4">
            <h1>Profile</h1>
            <h1>WELCOME {userName}</h1>
            <h2>{user === '' ? 'Yet to load id' : 
                <Link href={`/profile/${user}`}>{user}</Link>}
                </h2>
            <hr />
            <p>Profile Page</p>
            <hr />

            <button 
            onClick={logout}
             className="bg-blue-400 p-4 rounded-full w-[100px]">Log out</button>
{/**will be used for my feed later */}
<button 
            onClick={getUserDetails}
             className="bg-green-400 p-4 rounded-full w-[500px]">
            View User credentials
            </button>
        </div>
    )
}