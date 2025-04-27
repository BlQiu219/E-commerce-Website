import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
  const { token, backendUrl, navigate } = useContext(ShopContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      // Lấy thông tin người dùng từ API
      const fetchUserData = async () => {
        try {
          const response = await axios.get(backendUrl + '/api/user/profile', {
            headers: {
              token
            },
          });

          if (response.data.success) {
            setUser(response.data.user);
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error('Failed to fetch user data');
        }
      };

      fetchUserData();
    }
  }, [token, backendUrl, navigate]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <h2 className='text-3xl mb-4'>Profile</h2>
      <div className='w-full mb-4'>
        <p><strong>Name: </strong>{user.name}</p>
        <p><strong>Email: </strong>{user.email}</p>
      </div>
      <button 
        onClick={() => {
          localStorage.removeItem('token');
          navigate('/login');
        }} 
        className='bg-black text-white font-light px-8 py-2 mt-4'
      >
        Log Out
      </button>
    </div>
  );
};

export default Profile;
