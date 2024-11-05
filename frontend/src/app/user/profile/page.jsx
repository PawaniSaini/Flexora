'use client';
import axios from 'axios';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Fetch User Data from Backend
  const fetchUserData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/user/profile');
      setUserData(res.data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch user data');
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Submit form to update user data
  const submitForm = async (values) => {
    try {
      const res = await axios.put('http://localhost:5000/user/updateProfile', values);
      toast.success('Profile updated successfully');
      setUserData(res.data);
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="max-w-[80%] mx-auto">
      <h1 className="text-center font-bold text-3xl mt-6 mb-6">User Profile</h1>
      
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <Formik initialValues={userData} onSubmit={submitForm}>
          {(profileForm) => (
            <form
              className="border-2 p-4 bg-gray-200 rounded-lg"
              onSubmit={profileForm.handleSubmit}
            >
              {/* Name */}
              <label htmlFor="name" className="block text-lg font-semibold mb-2">Name</label>
              <input
                id="name"
                type="text"
                onChange={profileForm.handleChange}
                value={profileForm.values.name}
                className="border-2 border-gray-400 rounded px-3 py-2 block w-full mb-4"
              />

              {/* Email */}
              <label htmlFor="email" className="block text-lg font-semibold mb-2">Email</label>
              <input
                id="email"
                type="email"
                onChange={profileForm.handleChange}
                value={profileForm.values.email}
                className="border-2 border-gray-400 rounded px-3 py-2 block w-full mb-4"
              />

              {/* City */}
              <label htmlFor="city" className="block text-lg font-semibold mb-2">City</label>
              <input
                id="city"
                type="text"
                onChange={profileForm.handleChange}
                value={profileForm.values.city}
                className="border-2 border-gray-400 rounded px-3 py-2 block w-full mb-4"
              />

              {/* Profile Picture */}
              <label htmlFor="profilePicture" className="block text-lg font-semibold mb-2">Profile Picture</label>
              <div className="flex items-center mb-4">
                <img
                  src={userData.profilePicture}
                  alt="Profile"
                  className="w-24 h-24 object-cover rounded mr-4"
                />
                <input
                  id="profilePicture"
                  type="file"
                  onChange={(e) => profileForm.setFieldValue('profilePicture', e.target.files[0])}
                  className="block"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-5"
              >
                Update Profile
              </button>
            </form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default UserProfile;
