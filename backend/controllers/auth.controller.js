import { response } from "express"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import genToken from "../utils/token.js"
import { sendOtpMail } from "../utils/mail.js"

export const signUp = async(req,res) => {
    try{
        const{fullName,email,password,mobile,role} = req.body
        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({message:"User already exist!"})
        }
        if(password.length<6){
            return res.status(400).json({message:"Minimum password length should be 6 characters"})
        }
        if(mobile.length<10){
            return res.status(400).json({message:"Invalid mobile number"})
        }
        const hashedPassword = await bcrypt.hash(password,10)
        user = await User.create({
            fullName,
            email,
            role,
            mobile,
            password:hashedPassword
        })

        const token = await genToken(user._id)
        res.cookie("token",token,{
            secure:true,
            sameSite:"none",
            maxAge:7*24*60*60*1000,
            httpOnly:true
        })

        return res.status(201).json(user)
            
    }
    catch(error){
        return res.status(500).json(`sign up error : ${error}`)
    }
}

export const signIn = async(req,res) => {
    try{
        const{email,password} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"User doesn't exist!"})
        }

        const isMatched = await bcrypt.compare(password,user.password)
        if(!isMatched){
            return res.status(400).json("Incorrect password")
        }

        const token = await genToken(user._id)
        res.cookie("token",token,{
            secure:true,
            sameSite:"none",
            maxAge:7*24*60*60*1000,
            httpOnly:true
        })

        return res.status(200).json(user)
            
    }
    catch(error){
        return res.status(500).json(`sign in error : ${error}`)
    }
}

export const signOut = async(req,res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({message:"Logged out successfully"})
    } catch (error) {
        return res.status(500).json(`sign out error : ${error}`)
    }

}

export const sendOtp = async(req,res) => {
    try {
        const {email} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"User doesn't exist!"})
        }
        const otp = Math.floor(1000 + Math.random() * 9000).toString()
        user.resetOtp=otp
        user.otpExpires = Date.now() + 5*60*1000 // expiring otp after 5 minutes
        user.isOtpVerified=false
        await user.save()

        await sendOtpMail(email,otp)
        return res.status(200).json({message:"OTP Sent Successfully!"})
    } catch (error) {
        return res.status(500).json(`otp send error : ${error}`)
    }
}

export const verifyOtp = async(req,res) => {
    try {
        const {email,otp} = req.body
        const user = await User.findOne({email})
        if(!user || user.resetOtp!=otp || user.otpExpires<Date.now()){
            return res.status(400).json({message:"Invalid/Expired OTP"})
        }
        user.isOtpVerified = true
        user.resetOtp = undefined
        user.otpExpires = undefined
        await user.save()
        return res.status(200).json({message:"OTP Verified Successfully!"})
    } catch (error) {
        return res.status(500).json(`otp verify error : ${error}`)
    }
}

export const resetPassword = async(req,res) => {
    try {
        const {email,newPassword} = req.body
        const user = await User.findOne({email})
        if(!user || !user.isOtpVerified){
            return res.status(400).json({message:"OTP Verification Required!"})
        }
        const hashedPassword = await bcrypt.hash(newPassword,10)
        user.password = hashedPassword
        user.isOtpVerified = false
        await user.save()
        return res.status(200).json({message:"Password Reset Successfully!"})
    } catch (error) {
         return res.status(500).json(`password reset error : ${error}`)
    }
}

export const googleAuth = async (req,res) => {
        try {
            const {email,fullName,mobile,role} = req.body
            let user = await User.findOne({email})
            if(!user) //then create new user
            {
                user = await User.create({
                    email,fullName,mobile,role
                })
            }

            const token = await genToken(user._id)
        res.cookie("token",token,{
            secure:true,
            sameSite:"none",
            maxAge:7*24*60*60*1000,
            httpOnly:true
        })

        return res.status(201).json(user)
        } catch (error) {
            return res.status(500).json(`google auth error : ${error}`)
        }
}
