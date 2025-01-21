'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footers';


const ContactUsPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar />

      {/* Contact Section */}
      <div className="container mx-auto py-16 px-8">
        <h1 className="text-4xl font-bold text-center mb-12">Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            className="bg-gray-800 p-8 rounded-lg shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-2xl font-semibold mb-6">Get In Touch</h2>
            <form className="space-y-6">
              <div>
                <label className="block font-medium mb-2">Your Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Message</label>
                <textarea
                  placeholder="Type your message"
                  rows="4"
                  className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <motion.button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all"
                whileHover={{ scale: 1.05 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-2xl font-semibold">Contact Information</h2>
            <p>Feel free to reach out to us for any inquiries or support.</p>

            <div className="space-y-3">
              <div>
                <strong>Phone:</strong> +123 456 7890
              </div>
              <div>
                <strong>Email:</strong> contact@flexiblespace.com
              </div>
              <div>
                <strong>Office Address:</strong> 123 Flexible Space Street, City Name, Country
              </div>
              <div>
                <strong>WhatsApp:</strong> +987 654 3210
              </div>
            </div>

            {/* Google Map Placeholder */}
            <div className="mt-8">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151!2d144.9537363!3d-37.817209"
                width="100%"
                height="200"
                className="rounded-lg shadow-lg"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUsPage;
