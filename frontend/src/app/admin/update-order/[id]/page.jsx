'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

const UpdateOrder = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = useParams(); // Fetch orderId from query parameters

  // State to hold order details
  const [orderDetails, setOrderDetails] = useState({
    username: '',
    spacename: '',
    startDate: '',
    endDate: '',
    amount: '',
  });

  // Fetch the order details using orderId
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/orders/${orderId}`
        ); // Replace with your API endpoint
        setOrderDetails(response.data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails({ ...orderDetails, [name]: value });
  };

  // Submit updated order details
  const handleUpdateOrder = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/orders/update/${orderId}`, // Replace with your API endpoint
        orderDetails
      );
      alert('Order updated successfully!');
      router.push('/admin/manage-orders'); // Redirect to Manage Orders page
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center mb-6">
          Update Order #{orderId}
        </h2>
        <form onSubmit={handleUpdateOrder}>
          {/* Username */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={orderDetails.username}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md bg-gray-50"
              placeholder="Enter username"
              required
            />
          </div>

          {/* Spacename */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Space Name
            </label>
            <input
              type="text"
              name="spacename"
              value={orderDetails.spacename}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md bg-gray-50"
              placeholder="Enter space name"
              required
            />
          </div>

          {/* Start Date */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={orderDetails.startDate}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md bg-gray-50"
              required
            />
          </div>

          {/* End Date */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={orderDetails.endDate}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md bg-gray-50"
              required
            />
          </div>

          {/* Amount */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              value={orderDetails.amount}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md bg-gray-50"
              placeholder="Enter amount"
              required
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push('/admin/manage-orders')}
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Update Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateOrder;
