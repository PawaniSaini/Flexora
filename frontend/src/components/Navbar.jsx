'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  let lastScrollY = 0;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      setIsVisible(false); // Hide navbar when scrolling down
    } else {
      setIsVisible(true); // Show navbar when scrolling up
    }
    lastScrollY = window.scrollY;
  };

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: isVisible ? 0 : -80 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 text-white w-full z-50"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src="/logo.png" alt="Flexible Space Logo" className="h-10 w-10" /> {/* Logo Image */}
            <span className="text-2xl font-bold">Flexora</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8">
            <a href="/" className="hover:text-blue-400 transition-colors duration-300">Home</a>
            <a href="/browse" className="hover:text-blue-400 transition-colors duration-300">Browse Spaces</a>
            <a href="/about" className="hover:text-blue-400 transition-colors duration-300">About Us</a>
            <a href="/contact" className="hover:text-blue-400 transition-colors duration-300">Contact</a>
            <a href="/login" className="hover:text-blue-400 transition-colors duration-300">Login</a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-2xl">
              {/* {isOpen ? <FaTimes /> : <FaBars />} */}
            </button>
          </div>
        </div>

        {/* Mobile Links */}
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: isOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
          className={`overflow-hidden md:hidden`}
        >
          <div className="flex flex-col space-y-4 pb-4">
            <a href="/" className="hover:text-blue-400 transition-colors duration-300">Home</a>
            <a href="/spaces" className="hover:text-blue-400 transition-colors duration-300">Browse Spaces</a>
            <a href="/about" className="hover:text-blue-400 transition-colors duration-300">About Us</a>
            <a href="/contact" className="hover:text-blue-400 transition-colors duration-300">Contact</a>
            <a href="/login" className="hover:text-blue-400 transition-colors duration-300">Login</a>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
