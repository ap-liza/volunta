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

    const router = useRouter()

    const [buttonDisabled, setButtonDisabled] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const [organization,setOrganization] = useState({
        name:'',
        email: '',
        password: '',
        contact:'',
        description:'',
        organizationType:'',
    })

    //creating a new organization in the database
    const onSignup = async()=>{

        try {
            setLoading(true)
            const response = await axios.post('/api/organization/signup/', organization)
            console.log('Sign up success')
            toast.success('Your volunta organization account has been created ')
            router.push('/organizationlogin')
        } 
        catch(error:any){

            toast.error(error.message)
            console.log('Sign up failed')
        } 
        finally{
            setLoading(false)
        }
    } 

    useEffect(()=>{
        if(organization.email.length > 0 && organization.password.length >0 && organization.name.length >0 && organization.contact.length>0 && organization.organizationType.length > 0 ){
            setButtonDisabled(false)
        } 
        else setButtonDisabled(true)
    }, [organization])

    //toggle password visibility for the user
   

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
                    'Sign Up as an Organization'
                )}
            </h1>





{/*Name */}
 <div className="relative bg-gray-100">
  <input
    type="text"
    value={organization.name}
    onChange={(e) => setOrganization({ ...organization, name: e.target.value })}
    id="floating_input"
    className="block px-4 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-transparent  border-b-4 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#004D40] peer"
    placeholder=" "
  />
  <label
    htmlFor="floating_input"
    className="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0]  px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
  >
    Name of Organization
  </label>
</div>


{/**Email */}
<div className="relative  bg-gray-100">
  <input
    id="floating_input"
    value={organization.email}
    type="email"
    onChange={(e)=>setOrganization({...organization,email:e.target.value})}
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
   value={organization.password}
   onChange={(e)=>setOrganization({...organization,password:e.target.value})}
    className="block px-4 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-transparent  border-b-4 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#004D40] peer"
    placeholder=" "
  />
  <label
    htmlFor="floating_input"
    className="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0]  px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
  >
    Password
  </label>

  {organization.password && (
    <button
      type="button"
      onClick={togglePassword}
      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
    >
      <FontAwesomeIcon icon={showUserPassword ? faEyeSlash : faEye} />
    </button>
  )}

</div>

{/*organization TYPE */}
<div className="relative bg-gray-100">
  <input
    type="text"
    value={organization.organizationType}
    onChange={(e) => setOrganization({ ...organization, organizationType: e.target.value })}
    id="floating_input"
    className="block px-4 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-transparent  border-b-4 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#004D40] peer"
    placeholder=" "
  />
  <label
    htmlFor="floating_input"
    className="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0]  px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
  >
    Type of Organization
  </label>
</div>

{/*cONTACT */}
<div className="relative bg-gray-100">
  <input
    type="text"
    value={organization.contact}
    onChange={(e) => setOrganization({ ...organization, contact: e.target.value })}
    id="floating_input"
    className="block px-4 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-transparent  border-b-4 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#004D40] peer"
    placeholder=" "
  />
  <label
    htmlFor="floating_input"
    className="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0]  px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
  >
    Telephone
  </label>
</div>

          

    <button
      onClick={onSignup}
      className={`px-2 py-4 md:py-4 rounded-full mt-4 ${buttonDisabled || loading ? 'disabled-button' : 'enabled-button'}`}
      disabled={buttonDisabled || loading} 
    >
      Create your Volunta Organization account
    </button>

{/**this button is going to be used for google sign */}
    <button className="border-4 p-4">
        Google
    </button>

    <Link href='/organizationlogin' className="text-center text-sm hover:underline text-[#004D40]">Already have an account ? Sign in
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