'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footers';

const BrowseSpaces = () => {
  const [spaceList, setSpaceList] = useState([]);
  const [masterList, setMasterList] = useState([]);
  const [facilityFilter, setFacilityFilter] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [locationFilter, setLocationFilter] = useState('');

  const facilitiesOptions = [
    { name: 'WiFi', icon: '/icons/wifi.svg' },
    { name: 'Parking', icon: '/icons/parking.svg' },
    { name: 'Conference Room', icon: '/icons/conference.svg' },
    { name: 'Cafeteria', icon: '/icons/cafeteria.svg' },
    { name: 'Reception', icon: '/icons/reception.svg' },
    { name: 'Air Conditioning', icon: '/icons/aircon.svg' },
    { name: 'Power Backup', icon: '/icons/power.svg' },
  ];

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await axios.get('http://localhost:5000/space/getall');
        setSpaceList(response.data);
        setMasterList(response.data);
      } catch (error) {
        console.error('Error fetching spaces:', error);
      }
    };
    fetchSpaces();
  }, []);

  const handleFacilityChange = (facility) => {
    const updatedFilters = facilityFilter.includes(facility)
      ? facilityFilter.filter((f) => f !== facility)
      : [...facilityFilter, facility];
    setFacilityFilter(updatedFilters);

    setSpaceList(
      masterList.filter((space) =>
        updatedFilters.every((f) => space.facilities.includes(f))
      )
    );
  };

  return (
    <div className="h-screen bg-gray-900 text-gray-100">
      <Navbar />
      
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center bg-gray-800 p-8 ">
          {/* Text Section */}
          <div className="lg:w-1/2">
            <h1 className="text-4xl font-bold mb-4 text-yellow-400">
              Working in good <span className="underline">places</span> matters at any cost.
            </h1>
            <p className="text-gray-300 mb-6">
              Explore flexible coworking spaces, meeting rooms, and more tailored for your needs.
            </p>
            <div className="flex space-x-4">
              <Link href="/signup" className="bg-yellow-500 text-black px-6 py-2 rounded-md font-semibold hover:bg-yellow-400">
                Join Us
              </Link>
              
            </div>
          </div>
          {/* Image Section */}
          <div className="lg:w-1/2">
            <img
              src="/images/coworking-space.jpg"
              alt="Coworking Space"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>

        {/* Filters and Results */}
        <div className="flex ">
          {/* Sidebar Filters */}
          <div className="w-1/4 bg-gray-800 shadow-lg p-6 ">
            <h2 className="text-2xl font-bold mb-6">Filter Spaces</h2>

            {/* Facilities Filter */}
            <h3 className="font-semibold mb-4">Facilities</h3>
            <div className="grid grid-cols-2 gap-4">
              {facilitiesOptions.map((facility) => (
                <button
                  key={facility.name}
                  onClick={() => handleFacilityChange(facility.name)}
                  className={`flex items-center space-x-2 p-2 rounded-md ${
                    facilityFilter.includes(facility.name)
                      ? 'bg-yellow-400 text-black'
                      : 'bg-gray-700 text-gray-200'
                  }`}
                >
                  <img src={facility.icon} alt={facility.name} className="h-6 w-6" />
                  <span>{facility.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Spaces Display */}
          <div className="flex-1 p-6">
            {spaceList.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {spaceList.map((space) => (
                  <div
                    key={space._id}
                    className="bg-gray-800 p-4 shadow-md rounded-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
                  >
                    <img
                      src={space.image}
                      alt={space.title}
                      className="h-40 w-full object-cover rounded-md mb-4"
                    />
                    <h3 className="font-bold text-xl text-yellow-400 mb-2">
                      {space.title}
                    </h3>
                    <p className="text-gray-300 mb-2">Price: Rs. {space.price}</p>
                    <p className="text-gray-300 mb-2">Area: {space.area} sq ft</p>
                    <p className="text-gray-300 mb-4">Location: {space.location}</p>
                    <Link href={`/spacedetails/${space._id}`}>
                      <button className="bg-yellow-500 text-black px-4 py-2 rounded-md font-semibold hover:bg-yellow-400">
                        View Details
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-300">No spaces available.</p>
            )}
          </div>
        </div>
    
      <Footer />
    </div>
  );
};

export default BrowseSpaces;

