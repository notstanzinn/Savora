import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { serverUrl } from '../App'
import { IoIosArrowRoundBack } from "react-icons/io";
import DeliveryBoyTracking from '../components/DeliveryBoyTracking';
import { useSelector } from 'react-redux';
function TrackOrderPage() {
    const {socket} = useSelector(state=>state.user)
    const {orderId} = useParams()
    const [liveLocation,setLiveLocation] = useState({})
    const [currentOrder,setCurrentOrder] = useState()
    const handleGetOrder = async()=>{
        try {
            const result = await axios.get(`${serverUrl}/api/order/get-order-by-id/${orderId}`,{withCredentials:true})
            setCurrentOrder(result.data)
            // console.log(result.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        socket.on('updateDeliveryLocation',({deliveryBoyId,latitude,longitude})=>{
                 setLiveLocation(prev=>({
                    ...prev,
                    [deliveryBoyId] : {lat:latitude,lon:longitude}
                 }))
        })
    },[])

    useEffect(()=>{
        handleGetOrder()
    })
    const navigate = useNavigate()
    
  return (
    <div className='max-w-4xl mx-auto p-4 flex flex-col gap-6'>
      <div className="relative flex items-center gap-4 top-5 left-5 z-10 mb-2.5"
        onClick={() => navigate("/")}>
              <IoIosArrowRoundBack size={35} className="text-[#ff4d2d] " />
              <h1 className='text-bold font-2xl md:text-center'>Track Order</h1>
      </div>
      {currentOrder?.shopOrders?.map((shopOrder,index)=>(
        <div key={index} className='bg-white rounded-2xl shado-md border border-orange-200 space-y-4 p-4 '>
            <div>
            <p className='text-lg font-bold text-[#ff4d2d] mb-2'>{shopOrder.shop.name}</p>
            <p className='font-semibold'><span>Items:</span> {shopOrder?.shopOrderItems.map(i=>i.name).join(",")}</p>
            <p><span className='font-semibold'>Subtotal:</span> {shopOrder.subtotal}</p>
            <p className='mt-6'><span className='font-semibold'>Delivery Address:</span> {currentOrder.deliveryAddress.text}</p>
            </div>
        {shopOrder.status!="delivered"?
        <>
        {shopOrder.assignedDeliveryBoy?<div className='text-sm text-gray-700'>
            <p className='font-semibold'><span>Delivery Boy Name:</span> {shopOrder.assignedDeliveryBoy.fullName}</p>
            <p className='font-semibold'><span>Delivery Boy Mobile:</span> {shopOrder.assignedDeliveryBoy.mobile}</p>
        </div>:<p>Delivery boy is not assigned yet</p>}
        </>
        :<p className='text-green-600 font-semibold text-lg'>Delivered</p>}
        {shopOrder.assignedDeliveryBoy && shopOrder.status!="delivered" && 
            <div className='h-100 w-full rounded-2xl overflow-hidden shadow-md'>
                <DeliveryBoyTracking data={{
            deliveryBoyLocation: liveLocation[shopOrder.assignedDeliveryBoy._id] || {
                lat:shopOrder.assignedDeliveryBoy.location.coordinates[1],
                lon : shopOrder.assignedDeliveryBoy.location.coordinates[0]
            },
            customerLocation:{
                lat : currentOrder.deliveryAddress.latitude,
                lon : currentOrder.deliveryAddress.longitude
            }
        }}/>
            </div>
        }
        </div>
      ))}
    </div>
  )
}

export default TrackOrderPage
