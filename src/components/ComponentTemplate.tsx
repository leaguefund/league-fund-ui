"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ComponentTemplate: React.FC = () => {
  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col items-center">
        <div className="max-w-md w-full space-y-8">
          {/* Title */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white/90">
              Heading
            </h1>
          </div>

          {/* League Image */}
          <div className="flex justify-center">
            <Image 
              src="/images/placeholder.png" 
              alt="League Avatar" 
              width={100} 
              height={100}
              className="rounded-lg"
            />
          </div>

          {/* League Name */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white/90">Subheading</h2>
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <label className="block text-lg text-gray-500 dark:text-gray-400">Input Form</label>
            <input
              className="w-full px-4 py-3 bg-transparent border border-gray-200 dark:border-gray-700 rounded-lg text-gray-800 dark:text-white/90 focus:border-gray-400 dark:focus:border-white focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          {/* Send Code Button */}
          <Link 
            href="/confirm-league"
            className="w-full flex items-center justify-center space-x-3 bg-gray-700 hover:bg-gray-600 text-white py-6 rounded-lg transition-colors"
          >
            <Image 
              src="/images/sleeper.png" 
              alt="Sleeper Logo" 
              width={40} 
              height={40}
              className="rounded-full"
            />
            <span className="text-xl">Find League</span>
          </Link>

          {/* Choose Different League Link */}
          <button className="w-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white py-4 text-lg transition-colors">
            Text Button
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComponentTemplate; 