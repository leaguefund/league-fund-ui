"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const JoinLeague: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleJoinLeague = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement league joining functionality
      console.log('Joining league for user');
      // For now, just simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/league-welcome');
    } catch (error) {
      console.error('Error joining league:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center px-4">
      <div className="max-w-4xl w-full mt-16 space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Pay Dues
          </h1>
          <p className="text-xl md:text-2xl text-gray-300">
            The Champions League requires $100 to join
          </p>
        </div>

        <div className="flex justify-center">
          <div className="flex flex-col items-center p-6 bg-gray-800/50 rounded-lg space-y-3">
            <Image
              src="/images/placeholder.png"
              alt="coylewis737"
              width={80}
              height={80}
              className="rounded-full"
            />
            <span className="text-gray-300">coylewis737</span>
          </div>
        </div>

        <div className="space-y-8">
          <button
            onClick={handleJoinLeague}
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-3 bg-gray-700 hover:bg-gray-600 text-white py-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-4 border-white/30 border-t-white" />
            ) : (
              <span className="text-xl">Join League</span>
            )}
          </button>

          <button
            className="w-full text-gray-300 hover:text-white py-4 text-lg transition-colors text-center"
          >
            What is USDC?
          </button>
        </div>
      </div>
    </main>
  );
};

export default JoinLeague; 