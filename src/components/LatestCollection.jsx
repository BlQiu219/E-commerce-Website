import React, { useEffect, useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    // Lấy 10 sản phẩm mới nhất
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <div className="my-16 px-4">
      {/* Tiêu đề */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-semibold text-gray-800">
          LATEST COLLECTIONS_____
        </h2>
        <p className="mt-4 text-gray-600 text-xs sm:text-sm md:text-base w-full sm:w-2/3 mx-auto leading-relaxed">
          Discover the newest arrivals from top international beauty brands. Explore the latest in makeup, skincare, and fragrances curated just for you.
        </p>
      </div>

      {/* Grid hiển thị sản phẩm */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {latestProducts.map((item) => (
          <ProductItem 
            key={item._id} 
            id={item._id} 
            image={item.image} 
            name={item.name} 
            price={item.price} 
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
