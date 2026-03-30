import React, { useState } from 'react'
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

function ForgotPassword() {
    const [step,setstep]=useState(1)
    const [email,setEmail]=useState("")
    const navigate = useNavigate()
    const [otp,setOtp] =useState("")
    const [newPassword,setNewPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")
    const [err,setErr]=useState("")
    const [loading,setLoading]=useState(false)

    const handleSendOtp = async() => {
        setLoading(true)
        try {
            const result = await axios.post(`${serverUrl}/api/auth/send-otp`,{email},{withCredentials:true})
            console.log(result)
            setErr("")
            setstep(2)
            setLoading(false)
        } catch (error) {
            setErr(error?.response?.data?.message)
            setLoading(false)
        }
    }
    const handleVerifyOtp = async() => {
        setLoading(true)
        try {
            const result = await axios.post(`${serverUrl}/api/auth/verify-otp`,{email,otp},{withCredentials:true})
            console.log(result)
            setErr("")
            setstep(3)
            setLoading(false)
        } catch (error) {
            setErr(error?.response?.data?.message)
            setLoading(false)
        }
    }
    const handleResetPassword = async() => {
        if(newPassword!=confirmPassword){
            return null
        }
        setLoading(true)
        try {
            const result = await axios.post(`${serverUrl}/api/auth/reset-password`,{email,newPassword},{withCredentials:true})
            console.log(result)
            setErr("")
            setLoading(false)
            navigate("/signin")
        } catch (error) {
            setErr(error?.response?.data?.message)
            setLoading(false)
        }
    }
  return (
    <div className='flex items-center w-full justify-center min-h-screen p-4 bg-[#fff9f6]'>
        <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-8'>
            <div className='flex item-center gap-4 mb-4'>
                <IoArrowBack size={30} className='text-[#ff4d2d] cursor-pointer' onClick={()=>navigate("/signin")}/>
                <h1 className='text-2xl font-bold text-center text-[#ff4d2d]'>Forgot Password</h1>
            </div>
            {step == 1
             &&
             <div>
                <div className='mb-6'>
                <label htmlFor="email" className='block text-gray-700 font-medium mb-1'>Email</label>
                <input type="email" className='w-full border border-gray-200 rounded-lg px-3 py-2
                focus:outline-none' placeholder='Enter your email' onChange={(e)=>setEmail(e.target.value)} value={email} required/>
                </div>
                <button type='button' className={`w-full cursor-pointer font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323]`} onClick={handleSendOtp} disabled={loading}>
                    {loading ? <ClipLoader size={20} color='white'/> : "Send OTP"}
                
            </button>
            <p className='text-red-500 text-center my-2.5'>{err}</p>
             </div>
            }
            {step == 2
             &&
             <div>
                <div className='mb-6'>
                <label htmlFor="otp" className='block text-gray-700 font-medium mb-1'>OTP</label>
                <input type="tel" className='w-full border border-gray-200 rounded-lg px-3 py-2
                focus:outline-none' placeholder='Enter your OTP' onChange={(e)=>setOtp(e.target.value)} value={otp} required/>
                </div>
                <button type='button' className={`w-full cursor-pointer font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323]`} onClick={handleVerifyOtp} disabled={loading}>
                {loading ? <ClipLoader size={20} color='white'/> : "Verify"}
                
            </button>
            <p className='text-red-500 text-center my-2.5'>{err}</p>
             </div>
            }
            {step == 3
             &&
             <div>
                <div className='mb-6'>
                <label htmlFor="newPassword" className='block text-gray-700 font-medium mb-1'>New Password</label>
                <input type="email" className='w-full border border-gray-200 rounded-lg px-3 py-2
                focus:outline-none' placeholder='Enter New Password' onChange={(e)=>setNewPassword(e.target.value)} value={newPassword} required/>

                <label htmlFor="confirmPassword" className='block text-gray-700 font-medium mb-1'>Confirm Password</label>
                <input type="email" className='w-full border border-gray-200 rounded-lg px-3 py-2
                focus:outline-none' placeholder='Confirm New Password' onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword} required/>
                </div>

                <button type='button' className={`w-full cursor-pointer font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323]`} onClick={handleResetPassword} disabled={loading}>
                {loading ? <ClipLoader size={20} color='white'/> : "Reset Password"}
                
            </button>
            <p className='text-red-500 text-center my-2.5'>{err}</p>
             </div>
            }
            
        </div>
    </div>
  )
}

export default ForgotPassword
