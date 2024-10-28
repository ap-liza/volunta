/* eslint-disable @next/next/no-img-element */
'use client'

import Link from 'next/link'
import React, { ReactNode, useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter, usePathname } from 'next/navigation'
import Searchbar from './Searchbar'

interface SidebarProps {
  children: ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
    //router to push user to log in after logging out
    const router = useRouter()

    
   
    
    //visibility of the side content
    const [isContentVisible, setIsContentVisible] = useState<boolean>(true);
    
    const toggleContentVisibility = () => {
        setIsContentVisible((prevState) => !prevState);
    };

    //getting the user id
    const [userId, setUserId] = useState('');
/** 
    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const res = await axios.get('/api/organization/organizations');
                console.log('fetching data', res.data)
                const organizationId = res.data.data._id; 
                
                //setUserId(organizationId);
            } catch (error:any) {
                console.error('Failed to fetch user ID:', error.message);
                toast.error('failed to fetch user id')
            }
        };

        fetchUserId();
    }, []);
*/
    //log out user
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
    
    //get user's details
    const [userName, setUserName] = useState('')
    const [profilePicture, setProfilePicture] = useState('')
    
    const getUserDetails = async () => {
        try {
            const res = await axios.get('/api/organization/organizations')
            //console.log(res.data)
            const { _id, name } = res.data.data
            setUserName(name)
            setUserId(_id)
            setProfilePicture((profilePicture || '/profile-default.png'))

            console.log('fetched user id', _id)
        } catch (error: any) {
            console.error('Failed to fetch organization details:', error.message)
            toast.error('Failed to fetch organization details')
        }
    }

    useEffect(() => {
        getUserDetails() // Fetch user details on component mount
    }, [])

