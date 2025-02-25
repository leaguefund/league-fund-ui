"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ApiService from '@/services/backend';

const RequestVerification: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSendCode = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await ApiService.getUserEmail(email);
      router.push('/verification');
    } catch (error) {
      console.error('Error sending verification code:', error);
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
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white/90">Champions League</h2>
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <label className="block text-lg text-gray-500 dark:text-gray-400">Enter Email Address</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-transparent border border-gray-200 dark:border-gray-700 rounded-lg text-gray-800 dark:text-white/90 focus:border-gray-400 dark:focus:border-white focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          {/* Send Code Button */}
          <Link 
            href="/verification"
            onClick={handleSendCode}
            className="w-full bg-gray-800 hover:bg-gray-700 text-white py-4 rounded-lg transition-colors text-lg text-center block"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-4 border-white/30 border-t-white" />
            ) : (
              "Send Code"
            )}
          </Link>

          {/* Choose Different League Link */}
          <Link 
            href="/confirm-league" 
            className="w-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white py-4 text-lg transition-colors text-center block"
          >
            Choose Different League
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RequestVerification; 