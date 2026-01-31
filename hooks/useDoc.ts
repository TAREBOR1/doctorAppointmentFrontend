"use client"

import { getDoctors } from "@/services/doctor";
import { bookAppointment, getAppointment } from "@/services/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useFunc=()=>{
   const queryClient = useQueryClient()
  
  const docQuery=useQuery({
    queryKey:['doc'],
    queryFn:getDoctors,
     retry: false
  })

  const appointmentQuery=useQuery({
    queryKey:['appointment'],
    queryFn:getAppointment,
    retry:false
  })

    const bookMutation = useMutation({
    mutationFn: bookAppointment,
     onSuccess: (data) => {
    toast.success(data.message);
    queryClient.invalidateQueries({queryKey:['doc']})
  },
  onError: (error: any) => {
    toast.error(
      error?.response?.data?.message || "error booking appointment"
    );
  },
  })

  return {
    doctors:docQuery.data?.data,
    isLoading:docQuery.isLoading,
    bookAppointment:bookMutation,
    loadingAppointment:appointmentQuery.isLoading,
    appointment:appointmentQuery.data
  }
}