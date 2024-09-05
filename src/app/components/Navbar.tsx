'use client'

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Image from 'next/image';
import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';


export default function Navbar() {

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const [clicks, setClicks] = useState(false)

  const toggleMenuBar =()=>{
    setClicks(!clicks)
  }


  const openSearch = () => {
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };
  

  return (
    <>
      <nav className="absolute top-0 left-0 w-[100%] h-[80px] p-[30px] flex shadow-lg justify-between overflow-x-hidden z-20 bg-[#004D40] " >

      

        <Link href='/' className="text-[#F9F7F7]">VOLUNTA</Link>

        <div className="flex items-center">
          <ul className="absolute opacity-0 left-[100%] hidden  md:relative md:flex md:gap-[40px] md:left-0 md:opacity-[1]">

            <li><Link 
            className="li relative  text-[#F9F7F7]  " 
            href='/'>Events</Link></li>

            <li><Link className=" li relative text-[#F9F7F7]" href='/'>Blog</Link></li>

            <li><Link className="li relative text-[#F9F7F7]" href='/'>Contact</Link></li>

            <li><Link className="li relative text-[#F9F7F7] " href='/login'>Sign in</Link></li>
          </ul>

          
          {/**mobile menu */}
          <div 
          onClick={toggleMenuBar}
          className="cursor-pointer md:hidden ">
          
          {clicks ? (
                <svg  className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#F9F7F7" >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"/>
                </svg>
              ):
              (
                <svg  className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#F9F7F7">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"/>
                </svg>
              )}
          </div>


          <div className="relative flex justify-center items-center z-10 cursor-pointer left-6">
          <span className="flex gap-4">

          <FontAwesomeIcon 
          icon={faMagnifyingGlass}
          color="white"
          onClick={openSearch}
          
          />

          <FontAwesomeIcon
           icon={faX}
           color="white"
           className="mr-4"
           style={{ opacity: isSearchOpen ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}
           onClick={closeSearch}
           />

           
          </span>

          
          </div>


           {/**searchbox input */}

          <div className={`searchbox  absolute w-[100%]    flex   items-center  ${isSearchOpen ? 'left-0' : 'right-[-100%]'}  `}>

          <input 
            type="text"
            placeholder="Search..."
            className="w-[100%] outline-none h-[50px]   "
          />

        </div>
         
        </div>

        
       

       
          
      
        
      </nav>


      <div className={`mobile-nav fixed top-[80px] left-0 w-full h-full md:hidden bg-white shadow-lg z-20 transform transition-transform duration-500 ease-in-out ${clicks ? 'translate-x-0' : '-translate-x-full'}`}>

      <ul className="flex flex-col justify-center p-10 items-center gap-6">

        <li ><Link 
        className="li mob relative text-[16px]  " 
        href='/'>Events</Link></li>

        <li ><Link className=" li mob relative" href='/'>Blog</Link></li>

        <li><Link className="li mob relative" href='/'>Contact</Link></li>

        <li><Link className="li mob relative" href='/login'>Sign in</Link></li>
      </ul>

      </div>
    </>
  )
}