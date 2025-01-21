'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion'; // For animations
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import * as Yup from 'yup'; // For form validation

// Validation schema using Yup
const AdminLoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const AdminLogin = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Formik for handling the form
  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: AdminLoginSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        // Fetch admin details using GET request
        const response = await axios.get('http://localhost:5000/admin/authenticate', {
          params: {
            email: values.email,
            password: values.password,
          },
        });

        if (response.data.success) {
          toast.success('Login successful');
          localStorage.setItem('adminToken', response.data.token);
          localStorage.setItem('adminData', JSON.stringify(response.data.admin));

          // Redirect to admin dashboard
          router.push('/admin/dashboard');
        } else {
          toast.error(response.data.message || 'Invalid credentials');
        }
      } catch (error) {
        console.error(error);
        toast.error('An error occurred while logging in');
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl rounded-lg bg-white shadow-2xl">
        {/* Left Form Section */}
        <motion.div
          className="w-1/2 p-10 rounded-lg flex flex-col justify-center space-y-5"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-700">Admin Login</h2>
            <p className="text-gray-500">Log in to manage Flexora's workspaces</p>
          </div>

          {/* Formik form */}
          <form onSubmit={loginForm.handleSubmit} className="space-y-4">
            <div className="relative w-full">
              <input
                type="email"
                id="email"
                name="email"
                className="peer block w-full rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none"
                placeholder=" "
                value={loginForm.values.email}
                onChange={loginForm.handleChange}
                onBlur={loginForm.handleBlur}
              />
              <label
                htmlFor="email"
                className="absolute top-2 left-1 z-10 -translate-y-4 scale-75 transform select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600"
              >
                Enter Your Email
              </label>
              {loginForm.errors.email && loginForm.touched.email && (
                <div className="text-red-500 text-sm">{loginForm.errors.email}</div>
              )}
            </div>

            <div className="relative w-full">
              <input
                type="password"
                id="password"
                name="password"
                className="peer block w-full rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none"
                placeholder=" "
                value={loginForm.values.password}
                onChange={loginForm.handleChange}
                onBlur={loginForm.handleBlur}
              />
              <label
                htmlFor="password"
                className="absolute top-2 left-1 z-10 -translate-y-4 scale-75 transform select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600"
              >
                Enter Your Password
              </label>
              {loginForm.errors.password && loginForm.touched.password && (
                <div className="text-red-500 text-sm">{loginForm.errors.password}</div>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={loginForm.isSubmitting || isLoading}
              className="w-full rounded-lg bg-blue-400 py-3 font-bold text-white mt-5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </motion.button>
          </form>
        </motion.div>

        {/* Right Content Section */}
        <motion.div
          className="w-1/2 p-10 bg-blue-300 text-white flex flex-col justify-center rounded-r-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-4xl font-bold mb-5">Welcome Admin</h1>
          <p className="text-lg">
            Manage flexible office spaces, users, and bookings with ease.
          </p>
          <img
            src="https://media.istockphoto.com/id/1901941398/photo/marketing-team-working-together-at-task-table.jpg?s=612x612&w=0&k=20&c=fcRg5Lit3TeCdkdCGdpqMTvh5os6uYJX3HVPkv1jptA="
            alt="Admin Workspace"
            className="mt-10 w-full h-auto rounded-lg"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;
