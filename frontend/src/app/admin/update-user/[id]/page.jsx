'use client';
import axios from 'axios';
import { Formik } from 'formik';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const UpdateUser = () => {
  const { id } = useParams(); // Get user ID from the URL
  const router = useRouter();
  const [userData, setUserData] = useState(null);

  // Fetch user data by ID
  const getUserData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/user/getbyid/${id}`);
      // console.log(res.data);
      
      setUserData(res.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    getUserData();
  }, []);

  // Handle form submission
  const submitForm = (values) => {
    axios.put(`http://localhost:5000/user/update/${id}`, values)
      .then(() => {
        toast.success('User updated successfully');
        router.back(); // Navigate back to the previous page
      })
      .catch((err) => {
        console.error('Error updating user:', err);
        toast.error('Failed to update user');
      });
  };

  return (
    <div className='max-w-[80%] mx-auto'>
      <h1 className='text-center font-bold mt-5 text-3xl'>Update User</h1>

      {userData !== null ? (
        <Formik initialValues={userData} onSubmit={submitForm}>
          {(updateForm) => (
            <form className='border-2 p-4 bg-gray-200 rounded-lg' onSubmit={updateForm.handleSubmit}>
              {/* User ID (Read-Only) */}
              <label htmlFor="id">User ID</label>
              <input
                id='id'
                value={updateForm.values._id}
                type="text"
                readOnly
                className='border-2 border-gray-500 mb-5 rounded px-3 py-1 block w-full bg-gray-300'
              />

              {/* Name */}
              <label htmlFor="name">Name</label>
              <input
                id='name'
                onChange={updateForm.handleChange}
                value={updateForm.values.name}
                type="text"
                className='border-2 border-gray-500 mb-5 rounded px-3 py-1 block w-full'
              />

              {/* Email */}
              <label htmlFor="email">Email Address</label>
              <input
                id='email'
                onChange={updateForm.handleChange}
                value={updateForm.values.email}
                type="email"
                className='border-2 border-gray-500 mb-5 rounded px-3 py-1 block w-full'
              />

              {/* Role */}
              <label htmlFor="role">Role</label>
              <select
                id='role'
                onChange={updateForm.handleChange}
                value={updateForm.values.role}
                className='border-2 border-gray-500 mb-5 rounded px-3 py-1 block w-full'
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="manager">Manager</option>
              </select>

              {/* Status */}
              <label htmlFor="status">Status</label>
              <select
                id='status'
                onChange={updateForm.handleChange}
                value={updateForm.values.status}
                className='border-2 border-gray-500 mb-5 rounded px-3 py-1 block w-full'
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>

              {/* Submit Button */}
              <button className='bg-blue-500 text-white px-4 py-2 rounded mt-5' type="submit">Update User</button>
            </form>
          )}
        </Formik>
      ) : (
        <h1>Loading....</h1>
      )}
    </div>
  );
};

export default UpdateUser;
