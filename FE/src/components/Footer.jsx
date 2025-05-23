import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className="bg-white">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">

        <div>
          <img src={assets.logohnt} className="mb-5 w-32" alt="Forever Beauty Logo" />
          <p className="w-full md:w-2/3 text-gray-600 leading-relaxed">
            HNT Comestics brings you the finest selection of international cosmetics, helping you embrace your beauty with confidence and style. Authentic brands, premium quality, delivered with care.
          </p>
        </div>

        <div>
          <p className="text-xl font-semibold mb-5 text-gray-800">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Shop</li>
            <li>Delivery Information</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-semibold mb-5 text-gray-800">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Phone: 0123 456 789</li>
            <li>Email: support@hntcomestic.com</li>
            <li>Follow us on social media</li>
          </ul>
        </div>

      </div>

      <div className="border-t">
        <p className="py-5 text-xs text-gray-500 text-center">
          © 2024 HNT COMESTICS. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
