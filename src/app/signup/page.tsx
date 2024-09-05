"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons'
import { ThreeDots } from "react-loader-spinner";


export default function SignUp(){
    //use router
    const router = useRouter()

//to add a user to the database
    const [user,setUser] = useState({
        firstName:'',
        lastName:'',
        email: '',
        password: '',
        username: ''
    })

//this state determines whether the all inputs field are filled or not
    const [buttonDisabled, setButtonDisabled] = React.useState(false)

//state used in the onSignup fxn
    const [loading, setLoading] = React.useState(false)

//creating a new user in the database
    const onSignup = async()=>{

        try {
            setLoading(true)
            const response = await axios.post('/api/users/signup/', user)
            console.log('Sign up success')
            toast.success('Your volunta account has been created ')
            router.push('/login')
        } 
        catch(error:any){

            toast.error(error.message)
            console.log('Sign up failed')
        } 
        finally{
            setLoading(false)
        }
    } 

// to check the length of the input field to determine the state of the sign up button
    useEffect(()=>{
        if(user.email.length > 0 && user.password.length >0 && user.username.length>0){
            setButtonDisabled(false)
        } 
        else setButtonDisabled(true)
    }, [user])

//toggle password visibility for the user
const [userPassword, setUserPassword] = useState({password:''})

const [showUserPassword, setShowUserPassword] = useState(false)

const togglePassword =()=>{
    setShowUserPassword((prevState) => !prevState);
}









    return(
        <div className="bg-[#004D40] min-h-screen">

            <div className=" px-6 md:px-0">

            <h1 className="text-center text-3xl font-bold p-14 text-[#F9F7F7]">
                <Link href='/'>VOLUNTA</Link>
            </h1>
            
            <div className="flex  max-w-lg w-11/2 min-h-[500px] bg-white place-self-center mx-auto rounded-[40px] flex-col p-10 gap-6">

            <h1 className="text-center text-xl pb-4 text-[#004D40] font-semibold flex justify-center items-center">
                    {loading ? (
                        <ThreeDots
                            visible={true}
                            height="80"
                            width="80"
                            color="#4fa94d"
                            radius="9"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                        />
                    ) : (
                        'Sign Up'
                    )}
                </h1>


{/**Div for first and last name to make to flex*/}
   <div className="flex gap-3">

{/**First Name */}
     <div className="relative bg-gray-100">
      <input
        type="text"
        value={user.firstName}
        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
        id="floating_input"
        className="block px-4 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-transparent  border-b-4 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#004D40] peer"
        placeholder=" "
      />
      <label
        htmlFor="floating_input"
        className="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0]  px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
      >
        First Name
      </label>
    </div>

{/**Last Name */}
    <div className="relative  bg-gray-100">
      <input
        value={user.lastName}
        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
        type="text"
        id="floating_input"
        className="block px-4 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-transparent  border-b-4 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#004D40] peer"
        placeholder=" "
      />
      <label
        htmlFor="floating_input"
        className="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
      >
        Last Name
      </label>
    </div>

   </div>
{/**Username*/}
<div className="relative  bg-gray-100">
      <input
        id="floating_input"
        type="text" 
        value={user.username}
        onChange={(e)=> setUser({...user, username:e.target.value})}
        className="block px-4 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-transparent  border-b-4 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#004D40] peer"
        placeholder=" "
      />
      <label
        htmlFor="floating_input"
        className="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0]  px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
      >
        username
      </label>
    </div>
{/**Email */}
<div className="relative  bg-gray-100">
      <input
        id="floating_input"
        value={user.email}
        type="email"
        onChange={(e)=>setUser({...user,email:e.target.value})}
        className="block px-4 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-transparent  border-b-4 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#004D40] peer"
        placeholder=" "
      />
      <label
        htmlFor="floating_input"
        className="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0]  px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
      >
        Email
      </label>
    </div>
{/**Password */}
<div className="relative  bg-gray-100">
      <input
       type={showUserPassword ? 'text' : 'password'}
       id="floating_input"
       value={user.password}
       onChange={(e)=>setUser({...user,password:e.target.value})}
        className="block px-4 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-transparent  border-b-4 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#004D40] peer"
        placeholder=" "
      />
      <label
        htmlFor="floating_input"
        className="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0]  px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
      >
        Password
      </label>

      {user.password && (
        <button
          type="button"
          onClick={togglePassword}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
        >
          <FontAwesomeIcon icon={showUserPassword ? faEyeSlash : faEye} />
        </button>
      )}

    </div>
    {/**
     *   <label htmlFor="username">Username:</label>
                <input 
                id="username"
                type="text" 
                value={user.username}
                onChange={(e)=> setUser({...user, username:e.target.value})}
                className="border border-blue-400 px-2 py-4 rounded outline-none"
                />

                <label htmlFor="email">Email:</label>
                <input 
                id="email"
                value={user.email}
                type="email"
                onChange={(e)=>setUser({...user,email:e.target.value})}
                className="border border-blue-400 px-2 py-4 rounded outline-none"
                />

                <label htmlFor="password">Password:</label>
                <input 
                type="password"
                id="password"
                value={user.password}
                onChange={(e)=>setUser({...user,password:e.target.value})}
                className="border border-blue-400 px-2 py-4 rounded outline-none"
                />
     */}
              

        <button
          onClick={onSignup}
          className={`px-2 py-2 md:py-4 rounded-full mt-4 ${buttonDisabled ? 'disabled-button' : 'enabled-button'}`}
          disabled={buttonDisabled} 
        >
          Create your Volunta account
        </button>

{/**this button is going to be used for google sign */}
        <button className="border-4 p-4">
            Google
        </button>

        <Link href='/login' className="text-center text-sm hover:underline text-[#004D40]">Already have an account ? Sign in
        </Link>

        </div>
        </div>

{/**footer */}
        <footer className="py-10 text-center">
        <p className="text-[#F9F7F7]">© 2024 Volunta. All rights reserved.</p>
        <div className="mt-4 flex justify-center gap-6">
          <a href="#"><FontAwesomeIcon  className="text-[#FF6F61] w-[25px] h-[25px]" icon={faFacebookF} /></a>
          <a href="#"><FontAwesomeIcon  className="text-[#FF6F61]   w-[25px] h-[25px]" icon={faTwitter} /></a>
          <a href="#"><FontAwesomeIcon  className="text-[#FF6F61]  w-[25px] h-[25px]" icon={faInstagram} /></a>
          
        </div>
      </footer>
        </div>
    )
} 