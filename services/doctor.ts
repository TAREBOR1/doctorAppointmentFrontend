import api from "@/config/api";
import { AxiosError } from "axios";
import { StaticImageData } from "next/image";

type address={
  line1:string;
  line2:string;
}
export interface getDoc{
_id:string;
name:string;
image:string|StaticImageData;
speciality:string;
experience:string;
degree:string;
about:string;
available:boolean;
fees:number;
address:address
slot_booked:any
}

export interface allDocRes{
  success:boolean,
  data:getDoc[]
}

export interface ApiError{
    success:false;
    message:string
}

export const getDoctors=async():Promise<allDocRes>=>{
  try {
      const res = await api.get("/api/doctor/allDoctors");
  return res.data;
  } catch (err) {
        const error = err as AxiosError<ApiError>;
  throw error;
  }
}