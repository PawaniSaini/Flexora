'use client';
import React, { useState, useEffect } from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footers';

const BrowseSpaces = () => {
  const [spaceList, setSpaceList] = useState([]);
  const [masterList, setMasterList] = useState([]);
  const [facilityFilter, setFacilityFilter] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [areaRange, setAreaRange] = useState([0, 5000]);
  const [locationFilter, setLocationFilter] = useState('');

  const facilitiesOptions = [
    'WiFi',
    'Parking',
    'Conference Room',
    'Cafeteria',
    'Reception',
    'Air Conditioning',
    'Power Backup',
  ];

  const locationOptions = [
    'Delhi',
    'Mumbai',
    'Bangalore',
    'Hyderabad',
    'Chennai',
    'Pune',
    'Kolkata',
    'Ahmedabad',
    'Jaipur',
    'Lucknow',
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

  const searchSpace = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSpaceList(
      masterList.filter((space) =>
        space.title?.toLowerCase().includes(keyword)
      )
    );
  };

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

  const filterByPrice = () => {
    setSpaceList(
      masterList.filter(
        (space) => space.price >= priceRange[0] && space.price <= priceRange[1]
      )
    );
  };

  const filterByArea = () => {
    setSpaceList(
      masterList.filter(
        (space) => space.area >= areaRange[0] && space.area <= areaRange[1]
      )
    );
  };

  const filterByLocation = (e) => {
    const keyword = e.target.value.toLowerCase();
    setLocationFilter(keyword);

    setSpaceList(
      masterList.filter((space) =>
        space.location?.toLowerCase().includes(keyword)
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Navbar />
      <div className="flex">
        {/* Sidebar Filters */}
        <div className="w-1/4 bg-gray-800 shadow-lg p-6 sticky top-0 h-screen">
          <h2 className="text-2xl font-bold mb-6">Filter Spaces</h2>

          {/* Search */}
          <input
            onChange={searchSpace}
            type="search"
            className="w-full p-2 mb-6 border rounded-md bg-gray-700 text-gray-100"
            placeholder="Search spaces..."
          />

          {/* Facilities Filter */}
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="w-full flex justify-between items-center p-2 border-b">
                  <span>Facilities</span>
                  {open ? (
                    <ChevronUpIcon className="w-5 h-5" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5" />
                  )}
                </Disclosure.Button>
                <Disclosure.Panel className="pt-2 pb-4">
                  {facilitiesOptions.map((facility) => (
                    <label key={facility} className="block mb-2">
                      <input
                        type="checkbox"
                        value={facility}
                        onChange={() => handleFacilityChange(facility)}
                        className="mr-2"
                      />
                      {facility}
                    </label>
                  ))}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          {/* Price Filter */}
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="w-full flex justify-between items-center p-2 border-b">
                  <span>Price Range (in Rs)</span>
                  {open ? (
                    <ChevronUpIcon className="w-5 h-5" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5" />
                  )}
                </Disclosure.Button>
                <Disclosure.Panel className="pt-2 pb-4">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, e.target.value])}
                    className="w-full"
                  />
                  <p className="mt-2">
                    Price: Rs. {priceRange[0]} - Rs. {priceRange[1]}
                  </p>
                  <button
                    onClick={filterByPrice}
                    className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md"
                  >
                    Apply Filter
                  </button>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          {/* Area Filter */}
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="w-full flex justify-between items-center p-2 border-b">
                  <span>Area Range (in sq ft)</span>
                  {open ? (
                    <ChevronUpIcon className="w-5 h-5" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5" />
                  )}
                </Disclosure.Button>
                <Disclosure.Panel className="pt-2 pb-4">
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    value={areaRange[1]}
                    onChange={(e) => setAreaRange([0, e.target.value])}
                    className="w-full"
                  />
                  <p className="mt-2">
                    Area: {areaRange[0]} - {areaRange[1]} sq ft
                  </p>
                  <button
                    onClick={filterByArea}
                    className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md"
                  >
                    Apply Filter
                  </button>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          {/* Location Filter */}
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="w-full flex justify-between items-center p-2 border-b">
                  <span>Location</span>
                  {open ? (
                    <ChevronUpIcon className="w-5 h-5" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5" />
                  )}
                </Disclosure.Button>
                <Disclosure.Panel className="pt-2 pb-4">
                  <select
                    onChange={(e) => filterByLocation(e)}
                    className="w-full p-2 border rounded-md bg-gray-700 text-gray-100"
                  >
                    <option value="">Select a location</option>
                    {locationOptions.map((location) => (
                      <option key={location} value={location.toLowerCase()}>
                        {location}
                      </option>
                    ))}
                  </select>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>

        {/* Spaces Display */}
        <div className="flex-1 p-6">
          {spaceList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {spaceList.map((space) => (
                <div
                  key={space._id}
                  className="bg-gray-800 p-4 shadow-md rounded-lg flex flex-col items-center hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={space.image}
                    alt={space.title}
                    className="h-40 w-full object-cover rounded-md mb-4"
                  />
                  <h3 className="font-bold text-xl text-blue-400 mb-2">
                    {space.title}
                  </h3>
                  <p className="text-gray-300 mb-2">Price: Rs. {space.price}</p>
                  <p className="text-gray-300 mb-2">
                    Area: {space.area} sq ft
                  </p>
                  <p className="text-gray-300 mb-4">
                    Location: {space.location}
                  </p>
                  <Link href={`/spacedetails/${space._id}`}>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
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
