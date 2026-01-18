import { specialityData } from '@/assets/assets/assets_frontend/assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const SpecialtyMenu = () => {
  return (
    <div className='flex flex-col items-center gap-4 py-16 text-gray-800'>
      <h2 className='text-3xl font-medium'>Find by Specialty</h2>
      <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free</p>
      <div className='flex sm:justify-center gap-5 pt-5 overflow-scroll w-full'>
        {specialityData.map((Specialty,index)=>(
            <Link className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-1.5 transition-all duration-500' href={`/doctors/${Specialty.speciality}`} key={index}>
           <Image className='w-16 sm:w-24 mb-2' src={Specialty.image} alt={Specialty.speciality} width={16} height={16}/>
           <p>{Specialty.speciality}</p>
            </Link>
        ))}
      </div>
    </div>
  )
}

export default SpecialtyMenu
