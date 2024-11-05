'use client';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';

const BookingCheckout = () => {
  const { id } = useParams();
  const [space, setSpace] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    setToken(savedToken);

    // Fetch space details by ID
    if (id) {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/space/getbyid/${id}`)
        .then((response) => {
          console.log(response.data);

          setSpace(response.data);
        }).catch((err) => {
          console.log(err);
          toast.error('Failed to load space details');
        });
    }
  }, [id]);

  const handleBooking = async () => {
    if (!startDate || !endDate) {
      toast.error('Please select both start and end dates.');
      return;
    }

    // Calculate total price (example calculation: price per day multiplied by number of days)
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = (end - start) / (1000 * 60 * 60 * 24);

    if (days <= 0) {
      toast.error('End date must be after start date.');
      return;
    }

    const total = days * space.price;
    setTotalPrice(total);

    // Proceed to booking (this could be a POST request to your backend)
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/booking/create`, {
        spaceId: id,
        startDate,
        endDate,
      }, {
        headers: { 'x-auth-token': token }
      });

      toast.success('Booking successful! Total price: $' + total);
    } catch (error) {
      console.error('Error during booking:', error);
      toast.error('Failed to complete booking.');
    }
  };

  if (!space) {
    return <>

      <div className="bg-gray-900 min-h-screen py-10 px-6 font-sans loading">
        <div className="container mx-auto w-full shadow-lg p-8 bg-gray-800 text-white flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2 space-y-6 animate-pulse">
            <div className="h-10 bg-gray-200 rounded mb-4" />
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-1" />
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-1" />
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-1" />
            <div className="h-4 bg-gray-200 rounded w-full" />
          </div>
          <div className="w-full md:w-1/2 space-y-6 animate-pulse">
            <div className="h-10 bg-gray-200 rounded mb-4" />
            <div className="h-10 bg-gray-200 rounded w-full mb-1" />
            <div className="h-10 bg-gray-200 rounded w-full mb-1" />
          </div>
        </div>
      </div>
      ``` For this basic example, I determined the height (h-10, h-4) and width
      (w-full, w-1/2) of the loading skeleton based on the layout you provided in
      the JSX of your react component, but you may need to adjust these values based
      on your actual styling. The `animate-pulse` class provides the loading
      animation. Each `div` represents a line of text or a UI element that would
      otherwise be in the component.
    </>

  }

  return (
    <div className="bg-gray-900 min-h-screen py-10 px-6 font-sans">
      <Navbar />
      <div className="container mx-auto w-full shadow-lg p-8 bg-gray-800 text-white flex flex-col md:flex-row gap-8">
        <motion.div
          className="w-full md:w-1/2 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Space Details */}
          <h1 className="text-3xl font-bold">{space.title}</h1>
          <p className="text-lg text-gray-300">
            <span className="font-semibold">Price:</span> ${space.price} / day
          </p>
          <p className="text-lg text-gray-300">
            <span className="font-semibold">Area:</span> {space.area} sq ft
          </p>
          <p className="text-lg text-gray-300">
            <span className="font-semibold">Location:</span> {space.address}
          </p>
          <p className="text-lg text-gray-300">
            <span className="font-semibold">Description:</span> {space.description || 'No description available.'}
          </p>
        </motion.div>

        {/* Booking Section */}
        <motion.div
          className="w-full md:w-1/2 space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Book Your Space</h2>
          <div className="space-y-4">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <motion.button
              className="mt-2 w-full bg-indigo-600 text-white font-semibold text-lg px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300"
              onClick={handleBooking}
              whileTap={{ scale: 0.95 }}
            >
              Book Now
            </motion.button>
          </div>
          {totalPrice > 0 && (
            <div className="text-lg text-gray-300 mt-4">
              <p>Total Price: <span className="font-bold">${totalPrice}</span></p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default BookingCheckout;
