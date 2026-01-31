const TopDoctorSkeleton = () => {
  return (
    <> 
    
      <div className='grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-y-6 px-3 sm:px-0 gap-5 pt-5 w-full'>
        {Array.from({ length: 10 }).map((_, index) => (
          <div className='border border-gray-200 rounded-xl overflow-hidden shadow-sm' key={index}>
            {/* Image skeleton */}
            <div className='h-48 bg-linear-to-r from-gray-100 via-gray-50 to-gray-100 animate-pulse bg-[length:200%_100%] animate-shimmer'></div>
            
            <div className='p-4 space-y-3'>
              {/* Availability indicator skeleton */}
              <div className='flex items-center gap-2'>
                <div className='h-3 w-3 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full animate-pulse bg-[length:200%_100%] animate-shimmer'></div>
                <div className='h-3 w-20 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse bg-[length:200%_100%] animate-shimmer'></div>
              </div>
              
              {/* Name skeleton */}
              <div className='h-5 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse bg-[length:200%_100%] animate-shimmer w-3/4'></div>
              
              {/* Speciality skeleton */}
              <div className='h-4 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse bg-[length:200%_100%] animate-shimmer w-1/2'></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Button skeleton */}
      <div className='h-12 w-40 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full mt-10 animate-pulse bg-[length:200%_100%] animate-shimmer'></div>

    </>
  )
}

export default TopDoctorSkeleton