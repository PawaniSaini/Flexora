'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation'; // For fetching dynamic params
import { motion } from 'framer-motion';

const UpdateSpace = () => {
  const router = useRouter();
  const { id } = useParams(); // Get the dynamic space ID from the URL

  const [spaceDetails, setSpaceDetails] = useState({
    name: '',
    location: '',
    price: '',
    description: '',
    amenities: '',
    availability: '',
  });

  useEffect(() => {
    if (id) {
      // Fetch space details using the ID
      // This is where you'd make an API call to fetch space data for this ID
      console.log('Fetch space details for ID:', id);
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSpaceDetails({ ...spaceDetails, [name]: value });
  };

  const handleUpdate = () => {
    // Update space logic here (e.g., API call)
    console.log('Updated Space Details:', spaceDetails);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 p-10">
      <motion.div
        className="bg-white shadow-lg rounded-2xl p-10 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Update Space: {id}</h1>

        <div className="space-y-6">
          {/* Space Name */}
          <div className="relative">
            <label htmlFor="name" className="absolute -top-2 left-3 bg-white px-1 text-gray-600 text-sm">Space Name</label>
            <motion.input
              type="text"
              name="name"
              id="name"
              value={spaceDetails.name}
              onChange={handleInputChange}
              className="w-full rounded-xl border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            />
          </div>

          {/* Location */}
          <div className="relative">
            <label htmlFor="location" className="absolute -top-2 left-3 bg-white px-1 text-gray-600 text-sm">Location</label>
            <motion.input
              type="text"
              name="location"
              id="location"
              value={spaceDetails.location}
              onChange={handleInputChange}
              className="w-full rounded-xl border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            />
          </div>

          {/* Price */}
          <div className="relative">
            <label htmlFor="price" className="absolute -top-2 left-3 bg-white px-1 text-gray-600 text-sm">Price</label>
            <motion.input
              type="text"
              name="price"
              id="price"
              value={spaceDetails.price}
              onChange={handleInputChange}
              className="w-full rounded-xl border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            />
          </div>

          {/* Description */}
          <div className="relative">
            <label htmlFor="description" className="absolute -top-2 left-3 bg-white px-1 text-gray-600 text-sm">Description</label>
            <motion.textarea
              name="description"
              id="description"
              value={spaceDetails.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full rounded-xl border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            />
          </div>

          {/* Amenities */}
          <div className="relative">
            <label htmlFor="amenities" className="absolute -top-2 left-3 bg-white px-1 text-gray-600 text-sm">Amenities</label>
            <motion.input
              type="text"
              name="amenities"
              id="amenities"
              value={spaceDetails.amenities}
              onChange={handleInputChange}
              className="w-full rounded-xl border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            />
          </div>

          {/* Availability */}
          <div className="relative">
            <label htmlFor="availability" className="absolute -top-2 left-3 bg-white px-1 text-gray-600 text-sm">Availability</label>
            <motion.input
              type="text"
              name="availability"
              id="availability"
              value={spaceDetails.availability}
              onChange={handleInputChange}
              className="w-full rounded-xl border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            />
          </div>

          {/* Submit Button */}
          <motion.button
            onClick={handleUpdate}
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl shadow-md hover:bg-blue-700 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Update Space
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default UpdateSpace;
