import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const Hero = () => {
  return (
    <div className="relative w-full flex justify-center">
      {/* Ảnh nền */}
      <img
        className="w-full max-w-[1200px] h-auto object-cover"
        src={assets.baner10}
        alt="banner10"
      />

      {/* Nội dung nằm trên ảnh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center text-white bg-black bg-opacity-30 w-full max-w-[1200px] h-full">
        <div className="flex items-center justify-center gap-2 mb-2 mt-8">
          <p className="w-8 md:w-11 h-[2px] bg-white"></p>
          <p className="font-bold text-sm md:text-base">
            DISCOVER YOUR NEW ADDICTION
          </p>
          <p className="w-8 md:w-11 h-[2px] bg-white"></p>
        </div>

        <h1 className="font-bold prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed text-center">
          Mineral Based Makeup Products
        </h1>

        <NavLink
          to="/collection"
          className="inline-block mt-4 px-6 py-2 border border-white text-sm font-medium tracking-wide transition duration-300 text-white hover:bg-white hover:text-black"
        >
          SHOP NOW &gt;
        </NavLink>
      </div>
    </div>
  )
}

export default Hero
