/* eslint-disable @next/next/no-img-element */
'use client'

import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function UserProfile({ params }: { params: { id: string } }) {

    //getting users details on rendering
      const [firstName, setFirstName] = useState('')
      const [lastName, setLastName] = useState('')
      const [email, setEmail] = useState('')
      const [savedProfilePic, setSavedProfilePic] = useState('')

    //profile picture state
    const [profilePic, setProfilePic] = useState<string>("/profile-default.png");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // Handle file selection
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);

            // Show preview of selected file
            const previewURL = URL.createObjectURL(file);
            setProfilePic(previewURL);
        }
    };

     // Handle file upload
     const handleUpload = async () => {
        if (!selectedFile) {
            toast.error("Please select a file first");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            // Send the selected file to the backend
            const res = await axios.post(`/api/users/uploadProfilePicture`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "user-id": params.id  // passing user-id in the headers
                }
            });

            if (res.data.imageUrl) {
                // Update profile picture with the uploaded Cloudinary URL
                setProfilePic(res.data.imageUrl);
                toast.success("Profile picture updated successfully");
            } else {
                toast.error("Failed to upload profile picture");
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            toast.error("Error uploading profile picture");
        }
    };


    //getting user details
    const [userData, setUserData] = useState<any>(null)
    //getting user id 
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axios.get(`/api/users/${params.id}`)
                setUserData(res.data)
            } catch (error:any) {
                console.error('Failed to fetch user data:', error.message)
            }
        }

        fetchUserData()
    }, [params.id])

  

     const getUSERName = async ()=>{
        try {
            const res = await axios.get('/api/users/user1')
            console.log(res.data)

            const { _id, username, firstName, lastName, email,profilePicture } = res.data.data

            setFirstName(res.data.data.firstName)

            setLastName(res.data.data.lastName)

            setEmail(res.data.data.email)

            setProfilePic((profilePicture || "/profile-default.png"))

            setSavedProfilePic(res.data.data.profilePicture || '')
        } catch (error: any) {
            console.error('Failed to fetch user details:', error.message)
            toast.error('Failed to load user details')
        }
     }

     useEffect(()=>{
        getUSERName()
     }, [])



    return (
        <div className="flex flex-col gap-4 p-4 ">
            {/** <h1>Profile of User {params.id}</h1>
            <h1>Welcome, {firstName} {lastName}</h1>
            <h1>Email:  {email}</h1>*/}
            
            

<div className="flex flex-col md:flex-row justify-between border border-[#004D40] p-6 mt-[10px] rounded-[15px]">

{/**profile picture and bio */}
    <div className="flex justify-center items-center gap-4">
    
    <div className="flex flex-col">
        {/**profile picture*/}

        <div className="relative">

        
        <img 
            src={profilePic} 
            alt="Profile Picture" 
            className="w-40 h-40 rounded-full object-cover border-2 border-gray-300"
        />

        <label 
            htmlFor="profile-pic-upload" 
            className="absolute mt-[-2px] bottom-0 right-0 bg-[#FF6F61] p-2 rounded-full cursor-pointer w-10 h-10 hover:bg-[#C7A500]"
            >
            <svg className="w-6 h-6 text-[#F9F7F7] " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12.293 2.293a1 1 0 0 1 1.414 0l6 6a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.707.293H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 .293-.707l9-9z" />
            <path d="M6 14a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2H6z" />
            </svg>
            </label>

            
            <input 
            id="profile-pic-upload" 
            type="file" 
            className="hidden" 
            accept="image/*"
            onChange={handleFileChange}
            />
        
        </div>

        {/**upload button */}
        <button
           onClick={handleUpload}
            className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 mt-2"
        >
            Upload picture
        </button>

    </div>   
        {/**name, location and bio */}
        <div className="flex flex-col gap-2">
                <h1 
                className="text-xl font-[500] ">{firstName} {lastName}
                </h1>

                <h1
                className="text-slate-500"
                >User Bio</h1>


                <h1 className="text-sm"
                >User Location</h1>
        </div>
    </div>
{/**edit profile picture */}
   
        
</div>


<div className="flex flex-col items-center bg-slate-500">

                {/**Profile Picture */}
        <div className="relative">

            <img 
                
                 src={profilePic} 
                 alt="Profile Picture" 
                 className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
            />
            
            <label 
            htmlFor="profile-pic-upload" className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M4 5a2 2 0 012-2h8a2 2 0 012 2v2h2a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2h2V5zm3 0V4a1 1 0 012 0v1h4V4a1 1 0 012 0v1h1v2H3V5h1z" />
                </svg>
            </label>

            
            <input 
            id="profile-pic-upload" 
            type="file" 
            className="hidden" 
            accept="image/*"
            onChange={handleFileChange}
            />
        </div>

        {/**upload button */}

        <button
           onClick={handleUpload}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
            Upload picture
        </button>
    </div>

        

            
        </div>
    )
}