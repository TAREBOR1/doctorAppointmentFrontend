"use client";
import { assets } from "@/assets/assets/assets_frontend/assets";
import { MenuIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [token,setToken]=useState(true)
  const [loading,setLoading]=useState(true)
  const [open,setOpen]=useState(false)
  const router=useRouter()

  return (
    <>
      <nav className="fixed top-0 z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-32 backdrop-blur border-b border-b-gray-300">
        <Link href="/">
          <Image
            className="h-8.5 w-auto"
            src={assets.logo}
            alt="logo"
            width={130}
            height={34}
            priority
          />
        </Link>

        <div className="hidden md:flex items-center gap-8 transition duration-500">
          <Link href={"/"} className="hover:bg-blue-700 transition">
            Home
          </Link>
          <Link href={"/doctors"} className="hover:bg-blue-700 transition">
            All Doctors
          </Link>
          <Link href={"/about"}>About</Link>
          <Link href={"/contact"} className="hover:bg-blue-700 transition">
            Contact Us
          </Link>
        </div>
        <div className="flex items-center gap-2">


            {loading && (
  token ? (
    <div className="relative">
      <button
        className=" flex items-center gap-2 cursor-pointer"
        onClick={() => setOpen(!open)}>
        <Image src={assets.profile_pic} width={40} alt="profile pic" className="rounded-full" height={40}></Image>
        <Image src={assets.dropdown_icon} width={10} alt="profile pic" className="" height={5}></Image>
      </button>

      {open && (
        <div className="absolute top-10 right-0 pt-2 ">
          <div
            className="bg-stone-100 border-2 z-10 flex flex-col gap-3 mt-2 border-white/10 px-4 py-4 whitespace-nowrap rounded min-w-[180px]text-left"
          >
            <p onClick={()=>{router.push('/myprofile')}} className="text-black cursor-pointer">My profile</p>
            <p onClick={()=>{router.push('/myappointment')}} className="text-black cursor-pointer">my appointment</p>
            <p className="text-black cursor-pointer">Logout</p>
          </div>
        </div>
      )}
    </div>
  ) : (
    <button
      className="hidden md:block px-6 py-2.5 bg-primary hover:bg-blue-700 active:scale-95 text-gray-100 transition-all rounded-full"
      onClick={() => router.push("/login")}
    >
      Get started
    </button>
  )
)}


          

          <button onClick={() => setIsOpenMenu(true)} className="md:hidden">
            <MenuIcon size={26} className="active:scale-90 transition" />
          </button>
        </div>
      </nav>





      <div
        className={`fixed inset-0 z-100 bg-black/40 backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-400 ${isOpenMenu ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Link href={"/"}>Home</Link>
        <Link onClick={() => setIsOpenMenu(false)} href={"/doctors"}>
          All Doctors
        </Link>
        <Link onClick={() => setIsOpenMenu(false)} href={"/about"}>
          About
        </Link>
        <Link onClick={() => setIsOpenMenu(false)} href={"/contact"}>
          Contact Us
        </Link>
        <Link onClick={() => setIsOpenMenu(false)} href={"/login"}>
          Login
        </Link>
        <button
          onClick={() => setIsOpenMenu(false)}
          className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-primary hover:bg-blue-700 transition text-white rounded-md flex"
        >
          <XIcon />
        </button>
      </div>
    </>
  );
}
