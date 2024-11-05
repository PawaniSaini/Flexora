'use client';
import React from 'react';
import { motion } from 'framer-motion'; // For animations
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import * as Yup from 'yup'; // For form validation

// Validation schema using Yup
const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Password should be at least 6 characters').required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

const Signup = () => {
  const router = useRouter();

  // Formik for handling the form
  const signupForm = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: SignupSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true); // Disable form while submitting
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/add`, values)
        .then((response) => {
          toast.success('Signup successful');
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data));
          router.push('/addspace'); // Navigate to admin space management
        })
        .catch((err) => {
          toast.error(err.response?.data?.message || 'Signup failed');
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

      {/* Signup Card */}
      <motion.div
        className="relative z-10 bg-white p-10 rounded-lg shadow-2xl max-w-md w-full"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Admin Signup
        </h2>
        
        <form onSubmit={signupForm.handleSubmit}>
          {/* Name Input */}
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-gray-600 mb-2"
            >
              Full Name
            </label>
            <motion.input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={signupForm.values.name}
              onChange={signupForm.handleChange}
              onBlur={signupForm.handleBlur}
              whileFocus={{ borderColor: '#3b82f6' }}
            />
            {signupForm.errors.name && signupForm.touched.name && (
              <div className="text-red-500 text-sm">{signupForm.errors.name}</div>
            )}
          </div>

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
              value={signupForm.values.email}
              onChange={signupForm.handleChange}
              onBlur={signupForm.handleBlur}
              whileFocus={{ borderColor: '#3b82f6' }}
            />
            {signupForm.errors.email && signupForm.touched.email && (
              <div className="text-red-500 text-sm">{signupForm.errors.email}</div>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-600 mb-2"
            >
              Password
            </label>
            <motion.input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={signupForm.values.password}
              onChange={signupForm.handleChange}
              onBlur={signupForm.handleBlur}
              whileFocus={{ borderColor: '#3b82f6' }}
            />
            {signupForm.errors.password && signupForm.touched.password && (
              <div className="text-red-500 text-sm">{signupForm.errors.password}</div>
            )}
          </div>

          {/* Confirm Password Input */}
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-600 mb-2"
            >
              Confirm Password
            </label>
            <motion.input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={signupForm.values.confirmPassword}
              onChange={signupForm.handleChange}
              onBlur={signupForm.handleBlur}
              whileFocus={{ borderColor: '#3b82f6' }}
            />
            {signupForm.errors.confirmPassword && signupForm.touched.confirmPassword && (
              <div className="text-red-500 text-sm">{signupForm.errors.confirmPassword}</div>
            )}
          </div>

          {/* Signup Button with Animation */}
          <motion.button
            type="submit"
            disabled={signupForm.isSubmitting}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none"
            whileHover={{ rotate: [0, 10, -10, 0], scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            {signupForm.isSubmitting ? 'Signing up...' : 'Sign Up'}
          </motion.button>
        </form>

        {/* Additional links */}
        <p className="text-sm text-gray-500 text-center mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 underline">
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
