import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({ token }) => {

  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Lifstick");
  const [brand, setBrand] = useState("Dior");
  const [bestseller, setBestseller] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {

      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("brand", brand);
      formData.append("bestseller", bestseller);

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } });

      if (response.data.success) {
        toast.success(response.data.message);
        setName('');
        setDescription('')
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice('');
      }
      else {
        toast.error(response.data.message);
      }

    } catch (error) {
      console.log(error);
      console.log(toast.error.message);

    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Thêm sản phẩm</h1>
      <div className="grid grid-cols-4 gap-4 mb-4">
        {[0, 1, 2, 3].map((index) => (
          <label key={index} className="cursor-pointer">
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                if (index === 0) setImage1(file);
                if (index === 1) setImage2(file);
                if (index === 2) setImage3(file);
                if (index === 3) setImage4(file);
              }}
              hidden
            />
            <div className="w-full h-24 border border-gray-300 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100">
              {(() => {
                const img = [image1, image2, image3, image4][index];
                return img ? (
                  <img
                    src={URL.createObjectURL(img)}
                    alt={`Preview ${index}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mb-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <span className="text-sm">Tải ảnh lên</span>
                  </div>
                );
              })()}
            </div>
          </label>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 text-gray-600 font-medium text-base">Tên sản phẩm</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 text-base"
            placeholder="Nhập tên sản phẩm"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-600 font-medium text-base">Giá sản phẩm</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 text-base"
            placeholder="25"
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 text-gray-600 font-medium text-base">Danh mục</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 text-base"
          >
            <option value="Lipstick">Son môi</option>
            <option value="Perfume">Nước hoa</option>
            <option value="Makeup">Trang điểm</option>
            <option value="Skincare - Haircare">Chăm sóc da - Tóc</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 text-gray-600 font-medium text-base">Thương hiệu</label>
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 text-base"
          >
            <option value="Dior">Dior</option>
            <option value="YSL">YSL</option>
            <option value="Dolce & Garbana">Dolce & Garbana</option>
            <option value="Innisfree">Innisfree</option>
            <option value="Chanel">Chanel</option>
            <option value="Lancome">Lancome</option>
            <option value="Tom Ford">Tom Ford</option>
          </select>
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-gray-600 font-medium text-base">Mô tả sản phẩm</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 text-base"
          rows="3"
          placeholder="Nhập mô tả sản phẩm"
          required
        ></textarea>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          checked={bestseller}
          onChange={() => setBestseller(prev => !prev)}
          className="w-5 h-5 text-pink-500 border-gray-300 rounded focus:ring-pink-500"
          id="bestseller"
        />
        <label className="text-gray-600 font-medium text-base" htmlFor="bestseller">Thêm vào mục bán chạy</label>
      </div>
      <button
        type="submit"
        className="w-full bg-black text-white py-3 rounded text-base hover:bg-gray-800 transition duration-300"
      >
        Thêm sản phẩm
      </button>
    </form>
  )
}

export default Add