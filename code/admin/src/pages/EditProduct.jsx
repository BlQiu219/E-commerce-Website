import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { backendUrl } from '../App';

const EditProduct = ({ token }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Luôn đảm bảo images và newImages có 4 phần tử
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    brand: '',
    bestseller: false,
    images: ['', '', '', ''],
  });
  const [newImages, setNewImages] = useState([null, null, null, null]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/product/${id}`, {
          headers: { token },
        });
        if (response.data.success) {
          const { name, description, price, category, brand, bestseller, images } = response.data.product;
          setProduct({
            name,
            description,
            price,
            category,
            brand,
            bestseller,
            images: [...images, '', '', '', ''].slice(0, 4),
          });
          setNewImages([null, null, null, null]);
        } else {
          toast.error('Product not found');
          navigate('/list');
        }
      } catch (error) {
        toast.error('Failed to fetch product');
        navigate('/list');
      }
    };
    fetchProduct();
  }, [id, token, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    const updatedNewImages = [...newImages];
    updatedNewImages[index] = file;
    setNewImages(updatedNewImages);

    // Preview ảnh mới nếu có, còn không thì giữ ảnh cũ
    setProduct((prev) => {
      const updatedImages = [...prev.images];
      updatedImages[index] = file ? URL.createObjectURL(file) : prev.images[index];
      return { ...prev, images: updatedImages };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('id', id);
      formData.append('name', product.name);
      formData.append('description', product.description);
      formData.append('price', product.price);
      formData.append('category', product.category);
      formData.append('brand', product.brand);
      formData.append('bestseller', product.bestseller);

      newImages.forEach((image, index) => {
        if (image) {
          formData.append(`image${index + 1}`, image);
        }
      });

      const response = await axios.put(`${backendUrl}/api/product/update`, formData, {
        headers: { token, 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        toast.success('Product updated successfully');
        // Cập nhật lại state với dữ liệu mới từ backend
        const updatedProduct = response.data.product;
        setProduct({
          ...updatedProduct,
          images: [...updatedProduct.images, '', '', '', ''].slice(0, 4),
        });
        setNewImages([null, null, null, null]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Failed to update product');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Chỉnh sửa sản phẩm</h1>
      <div className="grid grid-cols-4 gap-4 mb-4">
        {[0, 1, 2, 3].map((index) => (
          <label key={index} className="cursor-pointer">
            <input
              type="file"
              onChange={(e) => handleImageChange(e, index)}
              hidden
            />
            <div className="w-full h-24 border border-gray-300 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100">
              {product.images[index] ? (
                <img
                  src={product.images[index]}
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
              )}
            </div>
          </label>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 text-gray-600 font-medium text-base">Tên sản phẩm</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 text-base"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-600 font-medium text-base">Giá sản phẩm</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 text-base"
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 text-gray-600 font-medium text-base">Danh mục</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
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
            name="brand"
            value={product.brand}
            onChange={handleChange}
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
          name="description"
          value={product.description}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 text-base"
          rows="3"
          required
        ></textarea>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          name="bestseller"
          checked={product.bestseller}
          onChange={handleChange}
          className="w-5 h-5 text-pink-500 border-gray-300 rounded focus:ring-pink-500"
        />
        <label className="text-gray-600 font-medium text-base">Thêm vào mục bán chạy</label>
      </div>
      <button
        type="submit"
        className="w-full bg-black text-white py-3 rounded text-base hover:bg-gray-800 transition duration-300"
      >
        Lưu thay đổi
      </button>
    </form>
  );
};

export default EditProduct;