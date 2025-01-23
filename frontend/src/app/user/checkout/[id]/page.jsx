'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import axios from 'axios';
import { motion } from 'framer-motion';

const CheckoutPage = () => {
  const { id } = useParams();
  const [space, setSpace] = useState(null);
  const [userId, setUserId] = useState('');
  const [days, setDays] = useState(0);
  const token = localStorage.getItem('token');
  // console.log(token);


  useEffect(() => {
    // Fetch user ID from localStorage
    // const userId = localStorage.getItem('userId');
    // setUserId(userId);

    // Fetch space details
    if (id) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/space/getbyid/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setSpace(data);
        })
        .catch((err) => {
          console.error(err);
          toast.error('Failed to load space details.');
        });
    }
  }, [id]);

  // Formik form handling
  const formik = useFormik({
    initialValues: {
      space: id || '',
      startDate: '',
      endDate: '',
      amount: 0,
    },
    validationSchema: Yup.object({
      startDate: Yup.date().required('Start date is required'),
      endDate: Yup.date()
        .required('End date is required')
        .test('is-after-start', 'End date must be after start date', function (value) {
          const { startDate } = this.parent;
          return new Date(value) > new Date(startDate);
        }),
    }),
    onSubmit: (values) => confirmBooking(values),
  });

  // Calculate total days and update the amount
  useEffect(() => {
    const start = new Date(formik.values.startDate);
    const end = new Date(formik.values.endDate);
    const days = (end - start) / (1000 * 60 * 60 * 24);
    if (days && space !== null) {
      setDays(days);
      formik.setFieldValue('amount', days * space.price);
    }
  }, [formik.values.startDate, formik.values.endDate]);

  const confirmBooking = async (values) => {
    if (days <= 0) {
      toast.error('End date must be after the start date.');
      return;
    }

    const bookingData = {
      ...values
    };

    console.log(bookingData);


    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/booking/add`,
        bookingData,
        {
          headers: {
            'x-auth-token': token
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success('Booking created successfully!');
        formik.resetForm();
      } else {
        throw new Error('Failed to create booking');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error creating booking.');
    }
  };

  if (!space) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto py-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-800 p-8 rounded-lg shadow-lg">
          {/* Space Details Section */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={space.image}
              alt={space.title}
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
            <h1 className="text-3xl font-bold">{space.title}</h1>
            <p className="text-lg">
              <span className="font-semibold">Price:</span> ${space.price} / day
            </p>
            <p className="text-lg">
              <span className="font-semibold">Location:</span> {space.address}
            </p>
          </motion.div>

          {/* Booking Form Section */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold">Booking Details</h2>
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="space" className="block font-semibold mb-2">
                  Space ID
                </label>
                <input
                  type="text"
                  id="space"
                  value={formik.values.space}
                  readOnly
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600"
                />
              </div>
              <div>
                <label htmlFor="startDate" className="block font-semibold mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formik.values.startDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full p-3 rounded-lg bg-gray-700 text-white border ${formik.touched.startDate && formik.errors.startDate
                    ? 'border-red-600'
                    : 'border-gray-600'
                    }`}
                />
                {formik.touched.startDate && formik.errors.startDate && (
                  <p className="text-red-500 text-sm">{formik.errors.startDate}</p>
                )}
              </div>
              <div>
                <label htmlFor="endDate" className="block font-semibold mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formik.values.endDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full p-3 rounded-lg bg-gray-700 text-white border ${formik.touched.endDate && formik.errors.endDate
                    ? 'border-red-600'
                    : 'border-gray-600'
                    }`}
                />
                {formik.touched.endDate && formik.errors.endDate && (
                  <p className="text-red-500 text-sm">{formik.errors.endDate}</p>
                )}
              </div>
              <div>
                <label htmlFor="amount" className="block font-semibold mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  onChange={formik.handleChange}
                  value={formik.values.amount}
                  readOnly
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-lg font-semibold py-2 px-4 mt-4 rounded-lg transition-all"

              >
                Confirm Booking
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
    
  );
};

export default CheckoutPage;

