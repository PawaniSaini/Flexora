'use client';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';

const ManageOrders = () => {
  const runOnce = useRef(false);
  const [orderList, setOrderList] = useState([]);

  // Fetch Orders from API
  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/booking/getall');
      console.log(res.data);
      
      setOrderList(res.data);
    } catch (err) {
      toast.error('Failed to fetch booking');
      console.error(err);
    }
  };

  // Delete Order
  const deleteOrder = (id) => {
    axios.delete(`http://localhost:5000/booking/delete/${id}`)
      .then(() => {
        toast.success('Booking deleted successfully');
        fetchOrders(); // Refetch orders after deletion
      })
      .catch((err) => {
        toast.error('Failed to delete booking');
        console.error(err);
      });
  };

  useEffect(() => {
    if (!runOnce.current) {
      fetchOrders();
      runOnce.current = true;
    }
  }, []);

  // Display Orders Table
  const displayOrders = () => (
    <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
      <thead className="bg-gray-50 dark:bg-neutral-800">
        <tr>
          <th className="px-6 py-3 text-start">Order ID</th>
          <th className="px-6 py-3 text-start">User Name</th>
          <th className="px-6 py-3 text-start">Space Name</th>
          <th className="px-6 py-3 text-start">Start Date</th>
          <th className="px-6 py-3 text-start">End Date</th>
          <th className="px-6 py-3 text-start">Amount</th>
          <th className="px-6 py-3 text-end" colSpan={2}>Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
        {orderList.map((order) => (
          <tr key={order._id}>
            <td className="px-6 py-3">{order._id}</td>
            <td className="px-6 py-3">{order.user.name}</td>
            <td className="px-6 py-3">{order.space.title}</td>
            <td className="px-6 py-3">{new Date(order.startDate).toLocaleDateString()}</td>
            <td className="px-6 py-3">{new Date(order.endDate).toLocaleDateString()}</td>
            <td className="px-6 py-3">${order.amount}</td>
            <td className="px-6 py-1.5">
              <Link
                href={`/admin/update-order/${order._id}`}
                className="inline-flex items-center gap-x-1 text-sm text-blue-600 hover:underline font-medium"
              >
                Edit
              </Link>
            </td>
            <td className="px-6 py-1.5">
              <button
                onClick={() => deleteOrder(order._id)}
                className="text-sm text-white font-medium bg-red-600 rounded-lg px-3 py-1"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="max-w-[80%] mx-auto">
      <h1 className="text-center font-bold text-3xl mb-6">Manage Orders</h1>
      {orderList.length > 0 ? (
        displayOrders()
      ) : (
        <p className="text-center text-lg font-medium">No orders found.</p>
      )}
    </div>
  );
};

export default ManageOrders;
