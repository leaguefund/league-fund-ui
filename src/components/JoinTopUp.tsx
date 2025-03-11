"use client";

import React, { useState } from 'react';
import SleeperLogo from './SleeperLogo';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGlobalState } from '@/context/GlobalStateContext';

const JoinTopUp: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useGlobalState();
  
  // Try to get user data from URL params first, fall back to global state
  const urlUsername = searchParams?.get('username') || '';
  const urlAvatar = searchParams?.get('avatar') || '';
  const user = urlUsername ? {
    username: urlUsername,
    avatar: urlAvatar
  } : state.selectedSleeperUser;

  // If no user data available, redirect
  if (!user) {
    router.push('/join-league-sleeper');
    return null;
  }

  const handleTopUpWallet = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement wallet top up functionality
      console.log('Topping up wallet for user');
      // For now, just simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get the league address from global state
      const leagueAddress = state.selectedWalletLeague;
      router.push(`/join-league${leagueAddress ? `?league_address=${leagueAddress}` : ''}`);
    } catch (error) {
      console.error('Error topping up wallet:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center px-4">
      <div className="max-w-4xl w-full mt-16 space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Top Up Wallet
          </h1>
          <p className="text-xl md:text-2xl text-gray-300">
            The Champions League requires $100 to join
          </p>
        </div>

        <div className="flex justify-center">
          <div className="flex flex-col items-center p-6 bg-gray-800/50 rounded-lg space-y-3">
            <SleeperLogo avatar={user.avatar} username={user.username} width={80} />
            <span className="text-gray-300">{user.username}</span>
          </div>
        </div>

        <div className="space-y-8">
          <button
            onClick={handleTopUpWallet}
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-3 bg-gray-700 hover:bg-gray-600 text-white py-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-4 border-white/30 border-t-white" />
            ) : (
              <span className="text-xl">Top Up Wallet</span>
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

export default JoinTopUp; 