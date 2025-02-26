"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGlobalState } from '@/context/GlobalStateContext';

const LeagueWelcome: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useGlobalState();

  const handleGoToDashboard = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement any necessary pre-navigation functionality
      console.log('Navigating to league dashboard');
      // For now, just simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/league');
    } catch (error) {
      console.error('Error navigating to dashboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center px-4">
      <div className="max-w-4xl w-full mt-16 space-y-12">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Welcome 👏
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-300">
            Check out the League
          </p>
        </div>

        <div className="space-y-8">
          <button
            onClick={handleGoToDashboard}
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-3 bg-gray-700 hover:bg-gray-600 text-white py-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-4 border-white/30 border-t-white" />
            ) : (
              <span className="text-xl">League Dashboard</span>
            )}
          </button>

          <Link 
            href="/league"
            className="w-full text-gray-300 hover:text-white py-4 text-lg transition-colors text-center block"
          >
            Back to League
          </Link>
        </div>
      </div>
    </main>
  );
};

export default LeagueWelcome; 