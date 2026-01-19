"use client"

import React, { useEffect, useState } from 'react'
import { doctors, doctorType} from '@/assets/assets/assets_frontend/assets'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useParams } from 'next/navigation'

const page = () => {
  const {specialty}=useParams()
  const [filterDoc,setFilterDoc]=useState<doctorType[]>([])
  const router=useRouter()

  const applyFilter=()=>{
    if(specialty){
      setFilterDoc(doctors.filter(item=>item.speciality===specialty))
    }else{
      setFilterDoc(doctors)
    }
  }
 const specialties = [
    "General Physician",
    "Gastroenterologist",
    "Paedatrician",
    "Dermatologist",
    "Gynecologist",
    "Neurologist",
  ];

  useEffect(()=>{
  applyFilter()
  },[doctors,specialty])

  return (
    <div>
      <p className='text-gray-600'>Browse through doctors specialist</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <div className='flex-col gap-4 text-sm text-gray-600'>
          {specialties.map((sp,index)=>(
     <p key={index} onClick={()=>{specialty===sp?router.push(`/doctors`):router.push(`/doctors/${sp}`)}} className={`w-[94vh] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${specialty===sp? 'bg-indigo-100 text-black':''}`}>{sp}</p>
          ))}
        </div>
        <div className='grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 gap-y-6 w-full' >
      {
        filterDoc.map((doctor,index)=>(
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
