import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { serverUrl } from "../App"
import { useDispatch, useSelector } from 'react-redux'
import { setItemsInMyCity, setUserData } from '../redux/userSlice'
import { setMyShopData } from '../redux/ownerSlice'

function useGetItemsBycity() {
    const {currentCity} = useSelector(state=>state.user)
    const dispatch = useDispatch()
  useEffect(()=>{
    const fetchItems = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/item/get-by-city/${currentCity}`,{withCredentials:true})
            dispatch(setItemsInMyCity(result?.data))
            console.log(result?.data)
        } catch (error) {
            console.log(error?.response?.data)
        }
    }
    fetchItems()
    },[currentCity])
}

export default useGetItemsBycity
