import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem'

const BestSeller = () => {
  const { products } = useContext(ShopContext)
  const [bestSeller, setBestSeller] = useState([])
  const [startIndex, setStartIndex] = useState(0)
  const visibleCount = 5

  useEffect(() => {
    const bestProduct = products.filter(item => item.bestseller)

    // Xáo trộn mảng sản phẩm bestseller
    const shuffled = [...bestProduct].sort(() => Math.random() - 0.5)

    setBestSeller(shuffled)
  }, [products])

  const handleNext = () => {
    if (startIndex + visibleCount < bestSeller.length) {
      setStartIndex(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(prev => prev - 1)
    }
  }

  return (
    <div className="my-16 relative">
      {/* Tiêu đề */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-semibold text-gray-800">
          _____BEST SELLERS
        </h2>
        <p className="mt-4 text-gray-500 text-xs sm:text-sm md:text-base w-full sm:w-2/3 mx-auto leading-relaxed">
          Discover our most loved beauty essentials, handpicked by our customers worldwide.
          Bring home the best in skincare, makeup, and fragrance.
        </p>
      </div>

      <div className="relative px-12">
        <button
          onClick={handlePrev}
          disabled={startIndex === 0}
          className="absolute -left-6 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 disabled:opacity-30 flex items-center justify-center shadow-md transition duration-200"
        >
          ←
        </button>

        <button
          onClick={handleNext}
          disabled={startIndex + visibleCount >= bestSeller.length}
          className="absolute -right-6 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 disabled:opacity-30 flex items-center justify-center shadow-md transition duration-200"
        >
          →
        </button>

        {/* Danh sách sản phẩm */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {bestSeller
            .slice(startIndex, startIndex + visibleCount)
            .map((item, index) => (
              <ProductItem
                key={item._id || index}
                id={item._id}
                name={item.name}
                images={item.images}
                price={item.price}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default BestSeller
