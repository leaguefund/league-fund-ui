"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGlobalState } from '@/context/GlobalStateContext';
import ApiService from '@/services/backend';

const JoinLeagueSleeper: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { dispatch } = useGlobalState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function initializeWithLeagueAddress() {
      const urlLeagueAddress = searchParams.get('league_address');
      if (urlLeagueAddress?.startsWith('0x')) {
        const address = urlLeagueAddress as `0x${string}`;
        dispatch({ type: 'SET_SELECTED_WALLET_LEAGUE', payload: address });
        
        try {
          const response = await ApiService.readLeague(address);
          console.log('League data:', response);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching league data:', error);
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    }

    initializeWithLeagueAddress();
  }, [searchParams, dispatch]);

  // Placeholder data - replace with actual data later
  const users = [
    { id: 1, username: 'ncaldwell918' },
    { id: 2, username: 'coylewis737' },
    { id: 3, username: 'djwood' },
    { id: 4, username: 'LeVee4Three' },
    { id: 5, username: 'TapoutDrew' },
    { id: 6, username: 'alexmcritchie' },
  ];

  const handleSelectUser = async (username: string) => {
    setIsLoading(true);
    try {
      // TODO: Implement user selection functionality
      console.log('Selected user:', username);
      // For now, just simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/join-connect-wallet');
    } catch (error) {
      console.error('Error selecting user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-white/30 border-t-white" />
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center px-4">
      <div className="max-w-4xl w-full mt-16 space-y-12">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Welcome 👋
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-300">
            Let&apos;s start with your Sleeper account
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {users.map((user) => (
            <button
              key={user.id}
              onClick={() => handleSelectUser(user.username)}
              disabled={isLoading}
              className="flex flex-col items-center p-6 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors space-y-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Image
                src="/images/placeholder.png"
                alt={user.username}
                width={80}
                height={80}
                className="rounded-full"
              />
              <span className="text-gray-300">{user.username}</span>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
};

export default JoinLeagueSleeper; 