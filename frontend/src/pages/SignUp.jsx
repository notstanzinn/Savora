import React, { useState } from 'react'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
import { ClipLoader } from "react-spinners"
import axios from "axios"
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
function SignUp() {
    const primaryColor = "#ff4d2d"
    const bgColor = "#fff9f6"
    const hoverColor = "#e64323"
    const borderColor = "#ddd"
    const [showPassword,setShowPassword] = useState(false)
    const [role,setRole]=useState("user")
    const navigate = useNavigate()
    const [fullName,setFullName]=useState("")
    const [email,setEmail]=useState("")
    const [mobile,setMobile]=useState("")
    const [password,setPassword]=useState("")
    const [err,setErr] = useState("")
    const [loading,setLoading]=useState(false)
    const dispatch = useDispatch()

    const handleSignUp = async(e)=>{
        setLoading(true)
  console.log("inside the handlesignup"); // If this doesn't show, the function isn't firing.
        try {
            const result = await axios.post(`${serverUrl}/api/auth/signup`,
               {fullName,email,password,mobile,role},
               {withCredentials:true})
               console.log(result)
               dispatch(setUserData(result.data))
               setErr("")
               setLoading(false)
        } catch (error) {
            setErr(error?.response?.data?.message)
            setLoading(false)
        }
    }
    const handleGoogleAuth = async() => {
        if(!mobile){
            return setErr("Mobile No is required!")
        }
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth,provider)
        // console.log(result)
        try {
            const {data} = await axios.post(`${serverUrl}/api/auth/google-auth`,{
                fullName : result.user.displayName,
                email: result.user.email,
                role,
                mobile
            },{withCredentials:true})

            // console.log(data)
            dispatch(setUserData(data))
        } catch (error) {
            console.log(error)
        }

    }
  return (
    <div className='min-h-screen w-full flex items-center justify-center p-4' style={{backgroundColor:bgColor}}>
      <div className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border`} style={{
        border:`1px solid ${borderColor}`
      }}>
        <h1 className={`text-3xl font-bold mb-2`} style={{color:`${primaryColor}`}}>Zomato</h1>
        <p className='text-gray-600 mb-8'>create an account to get started with delicious food deliveries</p>

        {/* {fullName} */}

        <div className='mb-4'>
            <label htmlFor="fullName" className='block text-gray-700 font-medium mb-1'>Full Name</label>
            <input type="text"className='w-full border rounded-lg px-3 py-2
                    focus:outline-none' placeholder='Enter your Name' style={{
        border:`1px solid ${borderColor}`
      }} onChange={(e)=>setFullName(e.target.value)} value={fullName} required/>

        </div>

        {/* {email} */}

        <div className='mb-4'>
            <label htmlFor="email" className='block text-gray-700 font-medium mb-1'>Email</label>
            <input type="email" className='w-full border rounded-lg px-3 py-2
                    focus:outline-none' placeholder='Enter your email' style={{
        border:`1px solid ${borderColor}`
      }} onChange={(e)=>setEmail(e.target.value)} value={email} required/>

        </div>
        {/* {mobile} */}

        <div className='mb-4'>
            <label htmlFor="mobile" className='block text-gray-700 font-medium mb-1'>Mobile</label>
            <input type="tel" className='w-full border rounded-lg px-3 py-2
                    focus:outline-none' placeholder='Enter your mobile number' style={{
        border:`1px solid ${borderColor}`
      }} onChange={(e)=>setMobile(e.target.value)} value={mobile} required/>

        </div>

        {/* {password} */}

        <div className='mb-4'>
            <label htmlFor="password" className='block text-gray-700 font-medium mb-1'>Password</label>
            <div className='relative'>
                <input type={`${showPassword?"text":"password"}`} className='w-full border rounded-lg px-3 py-2
                    focus:outline-none' placeholder='Enter your Name' style={{
                    border:`1px solid ${borderColor}`
                    }} onChange={(e)=>setPassword(e.target.value)} value={password} required/>
                <button className='absolute right-3 top-3.5 cursor-pointer text-gray-500' onClick={()=>setShowPassword(prev=>!prev)}>{!showPassword?<FaRegEye />:<FaRegEyeSlash />}</button>
            </div>
            
        </div>

        {/* {role} */}

        <div className='mb-4'>
            <label htmlFor="role" className='block text-gray-700 font-medium mb-1'>Role</label>
            <div className='flex gap-2'>
                {["user","owner","deliveryBoy"].map((r)=>(
                    <button className='flex-1 border rounded-lg px-3 py-2 text-center cursor-pointer font-medium transition-colors'
                    onClick={()=>setRole(r)} 
                    style={
                        role==r?
                        {backgroundColor:primaryColor,color:"white"}:
                        {border:`1px solid ${primaryColor}`,color:primaryColor}
                    }>{r}</button>
                ))}
            </div>
        </div>
            <button type='button' className={`w-full cursor-pointer font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323]`}
            onClick={handleSignUp} disabled={loading}>
                {loading ? <ClipLoader size={20} color='white'/> : "Sign Up"}
            </button>
            <p className='text-red-500 text-center my-2.5'>{err}</p>
            <button className='w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-100 cursor-pointer' onClick={handleGoogleAuth}><FcGoogle size={20}/><span>SignUp with Google</span></button>
            <p className='text-center mt-6' onClick={()=>navigate("/signin")}>Already have an account ? <span className='text-[#ff4d2d] cursor-pointer'>Sign In</span></p>
      </div>
      
    </div>
  )
}

export default SignUp
