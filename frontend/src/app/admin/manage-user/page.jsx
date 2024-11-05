'use client';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';

const ManageUsers = () => {
  const runOnce = useRef(false);
  const [userList, setUserList] = useState([]);

  // Fetch Users from API
  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:5000/user/getall');
    setUserList(res.data);
  };

  // Delete User
  const deleteUser = (id) => {
    axios.delete(`http://localhost:5000/user/delete/${id}`)
      .then(() => {
        toast.success('User deleted successfully');
        fetchUsers(); // Refetch users after deletion
      })
      .catch((err) => {
        toast.error('Failed to delete user');
        console.error(err);
      });
  };

  useEffect(() => {
    if (!runOnce.current) {
      fetchUsers();
      runOnce.current = true;
    }
  }, []);

  // Display Users Table
  const displayUsers = () => {
    return (
      <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
        <thead className="bg-gray-50 dark:bg-neutral-800">
          <tr>
            <th className="px-6 py-3 text-start">ID</th>
            <th className="px-6 py-3 text-start">Name</th>
            <th className="px-6 py-3 text-start">Email</th>
            <th className="px-6 py-3 text-start">Role</th>
            <th className="px-6 py-3 text-start">Status</th>
            <th className="px-6 py-3 text-end" colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
          {userList.map((user) => (
            <tr key={user._id}>
              <td className="px-6 py-3">{user._id}</td>
              <td className="px-6 py-3">{user.name}</td>
              <td className="px-6 py-3">{user.email}</td>
              <td className="px-6 py-3">{user.role}</td>
              <td className="px-6 py-3">
                <span
                  className={`inline-block px-2 py-1 text-sm font-medium rounded-full ${
                    user.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {user.status}
                </span>
              </td>
              <td className="px-6 py-1.5">
                <Link
                  href={`/admin/update-user/${user._id}`}
                  className="inline-flex items-center gap-x-1 text-sm text-blue-600 hover:underline font-medium"
                >
                  Edit
                </Link>
              </td>
              <td className="px-6 py-1.5">
                <button
                  onClick={() => deleteUser(user._id)}
                  className="text-sm text-white font-medium bg-red-600 rounded-lg px-3 py-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="max-w-[80%] mx-auto">
      <h1 className="text-center font-bold text-3xl mb-6">Manage Users</h1>
      {displayUsers()}
    </div>
  );
};

export default ManageUsers;
