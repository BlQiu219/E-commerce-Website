import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className="bg-white">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">

        <div>
          <img src={assets.logohnt} className="mb-5 w-32" alt="Forever Beauty Logo" />
          <p className="w-full md:w-2/3 text-gray-600 leading-relaxed">
            HNT Cosmetics mang đến cho bạn những dòng mỹ phẩm quốc tế cao cấp, giúp bạn tỏa sáng vẻ đẹp tự nhiên với sự tự tin và phong cách. Sản phẩm chính hãng, chất lượng vượt trội, được trao gửi bằng cả sự tận tâm.
          </p>
        </div>

        <div>
          <p className="text-xl font-semibold mb-5 text-gray-800">CỬA HÀNG</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Trang chủ</li>
            <li>Giới thiệu</li>
            <li>Cửa hàng</li>
            <li>Thông tin giao hàng</li>
            <li>Chính sách bảo mật</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-semibold mb-5 text-gray-800">LIÊN HỆ</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Điện thoại: 0123 456 789</li>
            <li>Email: abc@hntcomestic.com</li>
            <li>Theo dõi chúng tôi trên mạng xã hội</li>
          </ul>
        </div>

      </div>

      <div className="border-t">
        <p className="py-5 text-xs text-gray-500 text-center">
          © 2025 HNT COMESTICS. Bản quyền đã được bảo lưu.
        </p>
      </div>
    </div>
  );
};

export default Footer;
