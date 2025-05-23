import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom';

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`, {
        headers: { token }, // Đảm bảo token được truyền đúng
      });
      console.log("Products fetched from API:", response.data.products); // Log danh sách sản phẩm
      if (response.data.products) {
        setList(response.data.products);
      } else {
        toast.error("No products found");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } } // Sửa lại 'header' thành 'headers'
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const filteredList = list.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <p className='mb-2 text-xl font-bold'>All Products List</p>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by name or category..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 mb-4 w-full md:w-1/2 rounded"
      />

      <div className='flex flex-col gap-2'>

        {/* Header Row */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_2fr] items-center py-1 px-2 border bg-gray-100 text-sm font-semibold">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* Product List */}
        {filteredList.map((item, index) => (
          <div
            className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_2fr] items-center gap-2 py-1 px-2 border text-sm'
            key={index}
          >
            <img className='w-12' src={item.images[0]} alt='' />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{currency}{item.price}</p>
            <div className="flex justify-end md:justify-center gap-2 text-sm">
              <button
                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                View
              </button>
              <Link
                to={`/edit/${item._id}`} // Sử dụng đúng trường `_id`
                className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                onClick={() => console.log("Editing product with ID:", item._id)} // Log giá trị `_id`
              >
                Edit
              </Link>
              <button
                onClick={() => removeProduct(item._id)}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default List
