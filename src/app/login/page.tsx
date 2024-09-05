"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons'
import { ThreeDots } from 'react-loader-spinner';

export default function LoginPage(){

    
    const [user,setUser] = useState({
        email: '',
        password: '',
    })

    const router = useRouter()
    //disabling button
    const [buttonDisabled, setButtonDisabled] = React.useState(false)
    //showing process
    const [loading, setLoading] = React.useState(false)

    //log in logic
    const onLogin = async()=>{
        try{
            setLoading(true)
            const response = await axios.post('/api/users/login', user)
            toast.success('Login successful')
            router.push('/dashboard')
        }
        catch(error:any){
            console.log('Login failed', error.message)
            toast.error('Log in failed')
        }
        finally{
            setLoading(false)
        }
    }


    useEffect(()=>{
        if(user.email.length > 0 && user.password.length ){
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
        <div className="">
            {/** <h1 className="text-center p-20 text-3xl text-[#F9F7F7] bg-[#004D40] font-bold"> VOLUNTA</h1> */}
           

            <div className="flex flex-col md:flex-row justify-center items-center bg-[#004D40] min-h-screen md:bg-white">
        
{/**GREEN BACKGROUND */}
                <div className="w-1/2 bg-[#004D40] min-h-screen hidden md:flex md:flex-col md:justify-center md:items-center md:p-12 md:gap-6">
                    
                    <h1 className="text-center  text-[60px] text-[#F9F7F7] font-bold">
                        <Link href='/'>VOLUNTA</Link>
                    </h1>

                    <p className="text-[#F9F7F7] font-thin text-center">
                    
                     Where your impact matters. Sign in to unlock new opportunities and continue your volunteering journey . 
                    </p>

{/**footer */}
        <footer className="py-4 text-center mt-[250px]">
        <p className="text-[#F9F7F7]">© 2024 Volunta. All rights reserved.</p>
        <div className="mt-4 flex justify-center gap-6">
          <a href="#"><FontAwesomeIcon  className="text-[#FF6F61] w-[25px] h-[25px]" icon={faFacebookF} /></a>
          <a href="#"><FontAwesomeIcon  className="text-[#FF6F61]   w-[25px] h-[25px]" icon={faTwitter} /></a>
          <a href="#"><FontAwesomeIcon  className="text-[#FF6F61]  w-[25px] h-[25px]" icon={faInstagram} /></a>
          
        </div>
      </footer>
                </div>

{/**sIGN IN FORM */}
            <h1 className="text-center text-3xl font-bold mt-[40px] text-[#F9F7F7] md:hidden ">
                <Link href='/'>VOLUNTA</Link>
            </h1>


                <div className="mt-10 md:mt-0 flex w-[340px] max-w-lg md:w-1/2 min-h-[500px] bg-white place-self-center mx-auto rounded-[40px] p-6  flex-col md:p-10 gap-6">
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
                        'Sign in'
                    )}
                </h1>

                
                    {/**  <label htmlFor="username">Username:</label>
                    <input 
                    id="username"
                    type="text" 
                    value={user.username}
                    onChange={(e)=> setUser({...user, username:e.target.value})}
                    className="border border-blue-400 px-2 py-4 rounded outline-none"
                    /> */}
{/**email */}
    <div className="relative  bg-gray-100">
        <input
            type="email"
            value={user.email}
            onChange={(e)=>setUser({...user,email:e.target.value})}
            id="floating_input"
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

    {/** 
                    <label htmlFor="email">Email:</label>
                    <input 
                    id="email"
                    value={user.email}
                    type="email"
                    onChange={(e)=>setUser({...user,email:e.target.value})}
                    className="border border-blue-400 px-2 py-4 rounded outline-none"
                    />
    */}
{/**password */}
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


{/**Sign in button */}
                    <button 
                    onClick={onLogin}
                    className={`px-2 py-4 rounded-full mt-4 ${buttonDisabled ? 'disabled-button' : 'enabled-button'}`}
                    disabled={buttonDisabled} >
                    Log in
                    </button>

                    
{/**this button is going to be used for google sign */}
        <button className="border-4 p-4">
            Google
        </button>

                    <Link href='/signup' className="text-center text-sm hover:underline text-[#004D40]">Don't have an account? Sign Up
                    </Link>

                   
                </div>

                {/**footer */}
        <footer className="py-10 mt-[50px] text-center md:hidden">
        <p className="text-[#F9F7F7]">© 2024 Volunta. All rights reserved.</p>
        <div className="mt-4 flex justify-center gap-6">
          <a href="#"><FontAwesomeIcon  className="text-[#FF6F61] w-[25px] h-[25px]" icon={faFacebookF} /></a>
          <a href="#"><FontAwesomeIcon  className="text-[#FF6F61]   w-[25px] h-[25px]" icon={faTwitter} /></a>
          <a href="#"><FontAwesomeIcon  className="text-[#FF6F61]  w-[25px] h-[25px]" icon={faInstagram} /></a>
          
        </div>
      </footer>

              

        </div>
        </div>
    )
}