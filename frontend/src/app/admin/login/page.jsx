'use client';
import React from 'react';
import { motion } from 'framer-motion'; // For animations
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import * as Yup from 'yup'; // For form validation

// Validation schema using Yup
const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const Login = () => {
  const router = useRouter();

  // Formik for handling the form
  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true); // Disable form while submitting
      axios.post('http://localhost:5000/user/authenticate', values)
        .then((response) => {
          toast.success('Login successful');
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data));

          const { role } = response.data;
          if (role === 'admin') {
            router.push('/addspace'); // Change route if needed
          } else {
            router.push('/');
          }
        })
        .catch((err) => {
          toast.error(err.response?.data?.message || 'Login failed');
        })
        .finally(() => {
          setSubmitting(false); // Re-enable form after submission
        });
    },
  });

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-300 via-blue-300 to-pink-300">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-400 to-blue-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />

      {/* Login Card */}
      <motion.div
        className="relative z-10 bg-white p-10 rounded-lg shadow-2xl max-w-md w-full"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Admin Login
        </h2>
        
        <form onSubmit={loginForm.handleSubmit}>
          {/* Email Input */}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-600 mb-2"
            >
              Email Address
            </label>
            <motion.input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={loginForm.values.email}
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
              whileFocus={{ borderColor: '#3b82f6' }}
            />
            {loginForm.errors.email && loginForm.touched.email && (
              <div className="text-red-500 text-sm">{loginForm.errors.email}</div>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-black mb-2"
            >
              Password
            </label>
            <motion.input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={loginForm.values.password}
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
              whileFocus={{ borderColor: '#3b82f6' }}
            />
            {loginForm.errors.password && loginForm.touched.password && (
              <div className="text-red-500 text-sm">{loginForm.errors.password}</div>
            )}
          </div>

          {/* Login Button with Animation */}
          <motion.button
            type="submit"
            disabled={loginForm.isSubmitting}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none"
            whileHover={{ rotate: [0, 10, -10, 0], scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            {loginForm.isSubmitting ? 'Logging in...' : 'Login'}
          </motion.button>
        </form>

        {/* Additional links */}
        <p className="text-sm text-gray-500 text-center mt-4">
          Don't have an account?{' '}
          <a href="/admin/signup" className="text-blue-500 underline">
            Sign Up
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
