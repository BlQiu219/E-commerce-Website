import React from "react";
import { assets } from "../assets/assets";
import Title from '../components/Title'
import NewsletterBox from "../components/NewsletterBox";

const Contact = () => {
  return (
    <div >
      <div className="text-2xl text-center pt-10 border-t">
        <Title text1={'LIÊN HỆ'} text2={'VỚI CHÚNG TÔI'} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-10 mb-28 justify-center">
        <img className="w-full md:max-w-[480px]" src={assets.contact} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p className="font-semibold text-xl text-gray-600">Cửa hàng của chúng tôi</p>
          <p className="text-gray-500">Km10, Nguyễn Trãi, Hà Đông, Hà Nội</p>
          <p className="text-gray-500">Điện thoại: 0123456789 <br /> Email:abc@gmail.com</p>
          <p className="font-semibold text-xl text-gray-600">Cơ hội nghề nghiệp tại HNT Comestic</p>
          <p className="text-gray-500">Tìm hiểu thêm về đội ngũ của chúng tôi và các vị trí đang tuyển dụng.</p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-50 w-1/4">Khám phá việc làm</button>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default Contact;
