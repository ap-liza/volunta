'use client'

import { useState } from "react"
import axios from "axios";
import toast from "react-hot-toast";



export default function Searchbar(){

  
      
  

    return(
        <>
         <div className='flex-1 relative'>

            <div className='relative'>
              {/**input for search bar */}
              <input 
              
              type="text"
              placeholder='Search here.....'
              className='w-full p-4 rounded-full bg-transparent border border-[#004D40] focus:outline-none'
              />
              
              <button 
              
              className='absolute right-1 top-1/2 -translate-y-1/2 p-4 bg-gradient-to-r from-[#FF9F8B] to-[#FF6F61] rounded-full '>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-4 h-4 text-[#F9F7F7]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m0 0a7.5 7.5 0 111.5-1.5l6 6z"
                />
              </svg>
              </button>

              
              
            </div>
          </div>
        </>
    )
}