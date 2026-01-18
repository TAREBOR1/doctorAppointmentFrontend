"use client"

import React, { useEffect, useState } from 'react'
import { doctors, doctorType} from '@/assets/assets/assets_frontend/assets'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const page = () => {

  const router=useRouter()

  return (
    <div>
      <p>Browse through doctors specialist</p>
      <div>
        <div>
          <p>General Physician</p>
          <p>Gastroenterologit</p>
          <p>paedatrician</p>
          <p>Dermatologist</p>
          <p>Gynecologist</p>
          <p>Neurologist</p>
        </div>
        <div>
      {
        doctors.map((doctor,index)=>(
                    <div onClick={()=>{router.push(`/appointment/${doctor._id}`)}} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-4 transition-all duration-500' key={index}>
                     <Image className='bg-blue-50' src={doctor.image} alt={doctor.name}/>
                     <div className='p-4'>
                        <div className='flex items-center gap-2 text-sm text-center text-green-400'>
                            <p className='rounded-full bg-green-500 h-2 w-2'></p>
                            <p>Available</p>
                        </div>
                        <p className='text-gray-900 font-medium text-lg'>{doctor.name}</p>
                        <p className='text-gray-600 text-sm'>{doctor.speciality}</p>
                     </div>
                    </div>
                ))
      }
        </div>
      </div>
    </div>
  )
}

export default page
