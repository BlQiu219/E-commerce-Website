import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [authMode, setAuthMode] = useState('Đăng nhập');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onSubmitHandle = async (event) => {
    event.preventDefault();

    if (!email || !password || (authMode === 'Đăng ký' && !name)) {
      toast.error('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    try {
      let response;
      if (authMode === 'Đăng nhập') {
        response = await axios.post(backendUrl + '/api/user/login', { email, password });
      } else {
        response = await axios.post(backendUrl + '/api/user/register', { name, email, password });
      }

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        toast.success(`${authMode} thành công!`);
        setEmail('');
        setPassword('');
        setName('');
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <form onSubmit={onSubmitHandle} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{authMode}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

      {authMode === 'Đăng ký' && (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type='text'
          className='w-full px-3 py-2 border border-gray-800'
          placeholder='Họ tên'
        />
      )}

      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type='email'
        className='w-full px-3 py-2 border border-gray-800'
        placeholder='Email'
      />

      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type='password'
        className='w-full px-3 py-2 border border-gray-800'
        placeholder='Mật khẩu'
      />

      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Quên mật khẩu?</p>
        {authMode === 'Đăng nhập' ? (
          <p onClick={() => setAuthMode('Đăng ký')} className='cursor-pointer'>Tạo tài khoản</p>
        ) : (
          <p onClick={() => setAuthMode('Đăng nhập')} className='cursor-pointer'>Đăng nhập</p>
        )}
      </div>

      <button className='bg-black text-white font-light px-8 py-2 mt-4'>
        {authMode === 'Đăng nhập' ? 'Đăng nhập' : 'Đăng ký'}
      </button>
    </form>
  );
};

export default Login;
