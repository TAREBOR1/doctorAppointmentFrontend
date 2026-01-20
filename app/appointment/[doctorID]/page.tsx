"use client"

import { assets, docSlot, doctors, doctorType } from '@/assets/assets/assets_frontend/assets'
import RelatedDoctor from '@/components/RelatedDoctor'
import { Klee_One } from 'next/font/google'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
  const {doctorID}=useParams<{doctorID:string}>()
 const [docInf,setDocInf]=useState<doctorType|null>(null)
 const [docSlot,setDocSlot]=useState<docSlot[]>([])

 const [groupedSlots, setGroupedSlots] = useState<{[key: string]: docSlot[]}>({})

 const [slotIndex,setSlotIndex]=useState(0)
 const [selectedDate,setSelectedDate]=useState('')
 const [slotTime,setSlotTime]=useState('')
 const daysOfWeek=['SUN','MON','TUE','WED','THUR','FRI','SAT']

 const getAvailableSlot = async () => {
  const slots: docSlot[] = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    let currentDate = new Date(today);
    currentDate.setDate(today.getDate() + i);

    // start hour
    if (i === 0) {
      // today, start from current hour +1 or 10AM
      currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
      currentDate.setMinutes(currentDate.getMinutes() > 30 ? 0 : 30);
    } else {
      // future day, start 10:00
      currentDate.setHours(10);
      currentDate.setMinutes(0);
    }

    const endTime = new Date(currentDate);
    endTime.setHours(21, 0, 0, 0); // 9PM end

    // generate 30-min slots for this day
    while (currentDate < endTime) {
      const formattedTime = currentDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      slots.push({
        dateTime: new Date(currentDate),
        time: formattedTime,
      });

      // increment 30 mins
      currentDate.setMinutes(currentDate.getMinutes() + 30);
    }
  }

  // update state once
  setDocSlot(slots);
};


 // Group slots by day
  const groupSlotsByDay = (slots: docSlot[]) => {
    const grouped: {[key: string]: docSlot[]} = {};
    
    slots.forEach(slot => {
      const dateKey = slot.dateTime.toDateString(); // "Mon Jan 01 2024"
      
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      
      grouped[dateKey].push(slot);
    });
    
    return grouped;
  };


 const fetchInfo=()=>{
    const docInfo=doctors.find((doc)=>doc._id===doctorID)|| null 
    setDocInf(docInfo)
 }
 useEffect(()=>{
   fetchInfo()
 },[doctorID,docInf])



 useEffect(()=>{
getAvailableSlot()
 },[docInf])



   useEffect(() => {
    if (docSlot.length > 0) {
      setGroupedSlots(groupSlotsByDay(docSlot));
    }

  }, [docSlot]);

    const handleDateClick = (dateKey: string) => {
    setSelectedDate(dateKey);
    setSlotTime(''); 
  }
  return docInf && (
    <div>
         {/* doctor details */}
         <div className='flex flex-col sm:flex-row gap-4'>
          <div>
          <Image className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInf.image} alt={"doctor image"}/>
          </div>
          <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[80px] sm:mt-0'>
            {/* doctor info,name,exp */}
            <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>{docInf.name}  <Image className='w-5' src={assets.verified_icon} alt={"verified_icon"}/></p>
            <div className='flex items-center gap-2 text-sm mt-1 text-gray-600 '>
              <p>{docInf.degree}-{docInf.speciality}</p>
              <button className='py-0.5 px-2 border text-xs rounded-full'>{docInf.experience}</button>
            </div>
            <div>
              {/* doctor about */}
              <div>
                <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <Image src={assets.info_icon} alt={"info_icon"}/></p>
                <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInf.about}</p>
              </div>
              <p className='text-gray-500 font-medium mt-4'>Appoinment Fee: <span className='text-gray-600 font-bold'>${docInf.fees}</span></p>
            </div>
          </div>
         </div>
         {/* booking slot */}

         
         <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
          <p>Booking slots</p>

        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {Object.keys(groupedSlots).length > 0 && 
            Object.keys(groupedSlots).map((dateKey,index)=>{
               const date = new Date(dateKey);
               const isSelect=selectedDate===dateKey
            
              return(
                 <div onClick={() => handleDateClick(dateKey)} 
 className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${isSelect? 'bg-primary text-white':'border border-gray-200'}`} key={index}>
         <p>{daysOfWeek[date.getDay()]}</p>
         <p>{date.getDate()}</p>
              </div>
              )
            
          })}
        </div>

        <div>
          {
          selectedDate && groupedSlots[selectedDate] && (
            <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
              {groupedSlots[selectedDate].map((slot,index)=>(
                <p onClick={()=>{setSlotTime(slot.time)}} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${slot.time===slotTime?'bg-primary text-white':'text-gray-400 border border-gray-200'}`} key={index}>{slot.time.toLowerCase()}</p>
              ))}
            </div>
          )
          }
        </div>

        <div>
          <button className='bg-primary text-white font-light text-sm px-14 py-3 rounded-full my-6'>Book an apppointment</button>
        </div>
    {/* listing related doctors */}
    <RelatedDoctor doctorID={doctorID} specialty={docInf.speciality}/>
         </div>
    </div>
  )
}

export default page
