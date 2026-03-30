import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { serverUrl } from "../App"
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../redux/userSlice'
import { setMyShopData } from '../redux/ownerSlice'

function useGetMyShop() {
    const {userData} = useSelector(state=>state.user)
    const dispatch = useDispatch()
  useEffect(()=>{
    const fetchShop = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/shop/get-my`,{withCredentials:true})
            dispatch(setMyShopData(result?.data))
        } catch (error) {
            console.log(error?.response?.data)
        }
    }
    fetchShop()
    },[userData])
}

export default useGetMyShop
