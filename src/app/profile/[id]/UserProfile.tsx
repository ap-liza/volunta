/* eslint-disable @next/next/no-img-element */
'use client'


import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import toast from "react-hot-toast"
import DeleteUser from "@/app/components/DeleteUser"
import { ClipLoader } from 'react-spinners';

//import Cropper from 'react-easy-crop';
//import getCroppedImage from "@/helpers/getCroppedImage"
//import Slider from '@mui/material/Slider';







export default function UserProfile({ params }: { params: { id: string } }) {

        

    //getting users details on rendering
      const [userId, setUserId] = useState('')
      const [firstName, setFirstName] = useState('')
      const [lastName, setLastName] = useState('')
      const [username, setUserName] = useState('')
      const [email, setEmail] = useState('')
      const [bio, setBio] = useState<string>('')
      const [skills, setSkills] = useState<string[]>([])
     

    //profile picture state
    const [savedProfilePic, setSavedProfilePic] = useState('')
    const [profilePic, setProfilePic] = useState<string>("/profile-default.png");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // Editing state
    const [isEditing, setIsEditing] = useState(false)

    //modal state to get the confirmation of user to upload image
    const [showModal, setShowModal] = useState(false); 
    const [deleteModal, setDeleteModal] = useState(false)

     // upLoading image state
     const [isLoading, setIsLoading] = useState(false);

    // Handle file selection
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);

            // Show preview of selected file
            const previewURL = URL.createObjectURL(file);
            setProfilePic(previewURL);

            setShowModal(true);

        }
    };

    //close modal
    const onClose = () => {
        setShowModal(false);
        setDeleteModal(false)
      };
    
     // Handle image file upload
     const handleUpload = async () => {
        if (!selectedFile) {
            toast.error("Please select a file first");
            return;
        }

        //set loading state to true
        setIsLoading(true)

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

                onClose()
                toast.success("Profile picture updated successfully");

                window.location.reload()
            } else {
                toast.error("Failed to upload profile picture");            
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            toast.error("Error uploading profile picture");
        }finally{
            setIsLoading(false)
        }
    };

    // Handle canceling the upload
    const handleCancelUpload = () => {
        setSelectedFile(null);
        setProfilePic(savedProfilePic || "/profile-default.png");
        setShowModal(false);
    };

   
    // Handle delete photo
    const handleDelete =()=>{
        setDeleteModal(true)
    } 

    //delete Photo Function
    const deletePhoto = async()=>{

       
        setIsLoading(true)

        try{

            const response = await axios.delete(`/api/users/deleteProfilePicture/${userId}`);
            if (response.status === 200) {
                console.log('Picture Deleted')

                
                onClose()

                toast.success('Profile Picture has been deleted')

                window.location.reload()

            }

        }catch(error:any){
            console.log('error', error)
            toast.error('An error occured whiles deleting Profile Picture')
        }finally{
            setIsLoading(false)
        }

    }


    //handle canceling deletion
     const handleCancelDelete =()=>{
        setDeleteModal(false)
    }


    //handle save user details
    const handleSaveBioAndSkills = async()=>{

        try {
            const updatedUser = {
                username,
                bio,
                skills,
            };
    
            const res = await axios.put(`/api/users/updateUserData/${userId}`, updatedUser);
    
            if (res.status === 200) {
                toast.success('Profile updated successfully');
                setIsEditing(false); 
                
            }
        } catch (error: any) {
            console.error('Error updating profile:', error);
            toast.error('An error occurred while saving');
        }
    }
 

    //fetch user details
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

  
     const getUserData = async ()=>{
        try {
            const res = await axios.get('/api/users/user1')
            console.log(res.data)

            const { _id, username, firstName, lastName, email,profilePicture,bio, skills } = res.data.data
            setUserId(_id)
            setFirstName(firstName)
            setLastName(lastName)
            setUserName(username)
            setEmail(email)
            setBio(bio || '')
            setSkills(skills || [])

            setProfilePic((profilePicture || "/profile-default.png"))

            setSavedProfilePic(res.data.data.profilePicture || '')
        } catch (error: any) {
            console.error('Failed to fetch user details:', error.message)
            toast.error('Failed to load user details')
        }
     }

     useEffect(()=>{
        getUserData()
     }, [])


    return (

        <>

        {/**Account */}

        {/**Picture */}

        <div className="p-4 border border-gray-500 rounded-lg mt-4">
            {/**Profile Picture */}
            <div className="flex flex-col gap-4">
                <h1>Profile Picture</h1>

                <div className="flex flex-col md:flex-row items-center gap-6 ">

                    <img 
                    src={profilePic} 
                    alt="Profile Picture" 
                    className=" w-40 h-40 rounded-full object-cover border-2 border-gray-300"
                    />

                {/**photo buttons */}
                <div className="flex gap-6">

                     {/* changing the button text depeding on the availability of profile pic */}
                     <label 
                     className="py-2 px-4 bg-blue-500 text-white rounded-full cursor-pointer">
                            {savedProfilePic ? 'Change Photo' : 'Add Photo'}
                                <input
                                    id="profile-pic-upload" 
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                    </label>

                     {/* Conditionally render the delete button */}
                     {savedProfilePic && (
                        <button
                        className="py-2 px-4 bg-red-500 text-white rounded-full"
                        onClick={handleDelete}
                        >
                            Delete Photo
                        </button>
                    )}
                </div>
            </div>
        </div>
        </div>

        {/**Account info */}

        <div className="p-4 border border-gray-500 rounded-lg mt-4">
            {/**name and email */}
            <div className="flex flex-col md:flex-row justify-between p-4 gap-6 md:gap-4">
                {/**first name */}
                <div className="flex flex-col gap-2">
                    <label htmlFor=""
                    className="text-gray-600"
                    >First Name
                    </label>
                    <input 
                    className="py-2 px-4 bg-gray-200 rounded-lg text-gray-600"
                    type="text"
                    value={firstName}
                    disabled
                    />
                </div>
                    {/**last name */}
                <div className="flex flex-col gap-2">
                    <label htmlFor=""
                     className="text-gray-600"
                    >Last Name</label>
                    <input 
                    type="text"
                    className="py-2 px-4 bg-gray-200 rounded-lg text-gray-600"
                    value={lastName}
                    disabled
                    />
                </div>
                {/**email */}
                <div className="flex flex-col gap-2">
                    <label htmlFor=""
                     className="text-gray-600"
                    >Email</label>
                    <input 
                    type="text"
                    className="py-2 px-4 bg-gray-200 rounded-lg text-gray-600"
                    value={email}
                    disabled
                    />
                </div>
                
               
            </div>

            {/**editable username, bio and interests */}

            <div className="flex flex-col md:flex-row justify-between p-4 gap-6 md:gap-4">

                {/**username */}
                <div className="flex flex-col gap-2">
                    <label htmlFor=""
                    className="text-gray-600"
                    >username
                    </label>
                    {isEditing ? (
                            <input
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                                className="py-2 px-4 bg-gray-200 rounded-lg text-gray-600"
                                placeholder=""
                            />
                        ) : (
                            <input 
                            type="text"
                            className="py-2 px-4 bg-gray-200 rounded-lg text-gray-600"
                            value={username}
                            disabled
                            />
                            
                        )}
                </div>



                
                {/**Bio */}
                <div className="flex flex-col gap-2">
                    <label htmlFor=""
                    className="text-gray-600"
                    >Bio
                    </label>
                    {isEditing ? (
                            <textarea
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                className="py-2 px-4 bg-gray-200 rounded-lg text-gray-600"
                                placeholder="Add your bio..."
                            />
                        ) : (
                            <input 
                            type="text"
                            className="py-2 px-4 bg-gray-200 rounded-lg text-gray-600"
                            value={bio}
                            disabled
                            />
                            
                        )}
                </div>

                
                {/**interests */}
                <div className="flex flex-col gap-2">
                    <label htmlFor=""
                    className="text-gray-600"
                    >Interests
                    </label>
                    {isEditing ? (
                            <textarea
                                value={skills.join(', ')}
                                onChange={(e) => setSkills(e.target.value.split(', '))}
                                className="py-2 px-4 bg-gray-200 rounded-lg text-gray-600"
                                placeholder="Add your interests separated by comma's..."
                            />
                        ) : (
                            <input 
                            type="text"
                            className="py-2 px-4 bg-gray-200 rounded-lg text-gray-600"
                            value={skills.length ? skills.join(', ') : ' Add Interests'}
                            disabled
                            />
                            
                        )}
                </div>
            </div>

        </div>

        {/**eDIT AND SAVE CHANGES BUTTON */}

        <div className="mt-4 flex justify-center md:justify-end">

           
                

                {/* Edit or Save button */}
                {isEditing ? (
                    <button
                        onClick={handleSaveBioAndSkills}
                        className="px-4 py-2 mt-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Save Changes
                    </button>
                ) : (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 mt-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                        Edit Profile
                    </button>
                )}
    
        </div>

        {/**delete account button */}
        <div className="flex justify-center mt-10">
            <DeleteUser id={params.id} />
        </div>





            








          

            







        {/* Modal for upload confirmation */}
        {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80  ">
                    <div className="bg-white flex flex-col rounded-lg p-8 w-full max-w-sm md:max-w-2xl h-[80vh] gap-8">
                        
                        <div>
                    
                        {isLoading ? (
                            <p className="text-center text-gray ">Uploading Picture.....</p>
                        ):(
                            <p className="text-center  font-semibold text-gray-600 text-lg">
                            Upload Profile Picture
                        </p>
                        )}
                           
                        
                           
                        </div>
                        
                    {isLoading ?

                    ( 
                        <div className="flex justify-center mt-20">
                            <ClipLoader color="#36d7b7" size={150} />
                            
                        </div>
                    
                        
                    ):
                    (
                        <div>


                        <img
                            src={profilePic}
                            alt="Preview"
                            className="w-60 h-60 rounded-full object-cover border-2 border-gray-300 mx-auto mb-4"
                        />

                             <p className="text-center text-gray-600">Are you sure you want to upload this image?</p>
                        <div className="flex justify-center gap-4 mt-6">
                            <button
                                className="py-2 px-4 bg-blue-500 text-white rounded-full"
                                onClick={handleUpload}
                            >
                                Yes
                            </button>
                            <button
                                className="py-2 px-4 bg-gray-300 text-black rounded-full"
                                onClick={handleCancelUpload}
                            >
                                Cancel
                            </button>
                        </div>
                        </div>
                       

                        
                        
                    ) }
                        
                       
                    </div>
                </div>
        )}

        {/**Modal for delete confirmation */}
        {deleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80  ">
                    <div className="bg-white flex flex-col rounded-lg p-8 w-full max-w-sm md:max-w-2xl h-[80vh] gap-8">
                        
                        <div>
                    
                        {isLoading ? (
                            <p className="text-center text-gray ">Deleting Picture.....</p>
                        ):(
                            <p className="text-center  font-semibold text-gray-600 text-lg">
                            Delete Profile Picture
                        </p>
                        )}
                           
                        
                           
                        </div>
                        
                    {isLoading ?

                    ( 
                        <div className="flex justify-center mt-20">
                            <ClipLoader color="#36d7b7" size={150} />
                            
                        </div>
                    
                        
                    ):
                    (
                        <div>


                        <img
                            src={profilePic}
                            alt="Preview"
                            className="w-60 h-60 rounded-full object-cover border-2 border-gray-300 mx-auto mb-4"
                        />

                             <p className="text-center text-gray-600">Are you sure you want to delete this image?</p>
                        <div className="flex justify-center gap-4 mt-6">
                            <button
                                className="py-2 px-4 bg-blue-500 text-white rounded-full"
                                onClick={deletePhoto}
                            >
                                Yes
                            </button>
                            <button
                                className="py-2 px-4 bg-gray-300 text-black rounded-full"
                                onClick={handleCancelDelete}
                            >
                                Cancel
                            </button>
                        </div>
                        </div>
                       

                        
                        
                    ) }
                        
                       
                    </div>
                </div>
        )}

        
         
        
        </>
    )
}
