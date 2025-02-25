"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ConfirmLeague: React.FC = () => {
  return (
    <main className="min-h-screen flex flex-col items-center px-4">
      <div className="max-w-4xl w-full mt-16 space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Confirm League
          </h1>
        </div>

        <div className="space-y-8">
          {/* League Image and Details */}
          <div className="flex flex-col items-center space-y-4">
            <Image 
              src="/images/placeholder.png" 
              alt="League Avatar" 
              width={120} 
              height={120}
              className="rounded-lg"
            />
            <h2 className="text-2xl font-bold text-white">College Friends</h2>
            <div className="flex items-center space-x-4 text-gray-300">
              <div className="flex items-center">
                <span className="text-lg">👥 10 Teams</span>
              </div>
              <div className="flex items-center">
                <span className="text-lg">🏆 2013 Start</span>
              </div>
            </div>
          </div>

          {/* Confirm Button */}
          <Link 
            href="/request-verification"
            className="w-full flex items-center justify-center space-x-3 bg-gray-700 hover:bg-gray-600 text-white py-6 rounded-lg transition-colors"
          >
            <span className="text-xl">Confirm League</span>
          </Link>

          {/* Other Leagues Section */}
          <div className="space-y-4">
            <h3 className="text-xl text-gray-300">Other Leagues</h3>
            <select className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-lg text-white focus:border-white focus:outline-none">
              <option value="college-friends">College Friends</option>
              {/* Add more options as needed */}
            </select>
          </div>

          {/* Try Different Username */}
          <Link href="/create-league" className="w-full text-gray-300 hover:text-white py-4 text-lg transition-colors text-center">
            <button className="w-full text-gray-300 hover:text-white py-4 text-lg transition-colors">
              Try Different Username
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ConfirmLeague; 