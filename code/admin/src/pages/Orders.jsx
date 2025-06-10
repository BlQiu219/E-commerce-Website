import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  // Bổ sung state cho search/filter/sort/pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortType, setSortType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      // console.log(response.data);
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // const statusHandler = async (event, orderId) => {
  //   try {
  //     const response = await axios.post(backendUrl+"/api/order/status", {orderId, status:event.target.value}, {headers:{token}})
  //     if (response.data.success) {
  //       await fetchAllOrders();
  //     }
     
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(error.message);
  //   }
  // }

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );
  
      if (response.data.success) {
        await fetchAllOrders();
        console.log("Status updated successfully:", response.data);
      } else {
        console.error("Failed to update status:", response.data);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  // Search nâng cao + filter
  let filteredOrders = orders.filter(order => {
    // Tìm theo tên, địa chỉ, sđt, trạng thái, id
    const address = order.address || {};
    const searchStr = [
      order._id,
      order.status,
      address.firstName,
      address.lastName,
      address.street,
      address.city,
      address.state,
      address.country,
      address.zipcode,
      address.phone,
      order.paymentMethod,
      order.payment ? 'Done' : 'Pending'
    ].join(' ').toLowerCase();

    const matchSearch = searchStr.includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter ? order.status === statusFilter : true;
    return matchSearch && matchStatus;
  });

  // Sort
  if (sortType === 'date-desc') {
    filteredOrders = filteredOrders.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (sortType === 'date-asc') {
    filteredOrders = filteredOrders.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (sortType === 'amount-desc') {
    filteredOrders = filteredOrders.slice().sort((a, b) => b.amount - a.amount);
  } else if (sortType === 'amount-asc') {
    filteredOrders = filteredOrders.slice().sort((a, b) => a.amount - b.amount);
  }

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  // Reset page về 1 khi search/filter/sort thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, sortType]);

  return (
    <div>
      <h3 className="text-xl font-bold mb-2">Quản lý đơn hàng</h3>
      {/* Search, Filter, Sort */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên, địa chỉ, SĐT, trạng thái..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Tất cả trạng thái</option>
          <option value="Đã đặt hàng">Đã đặt hàng</option>
          <option value="Đang đóng gói">Đang đóng gói</option>
          <option value="Đã gửi hàng">Đã gửi hàng</option>
          <option value="Đang giao hàng">Đang giao hàng</option>
          <option value="Đã giao">Đã giao</option>
        </select>
        <select
          value={sortType}
          onChange={e => setSortType(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Sắp xếp</option>
          <option value="date-desc">Mới nhất</option>
          <option value="date-asc">Cũ nhất</option>
          <option value="amount-desc">Tổng tiền ↓</option>
          <option value="amount-asc">Tổng tiền ↑</option>
        </select>
      </div>
      <div>
        {paginatedOrders.length === 0 && (
          <div className="text-gray-500 italic mb-4">Không tìm thấy đơn hàng.</div>
        )}
        {paginatedOrders.map((order, index) => (
          <div className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700" key={index}>
            <img className="s-12" src={assets.parcel_icon} alt="" />
            <div>
              <div>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (
                      <p className="py-0.5" key={index}>
                        {item.name} x {item.quantity} <span>{item.size}</span>
                      </p>
                    );
                  } else {
                    return (
                      <p className="py-0.5" key={index}>
                        {item.name} x {item.quantity} <span>{item.size}</span> ,
                      </p>
                    );
                  }
                })}
              </div>
              <p className="mt-3 mb-2 font-medium">{order.address.firstName + " " + order.address.lastName}</p>
              <div>
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <div >
              <p className="text-sm sm:text-[15px]">Số sản phẩm: {order.items.length}</p>
              <p className="mt-3">Phương thức: {order.paymentMethod}</p>
              <p>Thanh toán: {order.payment ? 'Đã thanh toán' : 'Chưa thanh toán'}</p>
              <p>Ngày đặt: {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className="text-sm sm:text-[15px]">{order.amount.toLocaleString()} {currency}</p>
            <select onChange={(event)=>statusHandler(event, order._id)} value={order.status} className="p-2 font-semibold">
              <option value="Đã đặt hàng">Đã đặt hàng</option>
              <option value="Đang đóng gói">Đang đóng gói</option>
              <option value="Đã gửi hàng">Đã gửi hàng</option>
              <option value="Đang giao hàng">Đang giao hàng</option>
              <option value="Đã giao">Đã giao</option>
            </select>
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
  );
};

export default Orders;

// 12:12
