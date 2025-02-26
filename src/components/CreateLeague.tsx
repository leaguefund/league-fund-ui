"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGlobalState } from '@/context/GlobalStateContext';
import ApiService from '@/services/backend';

const CreateLeague: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dues, setDues] = useState('100');
  const router = useRouter();
  const { state, dispatch } = useGlobalState();

  const handleCreateLeague = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement league creation functionality
      console.log('Creating league');
      // For now, just simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/league-created');
    } catch (error) {
      console.error('Error creating league:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center px-4">
      <div className="max-w-4xl w-full mt-16 space-y-12">
        {/* Title Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Last Step!
          </h1>
          <p className="text-xl md:text-2xl text-gray-300">
            Configure league dues. You can always change them later.
          </p>
        </div>

        {/* League Display */}
        <div className="flex flex-col items-center space-y-4">
          <Image 
            src="/images/trophy.png"
            alt="League Trophy" 
            width={120} 
            height={120}
            className="rounded-lg"
          />
          <h2 className="text-2xl font-bold text-white">
            {state.leagueSelected?.name || 'Champions League'}
          </h2>
        </div>

        {/* Form Fields */}
        <div className="space-y-8">
          {/* Username Field */}
          <div className="space-y-2">
            <label className="text-xl text-gray-300">Username</label>
            <input 
              type="text"
              value={state.username || ''}
              disabled
              className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-lg text-white focus:border-white focus:outline-none"
            />
          </div>

          {/* Dues Field */}
          <div className="space-y-2">
            <label className="text-xl text-gray-300">Dues / Team</label>
            <div className="relative">
              <input 
                type="number"
                value={dues}
                onChange={(e) => setDues(e.target.value)}
                className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-lg text-white focus:border-white focus:outline-none"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Image 
                  src="/images/dollar.png"
                  alt="Dollar Sign"
                  width={24}
                  height={24}
                />
              </div>
            </div>
          </div>

          {/* Create League Button */}
          <Link 
            href="/league-created"
            onClick={handleCreateLeague}
            className="w-full flex items-center justify-center space-x-3 bg-gray-700 hover:bg-gray-600 text-white py-6 rounded-lg transition-colors"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-4 border-white/30 border-t-white" />
            ) : (
              <span className="text-xl">Create League Treasury</span>
            )}
          </Link>

          {/* Start Over Link */}
          <Link 
            href="/" 
            className="w-full text-gray-300 hover:text-white py-4 text-lg transition-colors text-center block"
          >
            Start Over?
          </Link>
        </div>
      </div>
    </main>
  );
};

export default CreateLeague; 