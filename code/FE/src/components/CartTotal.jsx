import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN').format(amount);
  };

  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Title text1={'CHI TIẾT'} text2={'THANH TOÁN'} />
      </div>

      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
          <p>Tổng tiền hàng</p>
          <p>{formatCurrency(getCartAmount())} {currency}</p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <p>Tổng tiền phí vận chuyển </p>
          <p>{formatCurrency(delivery_fee)} {currency}</p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <b>Tổng thanh toán</b>
          <b>{formatCurrency(getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee)} {currency}</b>
        </div>
      </div>
    </div>
  )
}

export default CartTotal;
