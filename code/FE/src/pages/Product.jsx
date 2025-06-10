import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import { useNavigate } from 'react-router-dom'; 

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, token, navigate } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [images, setImages] = useState('');
  const [quantity, setQuantity] = useState(1);  // Đặt số lượng mặc định là 1

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImages(item.images[0]);
        return null;
      }
    })
  }

  useEffect(() => {
    fetchProductData();
  }, [productId])

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0) {
      setQuantity(value);
    }
  };

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* Product Image */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.images.map((item, index) => (
                <img onClick={() => setImages(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={images} alt='' />
          </div>
        </div>

        {/* Product Information */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>

          <p className='mt-5 text-3xl font-medium'>
            {new Intl.NumberFormat('vi-VN').format(productData.price)} {currency}
          </p>

          <div className='flex items-center gap-4 mt-6'>
            {/* Ô số lượng */}
            <div className='flex items-center border rounded-lg overflow-hidden'>
              <input
                type='number'
                id='quantity'
                value={quantity}
                onChange={handleQuantityChange}
                min='1'
                className='w-16 px-2 py-2 text-center focus:outline-none focus:ring-2 focus:ring-black'
              />
            </div>

            {/* Nút thêm vào giỏ */}
            <button 
              onClick={() => {
                if (!token) {
                  navigate('/login');
                } else {
                  addToCart(productData._id, productData.brand, quantity);
                }
              }}
              className='bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 active:bg-gray-700 text-sm transition-colors'>
              THÊM VÀO GIỎ HÀNG
            </button>
          </div>

          {/* Mô tả sản phẩm */}
          <div className='mt-8 text-sm text-gray-700 leading-relaxed  p-4 rounded-lg'>
            <b className='block mb-2 text-black'>Mô tả sản phẩm</b>
            <p>{productData.description}</p>
          </div>

          {/* Chính sách */}
          <div className='mt-8 text-sm text-gray-700 leading-relaxed  p-4 rounded-lg'>
            <p>✅ 100% Sản phẩm chính hãng</p>
            <p>🚚 Hỗ trợ thanh toán khi nhận hàng</p>
            <p>🔄 Dễ dàng đổi/trả trong vòng 7 ngày</p>
          </div>
        </div>
      </div>

      {/* Display related products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product;
