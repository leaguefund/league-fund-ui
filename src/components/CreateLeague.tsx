/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TransactionDefault } from "@coinbase/onchainkit/transaction"
import { getApproveCall, getCreateLeagueCall } from '../utils/createCallUtils';
import { useGlobalState } from '@/context/GlobalStateContext';
import { useNotification } from '@/context/NotificationContext';
import ApiService from '@/services/backend';
import { useRouter } from 'next/navigation';
import { WalletDefault } from '@coinbase/onchainkit/wallet';
import { useAccount } from 'wagmi';

const CreateLeague: React.FC = () => {
  const [dues, setDues] = useState<string>('');
  const [createLeague, setCreateLeague] = useState<string>('');
  const [hasCreatedLeague, setHasCreatedLeague] = useState(false);
  const { state, dispatch } = useGlobalState();
  const { showNotification } = useNotification();
  const usdcAddress = "0xa2fc8C407E0Ab497ddA623f5E16E320C7c90C83B";
  const factoryAddress = "0xde527c61Baa3AbFbcc532625BbD855d56217DB09";
  const duesInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { isConnected, address: wallet_address } = useAccount();

  // Auto-focus the dues input and set createLeague
  useEffect(() => {
    duesInputRef.current?.focus();
    if (state.selectedLeague) {
      setCreateLeague(state.selectedLeague.name); // Using 6 characters for the random string
    }
    // setCreateLeague(Math.random().toString(36).substring(2, 8)); // Using 6 characters for the random string
  }, [state.selectedLeague]);

  // Save dues to global state and storage
  useEffect(() => {
    if (dues) {
      sessionStorage.setItem('leagueDues', dues);
    }
  }, [dues]);

  // Handle transaction status changes
  const handleTransactionStatus = async (status: { 
    statusName: string; 
    statusData?: any;
    result?: {
      receipts?: Array<{
        logs?: Array<string>;
      }>;
    };
  }) => {
    console.log('=================');
    console.log('Transaction status:', status);
    console.log('-----------------');
    console.log('transactionReceipts (first):', status.statusData?.transactionReceipts?.[0]);
    console.log('=================');
    
    if (!hasCreatedLeague && status.statusName === 'success' && status.statusData?.transactionReceipts?.[0]?.logs?.[2]) {
      try {
        // Save the league address from the specific path in the response
        const leagueAddress = status.statusData.transactionReceipts[0].logs[2].address;
        console.log('League address:', leagueAddress);
        dispatch({ type: 'SET_SELECTED_LEAGUE_ADDRESS', payload: leagueAddress });
        sessionStorage.setItem('leagueAddress', leagueAddress);
        setHasCreatedLeague(true);
        
        if (leagueAddress) {
          handleCreateLeague();
          router.push('/league-created');
          
          showNotification({
            variant: 'success',
            title: 'League created successfully!'
          });
        }
      } catch (error) {
        console.error('Error creating league:', error);
        showNotification({
          variant: 'error',
          title: 'Error creating league'
        });
      }
    }
  };

  const handleCreateLeague = async () => {
    try {
        if (state.selectedLeagueAddress) {
          await ApiService.createLeague(state.selectedLeagueAddress || sessionStorage.getItem('selectedLeagueAddress') || '');
        } else {
          console.error('League address is undefined');
        }
        console.log('League created successfully');
    } catch (error) {
        console.error('Error creating league:', error);
    }
  };

  // Calculate current calls based on dues
  const currentCalls = Number(dues) > 0 && createLeague ? [
    getApproveCall(usdcAddress, factoryAddress, Number(dues) * 1e6),
    getCreateLeagueCall(createLeague, Number(dues) * 1e6, state.username || sessionStorage.getItem('username') || '')
  ] : [];

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

        <div className="space-y-2">
              <label className="text-xl text-gray-300">League Name</label>
              <input
                type="text"
                value={createLeague}
                onChange={(e) => setCreateLeague(e.target.value)}
                onBlur={(e) => {
                  const newName = e.target.value;
                  dispatch({ type: 'SET_SELECTED_LEAGUE_NAME', payload: newName });
                  if (state.selectedLeague) {
                    dispatch({ 
                      type: 'SET_SELECTED_LEAGUE', 
                      payload: {
                        ...state.selectedLeague,
                        name: newName
                      }
                    });
                  }
                }}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xl text-gray-300">
                <span>
                League Dues
                <Image src="/images/logo/usd-coin-usdc-logo.png" className="inline-flex pl-1"
                alt="Logo"
                width={24}
                height={24}
                />
                </span>
              </label>
{/* public/images/logo/usd-coin-usdc-logo.png */}
              <input
                ref={duesInputRef}
                type="number"
                value={dues}
                onChange={(e) => setDues(e.target.value)}
                placeholder="Enter league dues"
                className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-lg text-white focus:border-white focus:outline-none appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
              />
            </div>

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
            
            {/* Transaction Button */}
            { isConnected && (
                <div className="w-full [&_button]:w-full [&_button]:flex [&_button]:items-center [&_button]:justify-center [&_button]:space-x-3 [&_button]:bg-gray-700 [&_button:hover]:bg-gray-600 [&_button]:text-white [&_button]:py-6 [&_button]:rounded-lg [&_button]:transition-colors [&_button:disabled]:opacity-50 [&_button:disabled]:cursor-not-allowed [&_button_span]:text-xl">
                <TransactionDefault
                  isSponsored={true}
                  calls={currentCalls}
                  onStatus={handleTransactionStatus}
                />
              </div>
            )}
            { !isConnected && (
              <div className="w-full [&_button]:w-full [&_button]:flex [&_button]:items-center [&_button]:justify-center [&_button]:space-x-3 [&_button]:bg-gray-700 [&_button:hover]:bg-gray-600 [&_button]:text-white [&_button]:py-6 [&_button]:rounded-lg [&_button]:transition-colors [&_button:disabled]:opacity-50 [&_button:disabled]:cursor-not-allowed [&_button_span]:text-xl">
                <WalletDefault />
              </div>              
            )}

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