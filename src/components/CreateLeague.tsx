"use client";

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { TransactionDefault } from "@coinbase/onchainkit/transaction"
import { getApproveCall, getCreateLeagueCall } from '../utils/createCallUtils';
import { ContractCall } from '@/types/state';
import { useGlobalState } from '@/context/GlobalStateContext';
import { useNotification } from '@/context/NotificationContext';
import ApiService from '@/services/backend';

const CreateLeague: React.FC = () => {
  const [dues, setDues] = useState<string>('');
  const [calls, setCalls] = useState<ContractCall[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { state, dispatch } = useGlobalState();
  const { showNotification } = useNotification();
  const usdcAddress = "0xa2fc8C407E0Ab497ddA623f5E16E320C7c90C83B";
  const factoryAddress = "0x466C4Ff27b97fF5b11A3AD61F4b61d2e02a18e35";
  const hasAttemptedApiCall = useRef(false);
  const duesInputRef = useRef<HTMLInputElement>(null);

  // Auto-focus the dues input
  useEffect(() => {
    duesInputRef.current?.focus();
  }, []);

  const handleCreateLeague = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    try {
      const response = await ApiService.createLeague(state.username || '');
      if (response.league_address) {
        dispatch({ 
          type: 'SET_LEAGUE_ADDRESS', 
          payload: response.league_address as `0x${string}` 
        });
        router.push('/confirm-league');
      }
    } catch (error: any) {
      console.error('Error creating league:', error);
      showNotification({
        variant: 'error',
        title: 'Error',
        description: error.message || 'Failed to create league',
        hideDuration: 5000
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch league data on component mount
  useEffect(() => {
    async function fetchLeagueData() {
      // Skip if we've already attempted the call
      if (hasAttemptedApiCall.current) return;
      
      hasAttemptedApiCall.current = true;
      try {
        const response = await ApiService.createLeague(state.username || '');
        if (response.league_address) {
          dispatch({ 
            type: 'SET_LEAGUE_ADDRESS', 
            payload: response.league_address as `0x${string}` 
          });
        }
      } catch (error: any) {
        console.error('Error fetching league data:', error);
        showNotification({
          variant: 'error',
          title: 'Error',
          description: error.message || 'Failed to fetch league data',
          hideDuration: 5000
        });
      }
    }
    fetchLeagueData();
  }, [dispatch, showNotification, state.username]);

  useEffect(() => {
    async function fetchCalls() {
      const duesNumber = Number(dues);
      if (duesNumber > 0 && state.selectedLeague?.name) {
        setCalls([
          getApproveCall(usdcAddress, factoryAddress, duesNumber * 1e6),
          getCreateLeagueCall(state.selectedLeague.name, duesNumber * 1e6, state.selectedLeague.name)
        ])
      } else {
        setCalls([]);
      }
    }
    fetchCalls();
  }, [dues, state.selectedLeague]);

  return (
    <main className="min-h-screen flex flex-col items-center px-4">
      <div className="max-w-4xl w-full mt-16 space-y-12">
        {/* Title Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Create League
          </h1>
          <p className="text-xl md:text-2xl text-gray-300">
            Set up your league details and handle dues.
          </p>
        </div>

        {/* League Display */}
        <div className="flex flex-col items-center space-y-4">
          <Image 
            src={state.selectedLeague?.avatar || "/images/placeholder.png"}
            alt="League Avatar" 
            width={120} 
            height={120}
            className="rounded-full"
          />
          <h2 className="text-2xl font-bold text-white">
            {state.selectedLeague?.name || 'New League'}
          </h2>
        </div>

        {/* Main Actions */}
        <div className="space-y-8">
          {/* League Details Form */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xl text-gray-300">Username</label>
              <input
                type="text"
                value={state.username || sessionStorage.getItem('username') || ''}
                readOnly
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white cursor-not-allowed"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xl text-gray-300">Team Name</label>
              <input
                type="text"
                value={state.selectedLeague?.name || sessionStorage.getItem('selectedLeagueName') || ''}
                readOnly
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white cursor-not-allowed"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xl text-gray-300">League Dues (USDC)</label>
              <input
                ref={duesInputRef}
                type="number"
                value={dues}
                onChange={(e) => setDues(e.target.value)}
                placeholder="Enter league dues"
                className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-lg text-white focus:border-white focus:outline-none appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
              />
            </div>

            {/* Create League Button */}
            <button 
              onClick={handleCreateLeague}
              disabled={isLoading || !dues || Number(dues) <= 0}
              className="w-full flex items-center justify-center space-x-3 bg-gray-700 hover:bg-gray-600 text-white py-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-4 border-white/30 border-t-white" />
              ) : (
                <span className="text-xl">Create League Treasury</span>
              )}
            </button>
          </div>

          {/* Start Over Link */}
          <Link 
            href="/" 
            className="w-full text-gray-300 hover:text-white py-4 text-lg transition-colors text-center block"
          >
            Start Over
          </Link>
        </div>
      </div>
    </main>
  );
};

export default CreateLeague; 