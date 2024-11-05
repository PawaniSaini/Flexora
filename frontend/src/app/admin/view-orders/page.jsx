'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Simulating fetch orders with a delay (replace with real API call)
    setTimeout(() => {
      setOrders([
        { id: 1, spaceName: 'Modern Office Downtown', customer: 'John Doe', date: '2024-09-15', status: 'Pending', total: '$350' },
        { id: 2, spaceName: 'Cozy Workspace Uptown', customer: 'Jane Smith', date: '2024-09-12', status: 'Approved', total: '$220' },
        { id: 3, spaceName: 'Private Office Mid-City', customer: 'Alex Brown', date: '2024-09-10', status: 'Rejected', total: '$500' },
        { id: 4, spaceName: 'Loft Office Space', customer: 'Michael Scott', date: '2024-09-08', status: 'Pending', total: '$600' },
        { id: 5, spaceName: 'Open Space Downtown', customer: 'Pam Beesly', date: '2024-09-05', status: 'Approved', total: '$150' },
      ]);
    }, 1000);
  }, []);

  const handleStatusChange = (id, newStatus) => {
    const updatedOrders = orders.map(order =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      {/* Page heading with bounce animation */}
      <motion.div
        className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <motion.h1
          className="text-4xl font-extrabold text-center mb-8 text-gray-800"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          Manage Orders
        </motion.h1>

        <motion.div
          className="grid grid-cols-1 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } }
          }}
        >
          {orders.map(order => (
            <motion.div
              key={order.id}
              className="bg-white p-6 rounded-xl shadow-lg transform hover:shadow-2xl transition-shadow duration-300 hover:scale-105"
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0 }
              }}
            >
              {/* Order details with subtle hover scaling */}
              <motion.div
                className="flex justify-between items-center mb-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{order.spaceName}</h2>
                  <p className="text-gray-500">Customer: {order.customer}</p>
                  <p className="text-gray-400 text-sm">Order Date: {order.date}</p>
                </div>
                <motion.div
                  className="text-xl font-bold text-gray-700"
                  whileHover={{ rotate: 10 }}
                >
                  {order.total}
                </motion.div>
              </motion.div>

              <div className="flex justify-between items-center">
                {/* Status label with flip animation */}
                <motion.div
                  className={`px-4 py-2 rounded-lg text-sm font-bold ${
                    order.status === 'Approved' ? 'bg-green-500 text-white' :
                    order.status === 'Rejected' ? 'bg-red-500 text-white' :
                    'bg-yellow-500 text-white'
                  }`}
                  whileHover={{ rotate: 3 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  {order.status}
                </motion.div>

                {/* Action buttons with bounce and hover effects */}
                <div className="flex space-x-3">
                  <motion.button
                    className="px-4 py-2 bg-green-500 text-white text-sm font-bold rounded-lg hover:bg-green-600 transition-all duration-300"
                    onClick={() => handleStatusChange(order.id, 'Approved')}
                    whileHover={{ scale: 1.1, rotate: 3 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Approve
                  </motion.button>
                  <motion.button
                    className="px-4 py-2 bg-red-500 text-white text-sm font-bold rounded-lg hover:bg-red-600 transition-all duration-300"
                    onClick={() => handleStatusChange(order.id, 'Rejected')}
                    whileHover={{ scale: 1.1, rotate: -3 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Reject
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ViewOrders;
