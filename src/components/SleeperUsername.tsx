/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ApiService from '@/services/backend';
import { useGlobalState } from '@/context/GlobalStateContext';
import { useNotification } from '@/context/NotificationContext';
import sdk from "@farcaster/frame-sdk";
import { League } from '@/types/state';

const SleeperUsername: React.FC = () => {
  // Local state for form input
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  
  // Get both state and dispatch from global state
  const { state, dispatch } = useGlobalState();
  const { showNotification } = useNotification();

  useEffect(() => {
    // Clear Leagues
    dispatch({ type: 'SET_SLEEPER_LEAGUES', payload: [] }); // Set sleeperLeagues
    dispatch({ type: 'SET_SELECTED_SLEEPER_LEAGUE', payload: {} as League });
    // Prepare SDK
    sdk.actions.ready({});
  }, [dispatch]);

  // If we already have a username in global state, use it
  useEffect(() => {
    if (state.username) {
      setUsername(state.username);
    }
    // Auto-focus the input
    inputRef.current?.focus();
  }, [state.username]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || isLoading) return;
    
    setIsLoading(true);
    try {
      // Update global state with username
      dispatch({ type: 'SET_USERNAME', payload: username });
      // Fetch Sleeper API
      const response = await ApiService.getSleeperUser(username);
      // Check if user is found
      if (!response || !response.leagues) {
        showNotification({
          variant: 'error',
          title: 'Error',
          description: 'User not found or no leagues available',
          hideDuration: 5000
        });
        return;
      }
      // Update leagues if they come back in the response
      if (response.leagues.length > 0) {
        dispatch({ type: 'SET_SLEEPER_LEAGUES', payload: response.leagues }); // Set sleeperLeagues
        // Set the first league as the selected league
        dispatch({ type: 'SET_SELECTED_SLEEPER_LEAGUE', payload: response.leagues[0] });
        // Push to confirm league
        router.push('/confirm-league');
      } else {
        showNotification({
          variant: 'error',
          title: 'Error',
          description: 'No leagues found for this user',
          hideDuration: 5000
        });
      }
    } catch (error: any) {
      console.error('Error finding league:', error);
      showNotification({
        variant: 'error',
        title: 'Error',
        description: error.message || 'Failed to find Sleeper user',
        hideDuration: 5000
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center px-4">
      <div className="max-w-4xl w-full mt-20 space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Sleeper Username
          </h1>
          <p className="text-xl md:text-2xl text-gray-300">
            Import your Sleeper League
          </p>
          {/* Show leagues count if we have them and selectedLeague exists */}
          {state.sleeperLeagues && state.sleeperLeagues.length > 0 && (
            <p className="text-gray-300">
              Found {state.sleeperLeagues.length} leagues for this account
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Username Input Section */}
          <div className="space-y-2">
            <label className="text-xl text-gray-300">Sleeper Username</label>
            <input 
              ref={inputRef}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-lg text-white focus:border-white focus:outline-none"
              placeholder="Enter your username"
            />
          </div>

          {/* Find League Button */}
          <button 
            type="submit"
            disabled={isLoading || !username}
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
          </button>

          {/* Create League Link */}
          <Link 
            target="_blank"
            href="https://support.fantasypoints.com/hc/en-us/articles/4408091462925-Where-do-I-find-my-Sleeper-username#:~:text=To%20get%20your%20Sleeper%20username,hover%20over%20your%20account%20avatar" 
            className="w-full text-gray-300 hover:text-white py-4 text-lg transition-colors text-center block"
          >
            Where can I find my username? 
          </Link>
        </form>
      </div>
    </main>
  );
};

export default SleeperUsername;