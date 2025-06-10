import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const Hero = () => {
  return (
    <div className="relative w-full">
      {/* Ảnh nền full màn hình */}
      <img
        className="w-full h-auto object-cover"
        src={assets.banerrealfinal}
        alt="bannerrealfinal"
      />

      {/* Overlay nội dung phủ ảnh */}
      <div className="absolute inset-0 flex flex-col items-end justify-center text-black  pr-16 translate-x-[-2cm]">
        <div className="flex items-center justify-center gap-2 mb-2 mt-8">
          <p className="w-8 md:w-11 h-[2px] bg-black"></p>
          <p className="font-bold text-sm md:text-base">
            KHÁM PHÁ NIỀM ĐAM MÊ CỦA BẠN 
          </p>
          <p className="w-8 md:w-11 h-[2px] bg-black"></p>
        </div>

        <div className="text-right leading-snug">
          <h1 className="font-bold prata-regular text-4xl lg:text-6xl text-black">
            MỸ PHẨM TỪ
          </h1>
          <h2 className="font-semibold prata-regular text-3xl lg:text-5xl text-black mt-2">
            THIÊN NHIÊN
          </h2>
        </div>

        <NavLink
          to="/collection"
          className="inline-block mt-4 px-6 py-2 border border-black text-sm font-medium tracking-wide transition duration-300 text-black hover:bg-black hover:text-white translate-x-[-3.5cm]"
          style={{ marginLeft: '4cm' }}
        >
          KHÁM PHÁ &gt;
        </NavLink>
      </div>
    </div>
  );
};
export default Hero;