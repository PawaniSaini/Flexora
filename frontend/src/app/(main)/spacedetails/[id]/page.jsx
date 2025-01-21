'use client';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState, useRef } from 'react';
import toast from 'react-hot-toast';
import StarRatings from 'react-star-ratings';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';

const SpaceDetail = () => {
  const { id } = useParams();
  const [space, setSpace] = useState(null);
  const [token, setToken] = useState(null);
  const [rating, setRating] = useState(3);
  const [reviews, setReviews] = useState([]);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const messageRef = useRef();
  const router = useRouter();

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    setToken(savedToken);

    if (id) {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/space/getbyid/${id}`)
        .then(response => setSpace(response.data))
        .catch(() => toast.error('Failed to load space details'));
      
      fetchReviews();
    }
  }, [id]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/review/getbyspace/${id}`);
      setReviews(response.data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleCheckout = () => {
    if (token) {
      toast.success("Proceeding to Checkout");
      router.push(`/user/checkout/${space._id}`);
    } else {
      toast.error("Please log in to proceed to checkout.");
      router.push('/login');
    }
  };

  if (!space) {
    return <p className="text-center text-gray-700">Loading...</p>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6">
      <Navbar />
      
      <div className="container mx-auto w-full shadow-lg rounded-lg p-8 bg-white flex flex-col md:flex-row gap-10">
        <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src={space.image} alt={space.title} className="w-full h-72 object-cover rounded-lg shadow-md" />
          <h1 className="text-3xl font-semibold mt-4">{space.title}</h1>
          <p className="mt-2 text-lg text-gray-600">Price: ${space.price} / day</p>
          <p className="text-lg text-gray-600">Location: {space.address}</p>
          <motion.button
            className="mt-6 bg-teal-500 text-white px-6 py-2 rounded-lg shadow hover:bg-teal-600"
            onClick={handleCheckout}
            whileTap={{ scale: 0.95 }}
          >
            Checkout
          </motion.button>
        </motion.div>

        <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold">Details</h2>
          <p className="mt-4">{space.description}</p>
          
          <h3 className="mt-6 text-xl font-bold">Submit Your Review</h3>
          <StarRatings
            rating={rating}
            changeRating={setRating}
            numberOfStars={5}
            starRatedColor="gold"
          />
          <textarea ref={messageRef} className="mt-4 w-full h-32 border rounded p-2" placeholder="Write your review..."></textarea>
          
          <motion.button
            className="mt-4 bg-teal-500 text-white px-6 py-2 rounded-lg shadow hover:bg-teal-600"
            onClick={() => {
              if (messageRef.current.value) {
                toast.success('Review Submitted!');
              } else {
                toast.error('Please enter a review before submitting.');
              }
            }}
            whileTap={{ scale: 0.95 }}
          >
            Submit Review
          </motion.button>
          
          <h3 className="mt-8 text-xl font-bold">Reviews</h3>
          <div className="mt-4">
            {reviews.length > 0 ? reviews.map((review, index) => (
              <div key={index} className="border-b pb-2 mt-2">
                <StarRatings rating={review.rating} numberOfStars={5} starRatedColor="gold" />
                <p className="mt-2 text-gray-600">{review.comment}</p>
              </div>
            )) : (
              <p className="text-gray-500">No reviews yet.</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SpaceDetail;
