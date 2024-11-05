'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const ManageSpace = () => {
  const [spaces, setSpaces] = useState([]);

  // Fetch spaces data from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/space/getall') // Fetch all spaces from the API
      .then((response) => {
        setSpaces(response.data);
      })
      .catch((error) => {
        toast.error('Failed to fetch spaces');
      });
  }, []);

  // Handle delete space
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/space/delete/${id}`)
      .then(() => {
        toast.success('Space deleted successfully!');
        setSpaces(spaces.filter(space => space._id !== id)); // Remove deleted space from the list
      })
      .catch(() => {
        toast.error('Failed to delete space');
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <motion.div
        className="container mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-3xl font-bold text-gray-700 mb-8 text-center">Manage Spaces</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {spaces.length > 0 ? spaces.map((space) => (
            <motion.div
              key={space._id}
              className="bg-white p-5 rounded-lg shadow-md"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Image Section */}
              <img
                src={space.image}
                alt={space.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />

              {/* Space Details */}
              <h2 className="text-xl font-bold text-gray-800">{space.title}</h2>
              <p className="text-gray-600 mt-2">{space.description.substring(0, 100)}...</p>
              
              <div className="mt-4">
                <span className="block text-sm text-gray-600"><strong>Price:</strong> {space.price} per day</span>
                <span className="block text-sm text-gray-600"><strong>Features:</strong> {space.features}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  onClick={() => window.location.href = `/admin/editspaces/${space._id}`} // Redirect to edit page
                >
                  Edit
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  onClick={() => handleDelete(space._id)}
                >
                  Delete
                </motion.button>
              </div>
            </motion.div>
          )) : (
            <p className="text-center text-gray-500">No spaces available.</p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ManageSpace;
