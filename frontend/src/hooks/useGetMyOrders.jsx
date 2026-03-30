import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { serverUrl } from "../App"
import { useDispatch, useSelector } from 'react-redux'
import { setMyOrders} from '../redux/userSlice'


function useGetMyOrders() {
    const {userData} = useSelector(state=>state.user)
    const dispatch = useDispatch()
  useEffect(()=>{
    const fetchOrder = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/order/my-orders`,{withCredentials:true})
            dispatch(setMyOrders(result?.data))
            console.log(result?.data)
        } catch (error) {
            console.log(error?.response?.data)
        }
    }
    fetchOrder()
    },[userData])
}

export default useGetMyOrders
