"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ApiService from '@/services/backend';
import { useGlobalState } from '@/context/GlobalStateContext';

const Landing: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { state, dispatch } = useGlobalState();

  const handleImportLeague = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await ApiService.readLeague('');
      if (response.leagues) {
        dispatch({ type: 'SET_SLEEPER_LEAGUES', payload: response.leagues }); // Set sleeperLeagues
        // Set the first league as the selected league
        dispatch({ type: 'SET_SELECTED_SLEEPER_LEAGUE', payload: response.leagues[0] });
      }
      router.push('/sleeper-username');
    } catch (error) {
      console.error('Error reading league:', error);
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
            The Commissioner&apos;s Secret Weapon
          </h1>
          <p className="text-xl md:text-2xl text-gray-300">
            Effortless League Accounting, Trophies, & Historical Data in One Place
          </p>
          {state.sleeperLeagues && (
            <p className="text-lg text-gray-400">
              {state.sleeperLeagues.length} Leagues Available
            </p>
          )}
        </div>

        {/* Main Actions */}
        <div className="space-y-4">
          {/* Import League Button */}
          <Link 
            href="/sleeper-username"
            onClick={handleImportLeague}
            className="w-full flex items-center justify-center space-x-3 bg-gray-700 hover:bg-gray-600 text-white py-6 rounded-lg transition-colors"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-4 border-white/30 border-t-white" />
            ) : (
              <>
                <Image 
                  src="/images/sleeper.png" 
                  alt="Sleeper Logo" 
                  width={40} 
                  height={40}
                  className="rounded-full"
                />
                <span className="text-xl">
                  {state.username ? `Continue as ${state.username}` : 'Import League'}
                </span>
              </>
            )}
          </Link>

          {/* Create League Link */}
          <Link 
            href="/create-league"
            className="w-full text-gray-300 hover:text-white py-4 text-lg transition-colors text-center block"
          >
            Create League Manually
          </Link>

          {/* Connect Wallet Link */}
          <Link 
            href="/connect-wallet" 
            className="w-full text-gray-300 hover:text-white py-4 text-lg transition-colors text-center block"
          >
            {state.verified ? 'Manage Wallet' : 'Connect Wallet'}
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Landing; 