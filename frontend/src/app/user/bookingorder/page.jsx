'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import toast from 'react-hot-toast';

const BookingOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch orders from the backend
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking/orders`, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token'), // Authentication token
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch booking orders');
      }

      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error(error);
      toast.error('Error fetching booking orders. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="container mx-auto py-10 px-6">
        <h1 className="text-3xl font-bold mb-6">Booking Orders</h1>

        {loading ? (
          <div className="text-center text-lg font-semibold">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-center text-lg font-semibold">No booking orders found!</div>
        ) : (
          <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg p-6">
            <table className="table-auto w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-700">
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Space Name</th>
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Start Date</th>
                  <th className="py-3 px-4">End Date</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-t border-gray-600">
                    <td className="py-3 px-4">{order.id}</td>
                    <td className="py-3 px-4">{order.space.title}</td>
                    <td className="py-3 px-4">{order.user.name}</td>
                    <td className="py-3 px-4">{new Date(order.startDate).toLocaleDateString()}</td>
                    <td className="py-3 px-4">{new Date(order.endDate).toLocaleDateString()}</td>
                    <td className="py-3 px-4">${order.amount}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-lg ${
                          order.status === 'Confirmed'
                            ? 'bg-green-600 text-white'
                            : order.status === 'Pending'
                            ? 'bg-yellow-600 text-white'
                            : 'bg-red-600 text-white'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingOrdersPage;
