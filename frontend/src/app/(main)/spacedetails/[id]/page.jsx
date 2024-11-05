'use client';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import StarRatings from 'react-star-ratings';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';

const SpaceDetail = () => {
  const runOnce = useRef(false);
  const { id } = useParams();
  const [space, setSpace] = useState(null);
  const [rating, setRating] = useState(3);
  const messageRef = useRef();
  const [token, setToken] = useState(null);
  const [reviews, setReviews] = useState([]); // Initialize as an empty array

  // Fetch reviews with space ID
  const fetchReviews = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/review/getbyspace/${id}`);
      console.log(res.data);

      setReviews(res.data || []); // Set reviews or empty array if none
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    setToken(savedToken);
    fetchReviews();
  }, [id]);

  useEffect(() => {
    if (id) {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/space/getbyid/${id}`)
        .then((response) => {
          setSpace(response.data);
        }).catch((err) => {
          console.log(err);
          toast.error('Failed to load space details');
        });
    }
  }, [id]);

  const submitRating = () => {
    if (!messageRef.current.value) {
      toast.error("Please provide a comment!");
      return;
    }

    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/review/add`, {
      space: id,
      rating: rating,
      comment: messageRef.current.value,
    }, {
      headers: { 'x-auth-token': token }
    })
      .then(() => {
        toast.success('Review submitted');
        messageRef.current.value = '';
        setRating(3); // Reset rating after submission
        fetchReviews(); // Reload reviews
      }).catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 401) {
          toast.error('Session expired. Please log in again.');
        } else {
          toast.error('An error occurred. Please try again later.');
        }
      });
  };

  if (!space) {
    return <p className="text-center text-white">Loading...</p>;
  }

  return (
    <div className="bg-gray-900 min-h-screen py-10 px-6 font-sans">
      <Navbar />
      <div className="container mx-auto w-full shadow-lg  p-8 bg-gray-800 text-white flex flex-col md:flex-row gap-8">
        {/* Left Section: Space Details */}
        <motion.div
          className="w-full md:w-1/2 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Image */}
          <div className="relative overflow-hidden rounded-lg shadow-md">
            <motion.img
              src={space.image}
              alt={space.title}
              className="w-full h-72 object-cover transform transition-all duration-300 hover:scale-110"
            />
          </div>
          {/* Title and Info */}
          <div className="space-y-2">
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
          </div>
        </motion.div>

        {/* Right Section: Details, Review Form, and Reviews */}
        <motion.div
          className="w-full md:w-1/2 space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Description & Facilities */}
          <div className="bg-gray-700 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Details</h2>
            <p className="text-gray-400 mb-4">{space.description || 'No description available.'}</p>
            <h3 className="text-xl font-bold mb-2">Facilities</h3>
            <p className="text-gray-400">{space.facilities || 'Not available'}</p>
          </div>

          {/* Review Form */}
          <div className="bg-gray-700 rounded-lg shadow-lg p-4">
            <h2 className="text-2xl font-semibold mb-4">Submit Your Review</h2>
            <div className="flex items-center mb-4">
              <StarRatings
                rating={rating}
                starRatedColor="gold"
                changeRating={setRating}
                numberOfStars={5}
                className="mr-4"
              />
              <span className="text-lg font-medium text-gray-400">{rating}/5</span>
            </div>
            <textarea
              ref={messageRef}
              placeholder="Write your review here..."
              className="w-full h-32 text-black border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            ></textarea>
            <motion.button
              className="mt-2 w-full bg-indigo-600 text-white font-semibold text-lg px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300"
              onClick={submitRating}
              whileTap={{ scale: 0.95 }}
            >
              Submit Review
            </motion.button>
          </div>

          {/* Display Reviews */}
          <div className="bg-gray-700 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
            {reviews && reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={index} className="mb-4">
                  <StarRatings
                    rating={review.rating}
                    starRatedColor="gold"
                    numberOfStars={5}
                    starDimension="20px"
                    starSpacing="2px"
                  />
                  <p className="text-gray-300 mt-1">{review.comment}</p>
                  <p className="text-gray-300 mt-1">{review.user?.name}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No reviews available.</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SpaceDetail;
