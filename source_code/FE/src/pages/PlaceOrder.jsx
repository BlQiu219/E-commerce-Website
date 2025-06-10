import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  const onChangeHandle = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);

      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const onSubmitHandle = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      for (const itemId in cartItems) {
        if (cartItems[itemId] > 0) {
          const itemInfo = { ...products.find((p) => p._id === itemId) };
          if (itemInfo) {
            itemInfo.quantity = cartItems[itemId];  // Sử dụng số lượng trực tiếp từ cartItems
            orderItems.push(itemInfo);
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {

        // API Calls for COD
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })
          if (response.data.success) {
            setCartItems({})
            navigate('/orders')
          } else {
            toast.error(response.data.message)
          }
          break;

        case 'stripe':
          const orderDataWithOrigin = {
            ...orderData,
            origin: window.location.origin,
          };
          const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderDataWithOrigin, { headers: { token } })
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data
            window.location.replace(session_url)
          } else {
            toast.error(responseStripe.data.message)
          }
          break;

        // case 'razorpay':

        //   const responseRazorpay = await axios.post(backendUrl+ '/api/order/razorpay', orderData, {headers:{token}})
        //   if (responseRazorpay.data.success) {
        //     initPay(responseRazorpay.data.order);
        //   }

        //   break;

        case 'vnpay':
          const responseVnpay = await axios.post(backendUrl + '/api/order/vnpay', orderData, { headers: { token } })
          if (responseVnpay.data.success) {
            // Backend sẽ trả về URL chuyển hướng đến trang thanh toán VNPAY
            window.location.replace(responseVnpay.data.paymentUrl);

          } else {
            toast.error(responseVnpay.data.message);
          }
          break;

        default:
          break;
      }

      // const response = await axios.post(`${backendUrl}/api/order/place`, orderData, { headers: { token } });
      // const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, {headers:{token}});


      // if (response.data.success || responseStripe.data.success) {
      //   setCartItems({});
      //   navigate('/orders');
      // } else {
      //   toast.error(response.data.message);
      // }
    } catch (error) {
      console.error(error);
      toast.error(error.message)
    }
  };

  return (
    <form onSubmit={onSubmitHandle} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <Title text1='THÔNG TIN' text2='GIAO HÀNG' />
        <div className='flex gap-3'>
          <input onChange={onChangeHandle} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Họ và tên đệm' />
          <input onChange={onChangeHandle} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Tên' />
        </div>
        <input onChange={onChangeHandle} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='email' placeholder='Email' />
        <input onChange={onChangeHandle} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Đường' />
        <div className='flex gap-3'>
          <input onChange={onChangeHandle} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Thành phố' />
          <input onChange={onChangeHandle} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Tỉnh' />
        </div>
        <div className='flex gap-3'>
          <input onChange={onChangeHandle} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' type='number' placeholder='Mã bưu điện' />
          <input onChange={onChangeHandle} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Quốc gia' />
        </div>
        <input onChange={onChangeHandle} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' type='number' placeholder='Điện thoại' />
      </div>
      <div className='mt-8'>
        <CartTotal />
        <Title text1='PHƯƠNG THỨC' text2='THANH TOÁN' />
        <div className='flex gap-3 flex-col lg:flex-row'>
          <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
            <p className={`min-w-3 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
            <img className='h-5 mx-4 rounded-full' src={assets.stripe_logo} alt='' />
          </div>
          <div onClick={() => setMethod('vnpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
            <p className={`min-w-3 h-3.5 border rounded-full ${method === 'vnpay' ? 'bg-green-400' : ''}`}></p>
            <img className='h-5 mx-4 rounded-full' src={assets.razorpay_logo} alt='' />
          </div>
          <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
            <p className={`min-w-3 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
            <p className='text-gray-500 text-sm font-medium mx-4'>THANH TOÁN KHI NHẬN HÀNG</p>
          </div>
        </div>

        <div className='w-full text-end mt-8'>
          <button type='submit' className='bg-black text-white text-sm my-8 px-8 py-3 rounded-full hover:bg-gray-800 transition-all duration-300 ease-in-out'>ĐẶT HÀNG</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;

// 12:28

