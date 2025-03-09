"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGlobalState } from '@/context/GlobalStateContext';
import LeagueConfirmDropdown from "@/components/dropdowns/LeagueConfirmDropdown";
import LeagueDetails from '@/components/LeagueDetails';

const ConfirmLeague: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { state, dispatch } = useGlobalState();
  const selectedSleeperLeague = state.selectedSleeperLeague;

  // If no leagues in state, go back to sleeper username page
  useEffect(() => {
    if (!state.sleeperLeagues || state.sleeperLeagues.length === 0) {
      router.push('/sleeper-username');
      return;
    }

    // Set initial selected league
    if (!selectedSleeperLeague && state.sleeperLeagues.length > 0) {
      dispatch({ type: 'SET_SELECTED_SLEEPER_LEAGUE', payload: state.sleeperLeagues[0] });
    }
  }, [state.sleeperLeagues, selectedSleeperLeague, router, dispatch]);

  const handleConfirmLeague = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (selectedSleeperLeague) {
        console.log('Saving selectedSleeperLeague to state:', selectedSleeperLeague);
        dispatch({ type: 'SET_SELECTED_SLEEPER_LEAGUE', payload: selectedSleeperLeague });
        // Verify it was saved to sessionStorage
        const stored = sessionStorage.getItem('selectedSleeperLeague');
        console.log('Stored in sessionStorage:', stored);
      }
      router.push('/create-league');
    } catch (error) {
      console.error('Error confirming league:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!selectedSleeperLeague) return null;

  return (
    <main className="min-h-screen flex flex-col items-center px-4">
      {/* League Details */}
      <LeagueDetails selectedLeague={selectedSleeperLeague} />
      {/* Confirm League */}
      <div className="max-w-4xl w-full mt-16 space-y-12">

      <div className="space-y-8">
        {/* Confirm Button */}
        <Link 
          href="/request-verification"
          onClick={handleConfirmLeague}
          className="w-full flex items-center justify-center space-x-3 bg-gray-700 hover:bg-gray-600 text-white py-6 rounded-lg transition-colors"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-6 w-6 border-4 border-white/30 border-t-white" />
          ) : (
            <span className="text-xl">Select League</span>
          )}
        </Link>

        <div className="space-y-4">
          <h3 className="text-xl text-gray-300">Other Leagues</h3>
          <div className="w-full">
            <LeagueConfirmDropdown />
          </div>
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