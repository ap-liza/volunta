'use client'
import { HiOutlineTrash } from "react-icons/hi"

export default function RemoveEvents(){
    return(
       <button className="text-red-400">
        <HiOutlineTrash size={24}/>
       </button>
    )
}