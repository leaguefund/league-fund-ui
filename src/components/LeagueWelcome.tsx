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
              Welcome to the League 🎉
            </h1>
          </div>

          {/* League Name */}
          <div className="text-center">
            <h2 className="text-1xl font-bold text-gray-800 dark:text-white/90">Good luck this season </h2>
          </div>

          <Link 
            href="/league"
            className="w-full flex items-center justify-center space-x-3 bg-gray-700 hover:bg-gray-600 text-white py-6 rounded-lg transition-colors"
          >
            {/* <Image 
              src="/images/sleeper.png" 
              alt="Sleeper Logo" 
              width={40} 
              height={40}
              className="rounded-full"
            /> */}
            <span className="text-xl">League Dashboard </span>
          </Link>
          {/* <Link 
            href="/link-here"
          >
            <button className="w-full text-gray-300 hover:text-white py-4 text-lg transition-colors">
              Primary Button
            </button>
          </Link> */}

          {/* <Link href="/link-here" className="w-full text-gray-300 hover:text-white py-4 text-lg transition-colors text-center">
            <button className="w-full text-gray-300 hover:text-white py-4 text-lg transition-colors">
              Secondary Button
            </button>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default ComponentTemplate; 