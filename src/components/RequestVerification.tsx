"use client";

import React from 'react';
import Image from 'next/image';

const RequestVerification: React.FC = () => {
  return (
    <main className="min-h-screen flex flex-col items-center px-4">
      <div className="max-w-md w-full mt-16 space-y-8">
        {/* Title */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-white">
            Let&apos;s Verify Your Account
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
          <h2 className="text-2xl font-bold text-white">Champions League</h2>
        </div>

        {/* Email Input */}
        <div className="space-y-2">
          <label className="block text-lg text-gray-300">Enter Email Address</label>
          <input 
            type="email"
            className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-lg text-white focus:border-white focus:outline-none"
            placeholder="Enter your email"
          />
        </div>

        {/* Send Code Button */}
        <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-4 rounded-lg transition-colors text-lg">
          Send Code
        </button>

        {/* Choose Different League Link */}
        <button className="w-full text-gray-300 hover:text-white py-4 text-lg transition-colors">
          Choose Different League
        </button>
      </div>
    </main>
  );
};

export default RequestVerification; 