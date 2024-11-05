'use client';
import React from 'react';
import { motion } from 'framer-motion';
// import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Company Information */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold">Flexible Office Space</h2>
          <p className="text-gray-300">
            Offering the best flexible and modern office spaces for your business needs. From shared workspaces to premium corporate setups, we provide it all.
          </p>
        </motion.div>

        {/* Navigation Links */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-xl font-bold">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-blue-400 transition-colors duration-300">
                Home
              </a>
            </li>
            <li>
              <a href="/spaces" className="hover:text-blue-400 transition-colors duration-300">
                Browse Spaces
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-blue-400 transition-colors duration-300">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-blue-400 transition-colors duration-300">
                Contact
              </a>
            </li>
          </ul>
        </motion.div>

        {/* Contact & Social Media */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h3 className="text-xl font-bold">Contact Us</h3>
          <p>
            <strong>Email:</strong> support@flexibleoffices.com
          </p>
          <p>
            <strong>Phone:</strong> 1-800-123-4567
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-blue-500">
              {/* <FaFacebook size={24} /> */}
            </a>
            <a href="#" className="hover:text-blue-500">
              {/* <FaTwitter size={24} /> */}
            </a>
            <a href="#" className="hover:text-blue-500">
              {/* <FaLinkedin size={24} /> */}
            </a>
            <a href="#" className="hover:text-blue-500">
              {/* <FaInstagram size={24} /> */}
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="text-center text-gray-500 mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        © {new Date().getFullYear()} Flexible Office Space. All Rights Reserved.
      </motion.div>
    </footer>
  );
};

export default Footer;
