"use client";

import React from 'react';
import Link from 'next/link';
import SleeperLogo from './SleeperLogo';

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
            <SleeperLogo width={100} />
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

          <Link 
            href="/link-here"
          >
            <button className="w-full text-gray-300 hover:text-white py-4 text-lg transition-colors">
              Primary Button
            </button>
          </Link>

          <Link href="/link-here" className="w-full text-gray-300 hover:text-white py-4 text-lg transition-colors text-center">
            <button className="w-full text-gray-300 hover:text-white py-4 text-lg transition-colors">
              Secondary Button
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ComponentTemplate; 