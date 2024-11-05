'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

// Validation Schema using Yup
const SpaceSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.string().required('Price is required'),
  features: Yup.string(),
  image: Yup.string().required('Image URL is required'),
  area: Yup.number().required('Area is required').min(1, 'Area must be greater than 0'),
  facilities: Yup.string(),
  address: Yup.string().required('Address is required'),
});

const EditSpace = () => {
  // const router = useRouter();
  const { id } = useParams(); // Get space ID from URL
  const [initialValues, setInitialValues] = useState({
    title: '',
    description: '',
    price: '',
    features: '',
    image: '',
    area: '',
    facilities: '',
    address: '',
  });

  // Fetch space data based on ID
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/space/get/${id}`)
        .then((response) => {
          setInitialValues(response.data);
        })
        .catch((error) => {
          toast.error('Failed to load space details');
        });
    }
  }, [id]);

  // Formik for handling form submission
  const formik = useFormik({
    enableReinitialize: true, // Allow form to reinitialize when initialValues change
    initialValues: initialValues,
    validationSchema: SpaceSchema,
    onSubmit: (values) => {
      axios.put(`http://localhost:5000/space/update/${id}`, values)
        .then(() => {
          toast.success('Space updated successfully!');
          router.push('/managespace'); // Redirect to ManageSpace page
        })
        .catch((error) => {
          toast.error('Failed to update space');
        });
    },
  });

  // Handle file upload
  const uploadFile = (e) => {
    const file = e.target.files[0];
    const fd = new FormData();
    fd.append("myfile", file);
    fetch("http://localhost:5000/util/uploadfile", {
      method: "POST",
      body: fd,
    }).then((res) => {
      if (res.status === 200) {
        console.log("file uploaded");
        res.json().then(data => {
          formik.setFieldValue('image', data.url);
        })
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-3xl bg-white p-10 rounded-lg shadow-xl">
        <motion.div
          className="flex flex-col space-y-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-2xl font-bold text-gray-700 text-center">Edit Space</h1>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Title Field */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-black">Title</label>
              <input
                id="title"
                name="title"
                type="text"
                className="w-full p-3 border border-black text-black rounded-lg focus:border-blue-600"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
              />
              {formik.errors.title && formik.touched.title && (
                <p className="text-red-500 text-sm">{formik.errors.title}</p>
              )}
            </div>

            {/* Description Field */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                id="description"
                name="description"
                className="w-full p-3 border border-black text-black rounded-lg focus:border-blue-600"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
              />
              {formik.errors.description && formik.touched.description && (
                <p className="text-red-500 text-sm">{formik.errors.description}</p>
              )}
            </div>

            {/* Price Field */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
              <input
                id="price"
                name="price"
                type="text"
                className="w-full p-3 border border-black  text-black rounded-lg focus:border-blue-600"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.price}
              />
              {formik.errors.price && formik.touched.price && (
                <p className="text-red-500 text-sm">{formik.errors.price}</p>
              )}
            </div>

            {/* Features Field */}
            <div>
              <label htmlFor="features" className="block text-sm font-medium text-gray-700">Features</label>
              <input
                id="features"
                name="features"
                type="text"
                className="w-full p-3 border border-black text-black rounded-lg focus:border-blue-600"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.features}
              />
            </div>

            {/* Image Field */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
              <input
                type="file"
                className="w-full p-3 border border-black text-black rounded-lg focus:border-blue-600"
                onChange={uploadFile}
              />
              {formik.errors.image && formik.touched.image && (
                <p className="text-red-500 text-sm">{formik.errors.image}</p>
              )}
            </div>

            {/* Area Field */}
            <div>
              <label htmlFor="area" className="block text-sm font-medium text-gray-700">Area (sq. ft.)</label>
              <input
                id="area"
                name="area"
                type="number"
                className="w-full p-3 border border-black text-black rounded-lg focus:border-blue-600"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.area}
              />
              {formik.errors.area && formik.touched.area && (
                <p className="text-red-500 text-sm">{formik.errors.area}</p>
              )}
            </div>

            {/* Facilities Field */}
            <div>
              <label htmlFor="facilities" className="block text-sm font-medium text-gray-700">Facilities</label>
              <input
                id="facilities"
                name="facilities"
                type="text"
                className="w-full p-3 border border-black  text-black rounded-lg focus:border-blue-600"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.facilities}
              />
            </div>

            {/* Address Field */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <textarea
                id="address"
                name="address"
                className="w-full p-3 border border-black text-black rounded-lg focus:border-blue-600"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
              />
              {formik.errors.address && formik.touched.address && (
                <p className="text-red-500 text-sm">{formik.errors.address}</p>
              )}
            </div>

            <motion.button
              type="submit"
              className="w-full p-3 bg-blue-500 text-white font-bold rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Save Changes
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default EditSpace;
