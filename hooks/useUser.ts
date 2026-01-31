"use client"


import { login, logout, register, update, verify } from "@/services/user"
import { useMutation, useQuery, useQueryClient, } from "@tanstack/react-query"
import toast from "react-hot-toast"

export const useAuth = () => {
  const queryClient = useQueryClient()

  const authQuery = useQuery({
    queryKey: ["auth"],
    queryFn: verify,
    retry: false
  })

  const registerMutation = useMutation({
    mutationFn: register,
      onSuccess: (data) => {
    toast.success(data.message);
    queryClient.invalidateQueries({queryKey:['auth']})
  },
  onError: (error: any) => {
    toast.error(
      error?.response?.data?.message || "error registering user"
    );
  },
  })

  const loginMutation = useMutation({
    mutationFn: login,
     onSuccess: (data) => {
    toast.success(data.message);
    queryClient.invalidateQueries({queryKey:['auth']})
  },
  onError: (error: any) => {
    toast.error(
      error?.response?.data?.message || "error validating user"
    );
  },
  })

  const updateMutation = useMutation({
    mutationFn: update,
     onSuccess: (data) => {
    toast.success(data.message);
    queryClient.invalidateQueries({queryKey:['auth']})
  },
  onError: (error: any) => {
    toast.error(
      error?.response?.data?.message || "error updating user"
    );
  },
  })



  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess:()=>{
      toast.success('Logout successfully')
     queryClient.setQueryData(["auth"], null);
    }
  })


  return {
    user: authQuery.data,
    isLoading: authQuery.isLoading,
    isAuthenticated: !!authQuery.data,
    register: registerMutation,
    login: loginMutation,
    logout: logoutMutation,
    updateProfile:updateMutation,

  }
}
