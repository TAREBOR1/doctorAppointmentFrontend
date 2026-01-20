"use client"

import { assets } from '@/assets/assets/assets_frontend/assets'
import Image from 'next/image'
import React, { useState } from 'react'

const page = () => {
    const [userData,setUserData]=useState({
        fullname:"Edward john",
        image:assets.profile_pic,
        email:"johndoe@gmail.com",
        phone:"12345678",
        address:{
            line1:"akintola",
            line2:"adeniyi"
        },
        gender:'male',
        dob:"2000-10-10"

    })
    const [isEdit,setIsEdit]=useState(true)
  return (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>

        <Image className='w-36 rounded' src={userData.image} alt={"user_image"}/>
       {isEdit?<input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4' type='text' value={userData.fullname} onChange={(e)=>{setUserData((prev)=>({...prev,fullname:e.target.value}))}}/>:<p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.fullname}</p>}
           <hr className='bg-zinc-400 h-px border-none' />
           <div>
            <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
            <div className='grid grid-cols-[1fr_3fr] gap-y-3 mt-3 text-neutral-700'>
                <p className='font-medium'>Email Address:</p>
                <p className='text-blue-500'>{userData.email}</p>
                 <p className='font-medium'>Phone Number:</p>
                        {isEdit?<input className='bg-gray-50 max-w-52 ' type='text' value={userData.phone} onChange={(e)=>{setUserData((prev)=>({...prev,phone:e.target.value}))}}/>:<p className='text-blue-400'>{userData.phone}</p>}
                        <p className='font-medium'>Address:</p>
                     {isEdit?<p>
                        <input type='text' className='bg-gray-50' value={userData.address.line1} onChange={(e)=>{setUserData((prev)=>({...prev,phone:e.target.value}))}}/> <br/>
                        <input type='text' className='bg-gray-50' value={userData.address.line2} onChange={(e)=>{setUserData((prev)=>({...prev,phone:e.target.value}))}}/>
                        </p>:<p className='text-gray-500'>{userData.address.line1}<br/>{userData.address.line2}</p>
                     }    

            </div>
          
           </div>
           <div>
            <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
            <div className='grid grid-cols-[1fr_3fr] gap-y-3 mt-3 text-neutral-700'>
                <p className='font-medium'>Gender:</p>
                 {isEdit?<select className='max-w-20 bg-gray-100' value={userData.gender} onChange={(e)=>{setUserData((prev)=>({...prev,gender:e.target.value}))}}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                 </select>:<p className='text-gray-400'>{userData.gender}</p>}
                 <p className='font-medium'>Birthday:</p>
                    {isEdit?<input className='max-w-28 bg-gray-100' type='date' value={userData.dob} onChange={(e)=>{setUserData((prev)=>({...prev,dob:e.target.value}))}}/>:<p className='text-gray-400'>{userData.dob}</p>}
            </div>
            <div className='mt-10'>
                {isEdit? <button  className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-500" onClick={()=>(setIsEdit(false))}>
               Save information 
                </button>:<button className="border border-primary px-8 py-4 rounded-full hover:bg-primary hover:text-white transition-all duration-500" onClick={()=>(setIsEdit(true))}>
                    Edit
                    </button>}
            </div>
           </div>
    </div>


  )
}

export default page
