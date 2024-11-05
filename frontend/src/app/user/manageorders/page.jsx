'use client';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

const ManageOrders = () => {
  const runOnce = useRef(false);
  const [orderList, setOrderList] = useState([]);

  // Fetch Orders from API
  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/orders/getall');
      setOrderList(res.data);
    } catch (error) {
      toast.error('Failed to fetch orders');
    }
  };

  useEffect(() => {
    if (!runOnce.current) {
      fetchOrders();
      runOnce.current = true; // Ensure it only runs once
    }
  }, []);

  // Display Orders Table
  const displayOrders = () => {
    return (
      <div className='bg-white'>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
        <thead className="bg-gray-50 dark:bg-neutral-800">
          <tr>
            <th className="px-6 py-3 text-start">ID</th>
            <th className="px-6 py-3 text-start">Workspace</th>
            <th className="px-6 py-3 text-start">Location</th>
            <th className="px-6 py-3 text-start">Date</th>
            <th className="px-6 py-3 text-start">Status</th>
            <th className="px-6 py-3 text-start">Image</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
          {orderList.map((order) => (
            <tr key={order._id}>
              <td className="px-6 py-3">{order._id}</td>
              <td className="px-6 py-3">{order.workspace}</td>
              <td className="px-6 py-3">{order.location}</td>
              <td className="px-6 py-3">{new Date(order.date).toLocaleDateString()}</td>
              <td className="px-6 py-3">
                <span
                  className={`inline-block px-2 py-1 text-sm font-medium rounded-full ${
                    order.status === 'Confirmed'
                      ? 'bg-green-100 text-green-800'
                      : order.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {order.status}
                </span>
              </td>
              <td className="px-6 py-3">
                <img
                  src={order.image}
                  alt={order.workspace}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    );
  };

  return (
    <div className="max-w-[80%]  mx-auto">
      <h1 className="text-center font-bold text-3xl mb-6">Manage Orders</h1>
      {orderList.length > 0 ? (
        displayOrders()
      ) : (
        <p className="text-center">No orders available</p>
      )}
    </div>
  );
};

export default ManageOrders;
