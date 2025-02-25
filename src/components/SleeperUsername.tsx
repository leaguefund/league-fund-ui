"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ApiService from '@/services/backend';
import { useGlobalState } from '@/context/GlobalStateContext';

const SleeperUsername: React.FC = () => {
  // Local state for form input
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  // Get both state and dispatch from global state
  const { state, dispatch } = useGlobalState();

  // If we already have a username in global state, use it
  useEffect(() => {
    if (state.username) {
      setUsername(state.username);
    }
  }, [state.username]);

  const handleFindLeague = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await ApiService.getSleeperUser(username);
      // Update global state with username
      dispatch({ type: 'SET_USERNAME', payload: username });
      
      // Update leagues if they come back in the response
      if (response.leagues) {
        dispatch({ type: 'SET_LEAGUES', payload: response.leagues });
      }
      router.push('/confirm-league');
    } catch (error) {
      console.error('Error finding league:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center px-4">
      <div className="max-w-4xl w-full mt-16 space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            What is your Sleeper Username?
          </h1>
          {/* Show leagues count if we have them */}
          {state.leagues && (
            <p className="text-gray-300">
              Found {state.leagues.length} leagues for this account
            </p>
          )}
        </div>

        <div className="space-y-8">
          {/* Username Input Section */}
          <div className="space-y-2">
            <label className="text-xl text-gray-300">Sleeper Username</label>
            <input 
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-lg text-white focus:border-white focus:outline-none"
              placeholder="Enter your username"
            />
            <Link 
              href="/find-username" 
              className="text-gray-400 hover:text-white block"
            >
              Where can I find my username?
            </Link>
          </div>

          {/* Find League Button */}
          <Link 
            href="/confirm-league"
            onClick={handleFindLeague}
            className="w-full flex items-center justify-center space-x-3 bg-gray-700 hover:bg-gray-600 text-white py-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                <span className="text-xl">Find League</span>
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
        </div>
      </div>
    </main>
  );
};

export default SleeperUsername; 