import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../App'

function UserOrderCard({data}) {
    const navigate = useNavigate()
    const [selectedRating,setSelectedRating] = useState({}) //itemId:rating  key value pair
    const formatDate = (dateString)=>{
        const date = new Date(dateString)
        return date.toLocaleString('en-GB',{
            day:"2-digit",
            month:"short",
            year:"numeric"
        })
    }

    const handleRating = async (itemId,rating) => {
        try {
            const result = await axios.post(`${serverUrl}/api/item/rating`,{itemId,rating},{withCredentials:true})
            setSelectedRating(prev=>({
                ...prev,
                [itemId]:rating
            }))
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='bg-white shadow rounded-lg p-4 space-y-4'>
      <div className='flex justify-between border-b pb-2'>
        <div>
            <p className='font-semibold'>
                order #{data._id.slice(-6)}
            </p>
            <p className='text-sm text-gray-500'>
                Date: {formatDate(data.createdAt)}
            </p>
        </div>
        <div className='text-right'>
            {data.paymentMethod=="cod"?<p className='text-sm text-gray-500'>{data.paymentMethod?.toUpperCase()}</p>:
            <p className='text-sm text-gray-500 font-semibold'>Payment: {data.payment?"true":"false"}</p>}
            <p className='font-medium text-blue-600'>{data.shopOrders?.[0].status}</p>
        </div>

      </div>
      {data.shopOrders.map((shopOrder,index)=>(
        <>
        <div className='border p-3 rounded-lg bg-[#fffaf7] space-y-3' key={index}>
            <p>{shopOrder.shop.name}</p>
            <div className='flex pb-2 space-x-4 overflow-x-auto'>
                {shopOrder.shopOrderItems.map((item,index)=>(
                    <>
                    <div key={index} className='shrink-0 p-2 bg-white w-40 border rounded-lg'>
                        <img src={item.item.image} alt=""  className='rounded w-full h-24 object-cover'/>
                        <p className='text-sm font-semibold mt-1'>{item.name}</p>
                        <p className='text-xs text-gray-500'>Qty: {item.quantity} x ₹{item.price}</p>

                        {shopOrder.status=='delivered' && 
                            <div className='flex space-x-1 mt-2'>
                                {[1,2,3,4,5].map((star)=>(
                                    <button onClick={()=>handleRating(item.item._id,star)} className={`text-lg ${selectedRating[item.item._id]>=star?'text-yellow-400':'text-gray-400'}`}>★</button>
                                ))}
                            </div>
                        }


                    </div>
                    </>
                ))}

            </div>
            <div className='justify-between flex p-2 items-center border-t'>
                <p className='font-semibold'>Subtotal: {shopOrder.subtotal}</p>
                <span className='text-sm font-medium text-blue-600'>{shopOrder.status}</span>
            </div>
        </div>
        </>
      ))}
      <div className='flex justify-between items-center border-t pt-2'>
      <p className='font-semibold'>Total: ₹{data.totalAmount}</p>
      <button className='bg-[#ff4d2d] hover:bg-[#e64526] text-white px-4 py-2 rounded-lg text-sm' onClick={()=>navigate(`/track-order/${data._id}`)}>Track Order</button>
      </div>

    </div>
  )
}

export default UserOrderCard
