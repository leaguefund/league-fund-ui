"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Landing: React.FC = () => {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center px-4">
      <div className="max-w-4xl w-full mt-16 space-y-12">
        {/* Title Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            The Commissioner&apos;s Secret Weapon
          </h1>
          <p className="text-xl md:text-2xl text-gray-300">
            Effortless League Accounting, Trophies, & Historical Data in One Place
          </p>
        </div>

        {/* Main Actions */}
        <div className="space-y-4">
          {/* Import League Button */}
          <button 
            onClick={() => router.push('/sleeper-username')}
            className="w-full flex items-center justify-center space-x-3 bg-gray-700 hover:bg-gray-600 text-white py-6 rounded-lg transition-colors"
          >
            <Image 
              src="/images/sleeper.png" 
              alt="Sleeper Logo" 
              width={40} 
              height={40}
              className="rounded-full"
            />
            <span className="text-xl">Import League</span>
          </button>

          {/* Create League Manually */}
          <button className="w-full text-gray-300 hover:text-white py-4 text-lg transition-colors">
            Create League Manually
          </button>
        </div>
      </div>
    </main>
  );
};

export default Landing; 