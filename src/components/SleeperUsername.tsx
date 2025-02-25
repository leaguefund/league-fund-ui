"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const SleeperUsername: React.FC = () => {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center px-4">
      <div className="max-w-4xl w-full mt-16 space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            What is your Sleeper Username?
          </h1>
        </div>

        <div className="space-y-8">
          {/* Username Input Section */}
          <div className="space-y-2">
            <label className="text-xl text-gray-300">Sleeper Username</label>
            <input 
              type="text"
              className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-lg text-white focus:border-white focus:outline-none"
              placeholder="Enter your username"
            />
            <button className="text-gray-400 hover:text-white">
              Where can I find my username?
            </button>
          </div>

          {/* Find League Button */}
          <button 
            onClick={() => router.push('/confirm-league')}
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
          </button>

          {/* Create League Link */}
          <button className="w-full text-gray-300 hover:text-white py-4 text-lg transition-colors">
            Create League Manually
          </button>
        </div>
      </div>
    </main>
  );
};

export default SleeperUsername; 