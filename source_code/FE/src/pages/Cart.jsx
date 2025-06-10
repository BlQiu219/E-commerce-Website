import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const itemId in cartItems) {
        if (cartItems[itemId] > 0) {
          tempData.push({
            _id: itemId,
            quantity: cartItems[itemId]
          });
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);
  if (!cartData.length || !products.length) {
    return (
      <div className='text-center py-10 text-gray-600 text-lg'>
        Giỏ hàng của bạn đang trống hoặc dữ liệu sản phẩm chưa sẵn sàng.
      </div>
    );
  }

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'GIỎ HÀNG'} text2={'CỦA BẠN'} />
      </div>

      <div>

        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);
          if (!productData) return null;

          return (
            <div
              key={index}
              className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'
            >
              <div className='flex items-start gap-6'>
                <img className='w-16 sm:w-20' src={productData.images[0]} alt='' />
                <div>
                  <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                  <div className='flex items-center gap-5 mt-2'>
                    <p>{new Intl.NumberFormat('vi-VN').format(productData.price) + "đ"}</p>
                  </div>
                </div>
              </div>

              <input
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (!isNaN(value) && value > 0) {
                    updateQuantity(item._id, value);
                  }
                }}
                className='border rounded-full w-12 sm:w-14 px-1 py-1 text-center'
                type='number'
                min={1}
                defaultValue={item.quantity}
              />

              <img
                onClick={() => updateQuantity(item._id, 0)}
                className='w-4 mr-4 sm:w-5 cursor-pointer'
                src={assets.bin_icon}
                alt=''
              />
            </div>
          );
        })}
      </div>

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end'>
            <button
              onClick={() => navigate('/place-order')}
              className='bg-black text-white text-sm my-8 px-8 py-3 rounded-full hover:bg-gray-800 transition-all duration-300 ease-in-out'
            >
              TIẾN HÀNH THANH TOÁN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
