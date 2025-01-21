'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Footer from '@/components/Footers';

// Navbar with dropdown for Login as Admin/User
const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <nav className="bg-transparent absolute top-0 left-0 w-full z-50 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-2xl">Flexora</div>
        <div className="flex space-x-6 text-white">
          <a href="/about" className="hover:text-gray-400">About</a>
          <a href="/browse" className="hover:text-gray-400">Browse</a>
          <div className="relative">
            <button
              onClick={() => setIsLoginOpen(!isLoginOpen)}
              className="hover:text-gray-400"
            >
              Login
            </button>
            {isLoginOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg">
                <a href="/admin/login" className="block px-4 py-2 hover:bg-gray-200">Login as Admin</a>
                <a href="login" className="block px-4 py-2 hover:bg-gray-200">Login as User</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

// Hero Section
const HeroSection = () => {
  return (
    <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2017/05/04/16/37/meeting-2284501_1280.jpg')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <motion.h1
          className="text-5xl font-bold"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          Discover Flexora Tailored to You
        </motion.h1>
        <motion.p
          className="mt-4 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Find your perfect workspace, whether you're a freelancer, startup, or business of any size.
        </motion.p>
      </div>
    </div>
  );
};

// How It Works Section
const HowItWorks = () => {
  return (
    <div className="py-20 bg-blue-100" id="browse">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold text-pink-700 mb-10"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          How It Works
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Step 1 */}
          <motion.div
            className="p-8 bg-gray-100 rounded-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <img src="https://cdn.pixabay.com/photo/2019/06/18/04/00/office-4287750_1280.jpg" alt="Search" className="mb-4 w-full h-auto" />
            <h3 className="text-2xl font-semibold text-black mb-3">Search</h3>
            <p className="text-gray-600 text-lg">Find available office spaces in your preferred location.</p>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            className="p-8 bg-gray-100 rounded-lg"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <img src="https://cdn.pixabay.com/photo/2020/10/22/04/48/office-5671832_1280.jpg" alt="Compare" className="mb-4 w-full h-auto" />
            <h3 className="text-2xl font-semibold text-black mb-3">Compare</h3>
            <p className="text-gray-600 text-lg">Review and compare various spaces based on amenities and price.</p>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            className="p-8 bg-gray-100 rounded-lg"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <img src="https://cdn.pixabay.com/photo/2019/03/01/14/54/girl-4028008_1280.jpg" alt="Book" className="mb-4 w-full h-auto" />
            <h3 className="text-2xl font-semibold text-black mb-3">Book</h3>
            <p className="text-gray-600 text-lg">Secure your desired space by booking through our platform.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Features Section
const FeaturesSection = () => {
  return (
    <div className="py-20 bg-gray-100" id="about">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold mb-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          Why Choose Us?
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Flexible terms, customizable office spaces, and competitive pricing tailored to your business needs.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <motion.div
            className="p-8 bg-white rounded-lg shadow-lg"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <img src="https://cdn.pixabay.com/photo/2016/10/16/10/29/office-space-1744801_960_720.jpg" alt="Customizable Spaces" className="mb-4 w-full h-auto" />
            <h3 className="text-2xl font-semibold mb-3">Customizable Spaces</h3>
            <p className="text-gray-600 text-lg">Design your workspace to suit your needs.</p>
          </motion.div>

          <motion.div
            className="p-8 bg-white rounded-lg shadow-lg"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <img src="https://i.pinimg.com/736x/78/39/d3/7839d3204dc6d3a42730943c483e4fbd.jpg" alt="Flexible Terms" className="mb-4 w-full h-auto" />
            <h3 className="text-2xl font-semibold mb-3">Flexible Terms</h3>
            <p className="text-gray-600 text-lg">Short-term or long-term leases available.</p>
          </motion.div>

          <motion.div
            className="p-8 bg-white rounded-lg shadow-lg"
            initial={{ opacity: 0, rotate: 45 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <img src="https://cdn.pixabay.com/photo/2018/08/03/23/36/marketing-3582973_1280.jpg" alt="Competitive Pricing" className="mb-4 w-full h-auto" />
            <h3 className="text-2xl font-semibold mb-3">Competitive Pricing</h3>
            <p className="text-gray-600 text-lg">Get the best value for your money.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Testimonials Section
const Testimonials = () => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold mb-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          What Our Clients Say
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <motion.div
            className="p-8 bg-gray-100 rounded-lg shadow-lg"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <p className="text-gray-600 text-lg mb-4">"Flexora made it so easy to find the perfect office space for my growing startup. The flexible terms were a game-changer!"</p>
            <p className="font-semibold text-black">- Jane Doe, CEO</p>
          </motion.div>

          <motion.div
            className="p-8 bg-gray-100 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <p className="text-gray-600 text-lg mb-4">"The customizable office space options allowed me to create the ideal environment for my team."</p>
            <p className="font-semibold text-black">- John Smith, CTO</p>
          </motion.div>

          <motion.div
            className="p-8 bg-gray-100 rounded-lg shadow-lg"
            initial={{ opacity: 0, rotate: 45 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <p className="text-gray-600 text-lg mb-4">"Amazing customer service and a seamless booking process. Highly recommend!"</p>
            <p className="font-semibold text-black">- Sarah Lee, Founder</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Full Home Page Component
const HomePage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <FeaturesSection />
      <Testimonials />
      
      <Footer/>
    </div>
  );
};

export default HomePage;
