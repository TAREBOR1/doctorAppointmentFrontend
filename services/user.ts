





import api from "@/config/api";
import { AxiosError } from "axios";
import { ApiError } from "./doctor";
import { StaticImageData } from "next/image";

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface authUser {
  user: User;
}

type address={
  line1:string;
  line2:string;
}

export interface UserProfile {
  address:address;
dob:string;
email:string;
gender:string;
image?:string|StaticImageData;
name:string;
phone:string;
}
export interface authResponse {
  success: boolean;
  message: string;
  token: string;
  user: User;
}
export interface updateResponse {
  success: boolean;
  message: string;
}

// Input types
export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface updateInput{
  address:address;
dob:string;
gender:string;
image:string|StaticImageData;
name:string;
phone:string;
}
export interface appointmentInput{
docId:string;
slotDate:string;
slotTime:string;
}




// Helper to save token
const saveToken = (token: string) => {
  localStorage.setItem("userToken", token);
};


export const register = async (data: RegisterInput): Promise<authResponse> => {
   try {
        const res = await api.post("/api/user/register", data);
  const { token } = res.data;
  saveToken(token);
  return res.data;
    } catch (err) {
       const error = err as AxiosError<ApiError>;
  throw error;
    }
};

export const login = async (data: LoginInput): Promise<authResponse> => {
    try {
         const res = await api.post("/api/user/login", data);
  const { token } = res.data;
  saveToken(token);
  return res.data;
    } catch (err) {
       const error = err as AxiosError<ApiError>;
  throw error;
    }
 
};

export const verify = async (): Promise<UserProfile | null> => {
    try {
       const res = await api.get("/api/user/verify");
    return res.data;
    } catch (err) {
       const error = err as AxiosError<ApiError>;
  throw error;
    }
};

export const logout = async (): Promise<void> => {
  localStorage.removeItem("userToken");
};


export const update = async (data: updateInput): Promise<updateResponse> => {
    try {
         const res = await api.post("/api/user/update", data);
  return res.data;
    } catch (err) {
       const error = err as AxiosError<ApiError>;
  throw error;
    }
};
export const bookAppointment = async (data: appointmentInput): Promise<updateResponse> => {
    try {
         const res = await api.post("/api/user/book-appointment", data);
  return res.data;
    } catch (err) {
       const error = err as AxiosError<ApiError>;
  throw error;
    }
};
export const getAppointment = async () => {
    try {
         const res = await api.get("/api/user/appointment-list");
  return res.data;
    } catch (err) {
       const error = err as AxiosError<ApiError>;
  throw error;
    }
};



