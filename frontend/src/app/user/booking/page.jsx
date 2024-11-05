'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const BookingPage = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    user: '', // Assuming the user ID is available
    space: '',
    startDate: '',
    endDate: '',
    amount: 0,
    paymentMethod: '',
  });

  // State for available spaces (fetched from the API)
  const [spaces, setSpaces] = useState([]);
  const [userId, setUserId] = useState(''); // Assuming the user ID is available

  // Fetch available spaces when the component mounts
  useEffect(() => {
    // Fetch spaces from the API
    axios.get('http://localhost:5000/spaces')
      .then((response) => {
        setSpaces(response.data);
      })
      .catch((err) => {
        toast.error('Failed to fetch spaces');
      });

    // Set user ID (assuming user authentication is already handled)
    setUserId('user._id'); // Update this with actual logic to get the current user ID
  }, []);

  // Handle input change for the form fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const bookingData = { ...formData, user: userId };
    
    axios.post('http://localhost:5000/booking/create', bookingData)
      .then((response) => {
        toast.success('Booking confirmed!');
        // Reset the form
        setFormData({
          user: userId,
          space: '',
          startDate: '',
          endDate: '',
          amount: 0,
          paymentMethod: '',
        });
      })
      .catch((err) => {
        toast.error('Failed to confirm booking. Please try again.');
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-white to-blue-500 p-20">
      <div className="max-w-3xl mx-auto bg-blue-100 rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">Book Your Flexible Office Space</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Select Space */}
          <div className="relative w-full">
            <select
              name="space"
              value={formData.space}
              onChange={handleChange}
              required
              className="w-full border-2 border-gray-300  text-black rounded-lg px-4 py-2"
            >
              <option value="">Select a Space</option>
              {spaces.map((space) => (
                <option key={space._id} value={space._id}>
                  {space.name}
                </option>
              ))}
            </select>
          </div>

          {/* Start Date */}
          <div className="relative w-full">
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              className="w-full border-2 border-gray-300  text-black rounded-lg px-4 py-2"
              placeholder="Start Date"
            />
          </div>

          {/* End Date */}
          <div className="relative w-full">
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
              className="w-full border-2 border-gray-300  text-black rounded-lg px-4 py-2"
              placeholder="End Date"
            />
          </div>

          {/* Amount */}
          <div className="relative w-full">
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              className="w-full border-2 border-gray-300 text-black rounded-lg px-4 py-2"
              placeholder="Amount"
            />
          </div>

          {/* Payment Method */}
          <div className="relative w-full">
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
              className="w-full border-2 border-gray-300 text-black rounded-lg px-4 py-2"
            >
              <option value="">Select Payment Method</option>
              <option value="credit_card">Credit Card</option>
              <option value="debit_card">Debit Card</option>
              <option value="paypal">PayPal</option>
              {/* Add more payment methods if needed */}
            </select>
          </div>

          {/* Submit Button */}
          <div className="relative w-full">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
