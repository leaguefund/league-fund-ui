"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ApiService from '@/services/backend';

const Verification: React.FC = () => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleValidate = async () => {
    setIsLoading(true);
    try {
      await ApiService.validateEmail(code);
      router.push('/dashboard'); // or wherever you want to redirect after validation
    } catch (error) {
      console.error('Error validating code:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col items-center">
        <div className="max-w-md w-full space-y-8">
          {/* Title */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white/90">
              Enter Verification Code
            </h1>
          </div>

          {/* League Image */}
          <div className="flex justify-center">
            <Image 
              src="/images/placeholder.png" 
              alt="League Trophy" 
              width={100} 
              height={100}
              className="rounded-lg"
            />
          </div>

          {/* League Name */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white/90">Champions League</h2>
          </div>

          {/* Validation Code Section */}
          <div className="space-y-2">
            <label className="block text-lg text-gray-500 dark:text-gray-400">
              Validation Code <span className="text-sm">sent to alex@gmail.com</span>
            </label>
            <input 
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-4 py-3 bg-transparent border border-gray-200 dark:border-gray-700 rounded-lg text-gray-800 dark:text-white/90 focus:border-gray-400 dark:focus:border-white focus:outline-none"
              placeholder="Enter validation code"
            />
          </div>

          {/* Validate Button */}
          <button 
            onClick={handleValidate}
            className="w-full bg-gray-800 hover:bg-gray-700 text-white py-4 rounded-lg transition-colors text-lg"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-4 border-white/30 border-t-white" />
            ) : (
              "Validate"
            )}
          </button>

          {/* Choose Different Validation Link */}
          <Link 
            href="/request-verification" 
            className="w-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white py-4 text-lg transition-colors text-center block"
          >
            Choose Different Validation
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Verification; 