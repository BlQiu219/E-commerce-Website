import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-cols sm:flex-row justify-around gap-12 sm:gap-12 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
      
      <div>
        <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt='' />
        <p className='font-semibold'>Chính Sách Đổi Trả Dễ Dàng</p>
        <p className='text-gray-400'>Chúng tôi cung cấp chính sách đổi hàng nhanh chóng và an toàn.</p>
      </div>

      <div>
        <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt='' />
        <p className='font-semibold'>Đổi Trả Trong 7 Ngày</p>
        <p className='text-gray-400'>Hỗ trợ đổi trả miễn phí trong vòng 7 ngày kể từ khi nhận hàng.</p>
      </div>

      <div>
        <img src={assets.support_img} className='w-12 m-auto mb-5' alt='' />
        <p className='font-semibold'>Hỗ Trợ Khách Hàng Tốt Nhất</p>
        <p className='text-gray-400'>Đội ngũ hỗ trợ 24/7 luôn sẵn sàng phục vụ bạn mọi lúc.</p>
      </div>

    </div>
  )
}
export default OurPolicy
