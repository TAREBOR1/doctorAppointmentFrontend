"use client"

import { useState } from "react"

const page = () => {
    const [state, setState] = useState("Sign up")

    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: ''
    })

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

    }

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    return (
        <div className="justify-center items-center min-h-[80vh] flex ">

     
        <form
            onSubmit={handleSubmit}
            className="sm:min-w-96 min-w-[340px] border rounded-xl border-gray-100 text-center  px-8 shadow-lg">
            <h1 className="text-white text-3xl mt-10 font-medium">
                {state === "login" ? "Login" : "Sign up"}
            </h1>

            <p className="text-gray-400 text-xl font-semibold mt-2">{state==="Sign up"?"Create Account":"Login"}</p>
            <p className="text-gray-600 text-sm  ">Please {state==="Sign up"?"sign up":"log in"} to book Appoinment</p>

            {state === "Sign up" && (
                <div className="flex items-center mt-6 w-full border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2 ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <circle cx="12" cy="8" r="5" /> <path d="M20 21a8 8 0 0 0-16 0" /> </svg>
                    <input type="text" name="fullname" placeholder="Full name" className="w-full bg-transparent text-gray-600 placeholder-gray-400 border-none outline-none " value={formData.fullname} onChange={handleChange} required />
                </div>
            )}

            <div className="flex items-center w-full mt-4  border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2 ">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /> <rect x="2" y="4" width="20" height="16" rx="2" /> </svg>
                <input type="email" name="email" placeholder="Email address" className="w-full bg-transparent text-gray-600 placeholder-gray-400 border-none outline-none " value={formData.email} onChange={handleChange} required />
            </div>

            <div className=" flex items-center mt-4 w-full  border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2 ">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <rect width="18" height="11" x="3" y="11" rx="2" ry="2" /> <path d="M7 11V7a5 5 0 0 1 10 0v4" /> </svg>
                <input type="password" name="password" placeholder="Password" className="w-full bg-transparent text-gray-600 placeholder-gray-400 border-none outline-none" value={formData.password} onChange={handleChange} required />
            </div>

            <div className="mt-4 text-left">
                <button className="text-sm text-primary hover:underline">
                    Forget password?
                </button>
            </div>

            <button type="submit" className="mt-2 w-full h-11 rounded-full text-white bg-primary hover:bg-indigo-500 transition " >
                {state === "login" ? "Login" : "Create Account"}
            </button>

            <p onClick={() => setState(prev => prev === "login" ? "Sign up" : "login") } className="text-gray-400 text-sm mt-3 mb-11 cursor-pointer" >
                {state === "login" ? "Don't have an account?" : "Already have an account?"}
                <span className="text-primary hover:underline ml-1">click here</span>
            </p>
        </form>
        </div>
    )
}

export default page