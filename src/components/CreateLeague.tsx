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
  const router = useRouter();
  const { state, dispatch } = useGlobalState();
  const { showNotification } = useNotification();
  const usdcAddress = "0xa2fc8C407E0Ab497ddA623f5E16E320C7c90C83B";
  const factoryAddress = "0x466C4Ff27b97fF5b11A3AD61F4b61d2e02a18e35";
  const duesInputRef = useRef<HTMLInputElement>(null);

  // Auto-focus the dues input
  useEffect(() => {
    duesInputRef.current?.focus();
  }, []);

  // Calculate current calls based on dues
  const currentCalls = Number(dues) > 0 && state.selectedLeague?.name ? [
    getApproveCall(usdcAddress, factoryAddress, Number(dues) * 1e6),
    getCreateLeagueCall(state.selectedLeague.name, Number(dues) * 1e6, state.selectedLeague.name)
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

            {/* Transaction Button */}
            <div className="w-full [&_button]:w-full [&_button]:flex [&_button]:items-center [&_button]:justify-center [&_button]:space-x-3 [&_button]:bg-gray-700 [&_button:hover]:bg-gray-600 [&_button]:text-white [&_button]:py-6 [&_button]:rounded-lg [&_button]:transition-colors [&_button:disabled]:opacity-50 [&_button:disabled]:cursor-not-allowed [&_button_span]:text-xl">
              <TransactionDefault
                isSponsored={true}
                calls={currentCalls}
              />
            </div>
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