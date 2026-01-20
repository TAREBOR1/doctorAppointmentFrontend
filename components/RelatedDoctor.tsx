"use client"

import { doctors, doctorType} from '@/assets/assets/assets_frontend/assets'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import React, { useEffect, useState } from 'react'


type DoctorProp={
  doctorID:string;
  specialty:string;
}

const RelatedDoctor:React.FC<DoctorProp> = ({doctorID,specialty}) => {
    const router=useRouter()
    const [relDoc,setRelDoc]=useState<doctorType[]>([])
    useEffect(()=>{
    if(doctors.length>0 && specialty){
      const doctorData= doctors.filter((doc)=>doc.speciality===specialty && doc._id!==doctorID)
      setRelDoc(doctorData)
    }
    },[doctorID,doctors,specialty])
  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-800 md:mx-10'>
      <h2 className='text-3xl font-medium'>Related Doctor</h2>
      <p className='w-full text-center text-sm'>Simply browse through our extensive list of related doctors</p>
      <div className='grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-y-6 px-3 sm:px-0 gap-5 pt-5 w-full'>
        {relDoc.slice(0,5).map((doctor,index)=>(
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
        ))}
      </div>
      {/* <button onClick={()=>{router.push('/doctors')}} className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10'>more</button> */}
    </div>
  )
}

export default RelatedDoctor
