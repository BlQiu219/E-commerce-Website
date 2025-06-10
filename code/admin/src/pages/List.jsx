import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom';

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  // Bổ sung filter, sort, pagination
  const [categoryFilter, setCategoryFilter] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [sortType, setSortType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

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


  // Search nâng cao + filter
  let filteredList = list.filter(
    (item) =>
      (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.brand && item.brand.toLowerCase().includes(searchTerm.toLowerCase()))
      ) &&
      (categoryFilter ? item.category === categoryFilter : true) &&
      (brandFilter ? item.brand === brandFilter : true)
  );

  // Sort
  if (sortType === 'price-asc') {
    filteredList = filteredList.slice().sort((a, b) => a.price - b.price);
  } else if (sortType === 'price-desc') {
    filteredList = filteredList.slice().sort((a, b) => b.price - a.price);
  } else if (sortType === 'name-asc') {
    filteredList = filteredList.slice().sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortType === 'name-desc') {
    filteredList = filteredList.slice().sort((a, b) => b.name.localeCompare(a.name));
  }

  // Pagination
  const totalPages = Math.ceil(filteredList.length / productsPerPage);
  const paginatedList = filteredList.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // Reset page về 1 khi filter/search/sort thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, categoryFilter, brandFilter, sortType]);

  // Lấy danh sách brand/category từ dữ liệu
  const allCategories = Array.from(new Set(list.map(item => item.category)));
  const allBrands = Array.from(new Set(list.map(item => item.brand)));

  const categoryVN = {
    Lipstick: "Son môi",
    Perfume: "Nước hoa",
    Makeup: "Trang điểm",
    "Skincare - Haircare": "Chăm sóc da - Tóc"
  };

  return (
    <div>
      <p className='mb-2 text-xl font-bold'>Danh sách sản phẩm</p>

      {/* Search, Filter, Sort */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên, danh mục, thương hiệu..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Tất cả danh mục</option>
          {allCategories.map((cat, idx) => (
            <option key={idx} value={cat}>{categoryVN[cat] || cat}</option>
          ))}
        </select>
        <select
          value={brandFilter}
          onChange={e => setBrandFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Tất cả thương hiệu</option>
          {allBrands.map((brand, idx) => (
            <option key={idx} value={brand}>{brand}</option>
          ))}
        </select>
        <select
          value={sortType}
          onChange={e => setSortType(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Sắp xếp</option>
          <option value="price-asc">Giá ↑</option>
          <option value="price-desc">Giá ↓</option>
          <option value="name-asc">Tên A-Z</option>
          <option value="name-desc">Tên Z-A</option>
        </select>
      </div>

      <div className='flex flex-col gap-2'>

        {/* Header Row */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_2fr] items-center py-1 px-2 border bg-gray-100 text-sm font-semibold">
          <b>Ảnh</b>
          <b>Tên</b>
          <b>Danh mục</b>
          <b>Giá</b>
          <b className='text-center'>Thao tác</b>
        </div>

        {/* Product List */}
        {paginatedList.map((item, index) => (
          <div
            className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_2fr] items-center gap-2 py-1 px-2 border text-sm'
            key={index}
          >
            <img className='w-12' src={item.images[0]} alt='' />
            <p>{item.name}</p>
            <p>{categoryVN[item.category] || item.category}</p>
            <p>{item.price.toLocaleString()} {currency}</p>
            <div className="flex justify-end md:justify-center gap-2 text-sm">
              {/*}
              <button
                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                View
              </button>
              */}
              <Link
                to={`/edit/${item._id}`} // Sử dụng đúng trường `_id`
                className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                onClick={() => console.log("Editing product with ID:", item._id)} // Log giá trị `_id`
              >
                Sửa
              </Link>
              <button
                onClick={() => removeProduct(item._id)}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex gap-2 mt-4 flex-wrap">
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(page =>
            page === 1 ||
            page === totalPages ||
            (page >= currentPage - 1 && page <= currentPage + 1)
          )
          .reduce((acc, page, idx, arr) => {
            if (idx > 0 && page - arr[idx - 1] > 1) acc.push('...');
            acc.push(page);
            return acc;
          }, [])
          .map((page, idx) =>
            page === '...' ? (
              <span key={`ellipsis-${idx}`} className="px-3 py-1">...</span>
            ) : (
              <button
                key={`page-${page}-${idx}`}
                className={`px-3 py-1 rounded ${currentPage === page ? 'bg-black text-white' : 'bg-gray-200'}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            )
          )}
      </div>
    </div>
  )
}

export default List
