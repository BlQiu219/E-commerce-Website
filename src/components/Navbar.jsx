import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
    navigate('/login');
  };

  const toggleProfileDropdown = () => {
    if (!token) {
      navigate('/login');
    } else {
      setProfileDropdownOpen(!profileDropdownOpen);
    }
  };

  return (
    <div className='fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md flex items-center justify-between px-4 py-5 font-medium'>
      <Link to='/'><img src={assets.logo} className='w-36' alt="" /></Link>

      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink to='/' className='flex flex-col items-center gap-1'>
          <p>HOME</p>
        </NavLink>
        <NavLink to='/collection' className='flex flex-col items-center gap-1'>
          <p>COLLECTION</p>
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1'>
          <p>ABOUT</p>
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
          <p>CONTACT</p>
        </NavLink>
      </ul>

      <div className='flex items-center gap-6'>
        <Link to='/collection'>
          <img onClick={() => setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt='' />
        </Link>

        <div className='relative'>
          <img 
            onClick={toggleProfileDropdown}
            className='w-5 cursor-pointer' 
            src={assets.profile_icon} 
            alt='' 
          />

          {token && profileDropdownOpen && (
            <div className='absolute right-0 mt-4 w-36 bg-slate-100 text-gray-500 rounded shadow-lg py-3 px-5'>
             <p className="cursor-pointer hover:text-black" onClick={() => {setProfileDropdownOpen(false); navigate('/profile');}}>My Profile</p>
              <p className='cursor-pointer hover:text-black' onClick={() => { setProfileDropdownOpen(false); navigate('/order'); }}>Order</p>
              <p className='cursor-pointer hover:text-black' onClick={logout}>Logout</p>
            </div>
          )}
        </div>

        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} className='w-5 min-w-5' alt='' />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[10px]'>
            {getCartCount()}
          </p>
        </Link>

        <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt='' />
      </div>

      {/* Sidebar menu cho mobile */}
      <div className={`absolute top-0 right-0 bottom-0 bg-white transition-all ${visible ? 'w-full' : 'w-0'} overflow-hidden`}>
        <div className='flex flex-col text-gray-600'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt='' />
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} to='/' className='py-2 pl-6 border'>HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} to='/collection' className='py-2 pl-6 border'>COLLECTION</NavLink>
          <NavLink onClick={() => setVisible(false)} to='/about' className='py-2 pl-6 border'>ABOUT</NavLink>
          <NavLink onClick={() => setVisible(false)} to='/contact' className='py-2 pl-6 border'>CONTACT</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Navbar
