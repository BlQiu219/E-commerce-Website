import React, { useEffect, useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  // Hàm chọn ngẫu nhiên N phần tử từ mảng
  const getRandomItems = (arr, count) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    if (products.length > 0) {
      const lipstick = products.filter(p => p.category === 'Lifstick');
      const perfume = products.filter(p => p.category === 'Perfume');
      const makeup = products.filter(p => p.category === 'Makeup');
      const skincareHaircare = products.filter(p => p.category === 'Skincare - Haircare');

      const selected = [
        ...getRandomItems(lipstick, 4),
        ...getRandomItems(perfume, 2),
        ...getRandomItems(makeup, 2),
        ...getRandomItems(skincareHaircare, 2),
      ];

      setLatestProducts(selected);
    }
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

      {/* Hiển thị sản phẩm */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-2 gap-x-4">
        {latestProducts.map((item) => (
          <ProductItem 
            key={item._id} 
            id={item._id} 
            images={item.images} 
            name={item.name} 
            price={item.price} 
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
