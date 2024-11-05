'use client'
import React from 'react'
import { motion } from 'framer-motion' // Import framer-motion for animations
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import axios from 'axios';
import toast from 'react-hot-toast';
import * as Yup from 'yup'

// Form validation schema using Yup
const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required')
    .matches(/[a-z]/, 'must include lowercase')
    .matches(/[A-Z]/, 'must include uppercase')
    .matches(/[0-9]/, 'must contain a number')
    .matches(/\W/, 'must contain a special character'),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const Signup = () => {
  const router = useRouter();
  
  // Formik form handling
  const signupForm = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmpassword: ''
    },
    validationSchema: SignupSchema,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      console.log(values); // Log form values to see them

      // Post request to server using axios
      axios.post('http://localhost:5000/user/add', values)
        .then((response) => {
          console.log(response.status); // Log server response
          resetForm(); // Reset the form
          toast.success('User Registered Successfully'); // Display success message
          router.push('/login'); // Redirect to login page
        })
        .catch((err) => {
          console.log(err); // Log errors
          if (err.response.data.code === 11000) {
            toast.error('Email already exists'); // Handle duplicate email case
          }
          setSubmitting(false);
        });
    },
  });

  console.log(signupForm.errors); // For debugging, log any form validation errors

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="flex w-full max-w-4xl rounded-lg bg-white shadow-2xl">
        {/* Left Content Section */}
        <motion.div
          className="w-1/2 p-10 bg-blue-300 text-white flex flex-col justify-center rounded-l-lg"
          initial={{ opacity: 0, x: -50 }} // Animation for sliding in
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold mb-5">Join Flexora</h1>
          <p className="text-lg">
            Sign up today to access the best workspaces that suit your business needs.
            Whether you're a freelancer, startup, or large enterprise, we have customizable
            solutions for you.
          </p>
          <img
            src="https://cdn.pixabay.com/photo/2017/01/23/09/05/render-2001817_960_720.jpg" // Add your image path here
            alt="Flexible Office"
            className="mt-10 w-full h-auto rounded-lg"
          />
        </motion.div>

        {/* Right Form Section */}
        <motion.div
          className="w-1/2 p-10 flex flex-col justify-center space-y-5"
          initial={{ opacity: 0, x: 50 }} // Animation for sliding in from the right
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <form onSubmit={signupForm.handleSubmit} className="space-y-5">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-700">Create Your Account</h2>
              <p className="text-gray-500">Sign up to get started with Flexora</p>
            </div>

            {/* Fullname Input */}
            <div className="relative w-full">
              <input
                type="text"
                id="name"
                name="name"
                value={signupForm.values.name}
                onChange={signupForm.handleChange}
                onBlur={signupForm.handleBlur}
                className="border-1 peer block w-full rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                placeholder=" "
              />
              <label
                htmlFor="name"
                className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
              >
                Enter Your Name
              </label>
              {signupForm.touched.name && signupForm.errors.name ? (
                <div className="text-red-500 text-sm">{signupForm.errors.name}</div>
              ) : null}
            </div>

            {/* Username Input */}
            {/* <div className="relative w-full">
              <input
                type="text"
                id="username"
                name="username"
                value={signupForm.values.username}
                onChange={signupForm.handleChange}
                onBlur={signupForm.handleBlur}
                className="border-1 peer block w-full rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                placeholder=" "
              />
              <label
                htmlFor="username"
                className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
              >
                Enter Your Username
              </label>
              {signupForm.touched.username && signupForm.errors.username ? (
                <div className="text-red-500 text-sm">{signupForm.errors.username}</div>
              ) : null}
            </div> */}

            {/* Email Input */}
            <div className="relative w-full">
              <input
                type="email"
                id="email"
                name="email"
                value={signupForm.values.email}
                onChange={signupForm.handleChange}
                onBlur={signupForm.handleBlur}
                className="border-1 peer block w-full rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                placeholder=" "
              />
              <label
                htmlFor="email"
                className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
              >
                Enter Your Email
              </label>
              {signupForm.touched.email && signupForm.errors.email ? (
                <div className="text-red-500 text-sm">{signupForm.errors.email}</div>
              ) : null}
            </div>

            {/* Password Input */}
            <div className="relative w-full">
              <input
                type="password"
                id="password"
                name="password"
                value={signupForm.values.password}
                onChange={signupForm.handleChange}
                onBlur={signupForm.handleBlur}
                className="border-1 peer block w-full rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                placeholder=" "
              />
              <label
                htmlFor="password"
                className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
              >
                Enter Your Password
              </label>
              {signupForm.touched.password && signupForm.errors.password ? (
                <div className="text-red-500 text-sm">{signupForm.errors.password}</div>
              ) : null}
            </div>

            {/* Confirm Password Input */}
            <div className="relative w-full">
              <input
                type="password"
                id="confirmpassword"
                name="confirmpassword"
                value={signupForm.values.confirmpassword}
                onChange={signupForm.handleChange}
                onBlur={signupForm.handleBlur}
                className="border-1 peer block w-full rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                placeholder=" "
              />
              <label
                htmlFor="confirmpassword"
                className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
              >
                Confirm Your Password
              </label>
              {signupForm.touched.confirmpassword && signupForm.errors.confirmpassword ? (
                <div className="text-red-500 text-sm">{signupForm.errors.confirmpassword}</div>
              ) : null}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full rounded-lg bg-blue-400 py-3 font-bold text-white mt-5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={signupForm.isSubmitting} // Disable button while submitting
            >
              Sign Up
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default Signup;
