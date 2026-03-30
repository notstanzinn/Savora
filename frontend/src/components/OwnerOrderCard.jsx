import axios from 'axios';
import React, { useState } from 'react'
import { MdPhone } from "react-icons/md";
import { serverUrl } from '../App';
import { useDispatch } from 'react-redux';
import { updateOrderStatus } from '../redux/userSlice';

function OwnerOrderCard({data}) {
  const [availableBoys,setAvailableBoys] = useState([])
  const dispatch = useDispatch()
  const handleUpdateStatus = async (orderId,shopId,status) => {
    try {
      const result = await axios.post(`${serverUrl}/api/order/update-status/${orderId}/${shopId}`,{status},{withCredentials:true})
      // console.log(result.data)
      dispatch(updateOrderStatus({orderId,shopId,status}))
      setAvailableBoys(result.data.availableBoys)
      console.log(result.data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='bg-white shadow rounded-lg p-4 space-y-4'>
      <div>
    <h2 className='text-lg font-semibold text-gray-800'>{data.user.fullName}</h2>
      <p className='text-sm text-gray-500'>{data.user.email}</p>
      <p className='flex items-center mt-1 gap-2 text-sm text-gray-600'><MdPhone /><span>{data.user.mobile}</span></p>
      {data.paymentMethod=="online"?<p className='gap-2 text-sm text-gray-600'>payment: {data.payment?"True":"False"}</p>:<p className='gap-2 text-sm text-gray-600'>Payment Method: {data.paymentMethod}</p>}
      
      </div>
      <div className='flex items-start flex-col gap-2 text-gray-600 text-sm'>
        <p>{data?.deliveryAddress?.text}</p>
        <p className='text-gray-500 text-sm'>Lat: {data?.deliveryAddress?.latitude} , Lon: {data?.deliveryAddress?.longitude}</p>
      </div>

      <div className='flex pb-2 space-x-4 overflow-x-auto'>
            {data.shopOrders?.shopOrderItems?.map((item, i) => (
              <div key={i} className='shrink-0 p-2 bg-white w-40 border rounded-lg'>
                <img src={item?.item?.image} alt="" className='rounded w-full h-24 object-cover'/>
                <p className='text-sm font-semibold mt-1'>{item.name}</p>
                <p className='text-xs text-gray-500'>Qty: {item.quantity} x ₹{item.price}</p>
              </div>
            ))}
          

      </div>

      <div className='justify-between flex border-gray-100 items-center pt-3 mt-auto border-t '>
        <span className='text-sm'>status: <span className='font-semibold capitalize text-[#ff4d2d]'>{data.shopOrders.status}</span></span>
        
        <select className='rounded-md border px-3 py-1 text-sm text-[#ff4d2d] border-[#ff4d2d] focus:outline-none focus:ring-2' onChange={(e)=>handleUpdateStatus(data._id,data.shopOrders.shop._id,e.target.value)}>
            <option value="">change</option>
            <option value="pending">pending</option>
            <option value="preparing">preparing</option>
            <option value="out for delivery">out for delivery</option>
        </select>

      </div>
      {data.shopOrders.status=="out for delivery" && 
        <div className='mt-3 p-2 border rounded-lg text-sm bg-orange-50'>
          {data.shopOrders.assignedDeliveryBoy?<p>Assigned Delivery Boy:</p>:<p>Available Delivery Boys:</p>}
          {availableBoys.length>0?(
            availableBoys.map((b,index)=>(
              <div className='text-gray-700'>
                {b.fullName}-{b.mobile}
              </div>
            ))
          ):data.shopOrders.assignedDeliveryBoy? <div>{data.shopOrders.assignedDeliveryBoy.fullName}-{data.shopOrders.assignedDeliveryBoy.mobile}</div>:<div>Waiting for delivery boys to accept</div>}
        </div>
      }
      <div className='text-right text-sm font-bold text-shadow-gray-800'>
        Total: ₹{data.shopOrders.subtotal}
      </div>
    </div>
  )
}

export default OwnerOrderCard
