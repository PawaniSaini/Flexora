'use client';
import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="bg-gradient-to-r from-blue-300 to-teal-500 text-white min-h-screen py-12">
      <div className="py-10 px-4 max-w-6xl mx-auto font-sans">
        {/* About Us Heading */}
        <motion.section
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-5xl font-bold mb-4">About Us</h1>
          <p className="text-lg max-w-2xl mx-auto text-gray-100">
            Welcome to <strong>Flexora</strong>, where we specialize in providing{' '}
            <strong>customizable flexible office solutions</strong> designed to fit the unique needs of today’s professionals.
          </p>
        </motion.section>

        {/* Our Mission Section */}
        <section className="flex flex-col lg:flex-row items-center lg:space-x-12 mb-16">
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <h2 className="text-3xl font-semibold mb-6">Our Mission</h2>
            <p className="text-lg text-gray-100">
              Our mission is to <strong>empower businesses and professionals</strong> by providing flexible, innovative
              office solutions. We focus on sustainability and community, creating environments where businesses can thrive.
            </p>
          </motion.div>
          <motion.img
            src="https://cdn.pixabay.com/photo/2020/07/08/04/12/work-5382501_1280.jpg"
            alt="Our Mission"
            className="w-full lg:w-1/2 h-auto rounded-lg shadow-lg object-cover animate-fade-in-right"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </section>

        {/* What We Offer Section */}
        <section className="flex flex-col-reverse lg:flex-row items-center lg:space-x-12 mb-16">
          <motion.img
            src="https://media.istockphoto.com/id/872074042/photo/customer-relationship-concept.jpg?s=612x612&w=0&k=20&c=1-lP3UgGZ8SIcAsTcrh9hwggqQRdCj4UTI0q97JUIiY="
            alt="What We Offer"
            className="w-full lg:w-1/2 h-auto rounded-lg shadow-lg object-cover"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <h2 className="text-3xl font-semibold mb-6">What We Offer</h2>
            <ul className="text-lg text-gray-100 space-y-4">
              <li>
                <strong>Wide Variety:</strong> A broad selection of flexible office spaces to meet your business needs.
              </li>
              <li>
                <strong>Top-Notch Quality:</strong> High-quality facilities with best-in-class amenities and infrastructure.
              </li>
              <li>
                <strong>Exceptional Service:</strong> Dedicated support for your office space needs and seamless bookings.
              </li>
            </ul>
          </motion.div>
        </section>

        {/* Contact Us Section */}
        <section className="flex flex-col lg:flex-row items-center lg:space-x-12">
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <h2 className="text-3xl font-semibold mb-6">Contact Us</h2>
            <p className="text-lg text-gray-100 mb-4">
              Have any questions or want to learn more? Get in touch with us:
            </p>
            <p className="text-lg text-gray-100">
              <strong>Email:</strong>{' '}
              <a href="mailto:support@yourwebsite.com" className="text-yellow-300 hover:underline">
                support@yourwebsite.com
              </a>
              <br />
              <strong>Phone:</strong> 1-800-123-4567
              <br />
              <strong>Address:</strong> 123 Main Street, Anytown, USA
            </p>
          </motion.div>
          <motion.img
            src="https://cdn.pixabay.com/photo/2019/02/13/09/59/contact-3994013_1280.jpg"
            alt="Contact Us"
            className="w-full lg:w-1/2 h-auto rounded-lg shadow-lg object-cover"
            initial={{ opacity: 2, x: 100 }}
            animate={{ opacity: 2, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </section>
      </div>
    </div>
  );
};

export default About;
