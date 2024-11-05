'use client';
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState({
    title: '',
    description: '',
    review: '',
    rating: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  const submitFeedback = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/feedback', feedback);
      toast.success('Feedback submitted successfully');
      setFeedback({ title: '', description: '', review: '', rating: '' });
    } catch (error) {
      toast.error('Failed to submit feedback');
    }
  };

  return (
    <div
      className="relative h-screen bg-cover bg-center flex items-center justify-end"
      style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2017/01/09/12/08/office-1966381_640.jpg')" }} // Change to your flexible office image
    >
      {/* Transparent overlay on the feedback form */}
      <div className="absolute inset-0 bg-black opacity-10"></div> 

      <div className="relative z-10 w-1/2 max-w-md  p-8 bg-white/20 rounded-lg shadow-lg mr-10">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          We Value Your Feedback
        </h2>

        <form onSubmit={submitFeedback} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-black">Title</label>
            <input 
              type="text" 
              name="title" 
              value={feedback.title} 
              onChange={handleInputChange} 
              className="w-full px-4 py-2 border border-gray-500  text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" 
              placeholder="Enter your feedback title" 
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-black">Description</label>
            <textarea 
              name="description" 
              value={feedback.description} 
              onChange={handleInputChange} 
              className="w-full px-4 py-2 border border-gray-500 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition" 
              placeholder="Describe your experience" 
              rows="4" 
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-semibold text-black">Review</label>
            <textarea 
              name="review" 
              value={feedback.review} 
              onChange={handleInputChange} 
              className="w-full px-4 py-2 border border-gray-500 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition" 
              placeholder="Write your review" 
              rows="4" 
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-semibold text-black">Rating</label>
            <input 
              type="number" 
              name="rating" 
              value={feedback.rating} 
              onChange={handleInputChange} 
              className="w-full px-4 py-2 border border-gray-500 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition" 
              placeholder="Rate out of 5" 
              min="1" 
              max="5" 
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackPage;