  // Highlight LINKS based on current path
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname.includes(path )? 'bg-[#F9F7F7] text-[#00332E]' : '';
  }


  return (
    <div className="flex min-h-screen">
       
      {/** //sidebar */}
      {isContentVisible &&(

        
      <div className={`fixed top-0 left-0 h-full bg-[#004D40] text-[#F9F7F7] w-[130px] md:w-[260px] p-[25px]`}>

        <h1 className='text-center mt-[10px] text-xl font-bold md:text-3xl'>VOLUNTA</h1>
        {/**user info */}

        <div className="flex flex-col md:flex-row justify-start items-center gap-[16px] mt-[50px]">

          {/**IMAGE */}
          <div>
            <img
              src='/profile-default.png'
              alt="profile"
              className="w-[50px] h-[50px] overflow-hidden rounded-full shadow-lg"
              
            />
          </div>
          {/**info */}
          <span className="font-semibold text-[12px] md:text-[15px] uppercase">{userName}</span>
        </div>

        {/**nav links for the dashboard */}
        <nav className="mt-[40px] h-[600px] ">
          <ul className="flex flex-col gap-[20px]">
            
            {/**uPCOMING EVENTS events */}
            <li 
            className={`h-[44px] rounded-[8px] flex justify-start items-center p-[25px] md:p-[10px] gap-[12px] ${
              isActive(userId ? `/organizationdashboard/events/${userId}` : '/events') ? 'bg-[#00332E]' : 'hover:bg-[#00332E]'
            } text-[#F9F7F7]`}
             >
              {/**icon */}
              <Link 
               href={userId ? `/organizationdashboard/events/${userId}` : '/events'}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 3v1.5m7.5-1.5V4.5M3 9h18M4.5 6.75h15a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25H4.5A2.25 2.25 0 012.25 19.5V9A2.25 2.25 0 014.5 6.75z"
                  />
                </svg>
              </Link>

              <Link 
               href={userId ? `/organizationdashboard/events/${userId}` : '/profile'}
              className='hidden md:block'
              >Upcoming Events
              </Link>
            </li>





            {/**Post a new event */}
            <li 
             className={`h-[44px] rounded-[8px] flex justify-start items-center p-[25px] md:p-[10px] gap-[12px] ${
              isActive(userId ? `/organizationdashboard/newevents/${userId}` : '/newevents') ? 'bg-[#00332E]' : 'hover:bg-[#00332E]'
            } text-[#F9F7F7]`}
            >
              
              
              {/**icon */}
              <Link
               href={userId ? `/organizationdashboard/newevents/${userId}` : '/newevents'}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </Link>

              <Link 
               href={userId ? `/organizationdashboard/newevents/${userId}` : '/newevents'}
              
              className='hidden md:block'
              >
                Post a New Event
              </Link>
            </li>

            {/**Activity */}
            <li 
            className={`h-[44px] rounded-[8px] flex justify-start items-center p-[25px] md:p-[10px] gap-[12px] ${
              isActive(userId ? `/organizationdashboard/activity/${userId}` : '/activity') ? 'bg-[#00332E]' : 'hover:bg-[#00332E]'
            } text-[#F9F7F7]`}
            >

              {/**icon */}
              <Link
               href={userId ? `/organizationdashboard/activity/${userId}` : '/activity'}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 12h4l2-4 4 8 2-4h4"
                  />
                </svg>
              </Link>

              <Link 
              href={userId ? `/organizationdashboard/activity/${userId}` : '/activity'}
              className='hidden md:block'
              >Activity</Link>
            </li>

            {/**Volunteer */}
            
             <li 
            className={`h-[44px] rounded-[8px] flex justify-start items-center p-[25px] md:p-[10px] gap-[12px] ${
              isActive(userId ? `/organizationdashboard/volunteers/${userId}` : '/activity') ? 'bg-[#00332E]' : 'hover:bg-[#00332E]'
            } text-[#F9F7F7]`}
            >

              {/**icon */}
              <Link
               href={userId ? `/organizationdashboard/volunteers/${userId}` : ''}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100"
                  height="80"
                  viewBox="0 0 64 64"
                  className='w-8 h-8 mr-'
                  >
                  <g fill="#F9F7F7">
                    <path d="M10 36c-3.3 0-6 2.7-6 6v8h12v-8c0-3.3-2.7-6-6-6zM20 30c2.2 0 4 1.8 4 4v10h-8v-10c0-2.2 1.8-4 4-4zM32 36c-3.3 0-6 2.7-6 6v8h12v-8c0-3.3-2.7-6-6-6zM42 30c2.2 0 4 1.8 4 4v10h-8v-10c0-2.2 1.8-4 4-4zM54 36c-3.3 0-6 2.7-6 6v8h12v-8c0-3.3-2.7-6-6-6z" />
                    <circle cx="10" cy="26" r="6" />
                    <circle cx="32" cy="26" r="6" />
                    <circle cx="54" cy="26" r="6" />
                  </g>
                </svg>
               
                
              </Link>

              <Link 
              href={userId ? `/organizationdashboard/volunteers/${userId}` : ''}
              className='hidden md:block'
              >Volunteers
              </Link>
            </li>

            {/**Account */}
            <li 
             className={`h-[44px] rounded-[8px] flex justify-start items-center p-[25px] md:p-[10px] gap-[12px] ${
              isActive(userId ? `/organizationdashboard/profile/${userId}` : '/profile') ? 'bg-[#00332E]' : 'hover:bg-[#00332E]'
            } text-[#F9F7F7]`}
            >
              {/**icon */}

              <Link 
              href={userId ? `/organizationdashboard/profile/${userId}` : '/profile'}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                  />
                </svg>
              </Link>

              <Link href={userId ? `/organizationdashboard/profile/${userId}` : '/profile'}
              className='hidden md:block'
              >Account</Link>
            </li>

            {/**Log out button */}
            <li 
            className="h-[44px] rounded-[8px] flex justify-start items-center p-[25px] md:p-[10px] gap-[12px] hover:bg-[#00332E] text-[#F9F7F7]">
              <button
              onClick={logout}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
                  />
                </svg>
              </button>

              <button
              onClick={logout}
              className='hidden md:block'
              >Log out
              </button>
            </li>
          </ul>
        </nav>
      </div>

     )}

 {/* Main Content */}
 <div
        className={`transition-all duration-300 ease-in-out ${
          isContentVisible ? 'ml-[130px] md:ml-[260px]' : 'ml-0'
        }`}
      />

      {/**top bar with a search bar and notification icon */}
      <div className="flex-1 ">
        <div className="bg-[#F9F7F7] p-4 shadow flex justify-between gap-[40px] md:gap-[60px] items-center">
         
        {/** Toggle Button to control the visibility of the side bar*/}
         <button
         onClick={toggleContentVisibility}
          className='p-2 text-white'
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="black"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        
         
         <Searchbar />  
        
         


          {/** Notification Icon */}
          <div className="relative">
            <button className="ml-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118.5 15.03V11a6.002 6.002 0 00-5-5.917V4a1 1 0 10-2 0v1.083A6.002 6.002 0 006 11v4.03c0 .403-.161.786-.448 1.064L4 17h11zM10 21h4a2 2 0 11-4 0z"
                />
              </svg>
            </button>
            {/** Notification Badge */}
            <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
          </div>
        </div>

        {/** Page content */}
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
};

export default Sidebar;
