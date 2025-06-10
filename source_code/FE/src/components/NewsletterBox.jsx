import React from 'react'

const NewsletterBox = () => {

  const onSubmitHandler = (event) => {
    event.preventDefault();
  }

  return (
    <div className='text-center'>
      <p className='text-2xl font-medium text-gray-800'>Đăng ký ngay & nhận ưu đãi 20%</p>
      <p className='text-gray-400 mt-3'>Chỉ với một bước đơn giản, bạn sẽ nhận được những ưu đãi độc quyền và cập nhật mới nhất từ chúng tôi.</p>
      <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
        <input className='w-full sm:flex-1 outline-none' type='email' placeholder='Nhập email của bạn' required/>
        <button type='submit' className='bg-black text-white text-xs px-10 py-4'>ĐĂNG KÝ</button>
      </form>
    </div>
  )
}

export default NewsletterBox
