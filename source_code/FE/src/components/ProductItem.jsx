import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, images, name, price }) => {
  const { currency } = useContext(ShopContext);

  // Lấy ảnh đầu tiên từ object image
  const displayImage = Object.values(images || {})[0] || 'fallback.jpg';

  return (
    <div className='flex flex-col p-3 border-0 rounded hover:shadow-md transition-all h-full'>
      <Link className='text-gray-700 cursor-pointer flex flex-col h-full' to={`/product/${id}`}>
        <div className='h-[180px] flex items-center justify-center overflow-hidden'>
          <img
            className='max-h-full object-contain hover:scale-110 transition ease-in-out duration-300'
            src={displayImage}
            alt={name || 'product image'}
          />
        </div>
        <div className='flex flex-col justify-between flex-1 mt-3'>
          <p className='text-sm font-medium min-h-[40px]'>{name}</p>
          <p className='text-sm font-semibold'>{Number(price).toLocaleString('vi-VN')}đ</p>
        </div>
      </Link>
    </div>
  )
}

export default ProductItem
