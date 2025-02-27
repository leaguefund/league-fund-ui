"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ApiService from '@/services/backend';
import { useGlobalState } from '@/context/GlobalStateContext';
import { League } from '@/types/state';

const ConfirmLeague: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLeague, setSelectedLeague] = useState<League | null>(null);
  const router = useRouter();
  const { state, dispatch } = useGlobalState();

  // If no leagues in state, go back to sleeper username page
  useEffect(() => {
    if (!state.leagues || state.leagues.length === 0) {
      router.push('/sleeper-username');
      return;
    }

    // Set initial selected league
    if (!selectedLeague && state.leagues.length > 0) {
      setSelectedLeague(state.leagues[0]);
    }
  }, [state.leagues, selectedLeague, router]);

  const handleConfirmLeague = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await ApiService.readLeague();
      console.log('League read response:', response);
      if (selectedLeague) {
        dispatch({ type: 'SET_SELECTED_LEAGUE', payload: selectedLeague });
      }
      router.push('/request-verification');
    } catch (error) {
      console.error('Error confirming league:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeagueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = state.leagues?.find(league => league.name === e.target.value);
    if (selected) {
      setSelectedLeague(selected);
    }
  };

  if (!selectedLeague) return null;

  return (
    <main className="min-h-screen flex flex-col items-center px-4">
      <div className="max-w-4xl w-full mt-16 space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Confirm League
          </h1>
        </div>

        <div className="space-y-8">
          {/* League Image and Details */}
          <div className="flex flex-col items-center space-y-4">
            <Image 
              src={selectedLeague.logo || "/images/placeholder.png"}
              alt="League Avatar" 
              width={120} 
              height={120}
              className="rounded-lg"
            />
            <h2 className="text-2xl font-bold text-white">{selectedLeague.name}</h2>
            <div className="flex items-center space-x-4 text-gray-300">
              <div className="flex items-center">
                <span className="text-lg">👥 {selectedLeague.teams} Teams</span>
              </div>
              <div className="flex items-center">
                <span className="text-lg">🏆 {selectedLeague.started} Start</span>
              </div>
            </div>
          </div>

          {/* Confirm Button */}
          <Link 
            href="/request-verification"
            onClick={handleConfirmLeague}
            className="w-full flex items-center justify-center space-x-3 bg-gray-700 hover:bg-gray-600 text-white py-6 rounded-lg transition-colors"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-4 border-white/30 border-t-white" />
            ) : (
              <span className="text-xl">Confirm League</span>
            )}
          </Link>

          {/* Other Leagues Section */}
          <div className="space-y-4">
            <h3 className="text-xl text-gray-300">Other Leagues</h3>
            <select 
              className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-lg text-white focus:border-white focus:outline-none"
              value={selectedLeague.name}
              onChange={handleLeagueChange}
            >
              {state.leagues?.map((league) => (
                <option key={league.name} value={league.name}>
                  {league.name}
                </option>
              ))}
            </select>
          </div>

          {/* Try Different Username */}
          <Link 
            href="/sleeper-username" 
            className="w-full text-gray-300 hover:text-white py-4 text-lg transition-colors text-center block"
          >
            Try Different Username
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ConfirmLeague; 