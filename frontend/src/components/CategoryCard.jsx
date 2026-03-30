import React from 'react'

function CategoryCard({name,image,onClick}) {
  return (
    <div className='w-30 h-30 md:w-45 md:h-45 rounded-2xl border-2 border-[#ff4d2d] shrink-0 overflow-hidden bg-white shadow-xl shadow-gray-200 hover:shadow-lg transition-shadow relative'>
    <img onClick={onClick} src={image} alt="" className='w-full h-full object-cover transform hover:scale-110 transition-transform duration-300'/>
      <div className='absolute bottom-0 w-full left-0 bg-opacity-95 rounded-t-xl text-center bg-[#fffff96] px-3 py-1 shadow text-sm font-medium backdrop-blur text-gray-800'>
        {name}
      </div>
    </div>
  )
}

export default CategoryCard
