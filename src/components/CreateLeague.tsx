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
import sdk from "@farcaster/frame-sdk";
import LeagueDetails from '@/components/LeagueDetails';
import { League } from '@/types/state';
import { WalletLeague } from '@/types/state';

const CreateLeague: React.FC = () => {
  const [dues, setDues] = useState<string>('');
  // const [createLeague, setCreateLeague] = useState<string>('');
  const [leagueName, setLeagueName] = useState<string>('');

  const [hasCreatedLeague, setHasCreatedLeague] = useState(false);
  const { state, dispatch } = useGlobalState();
  const { showNotification } = useNotification();
  const usdcAddress = "0xa2fc8C407E0Ab497ddA623f5E16E320C7c90C83B";
  const factoryAddress = "0x9CFC969fe8519A2004d1a8Bfc2F83fba77DA5df2";
  const duesInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { isConnected, address: wallet_address } = useAccount();
  // const selectedLeague = state.selectedLeague;
  const selectedSleeperLeague = state.selectedSleeperLeague;

  console.log(wallet_address)

  useEffect(() => {
    sdk.actions.ready({});
  }, []);

  // Auto-focus the dues input and set createLeague
  useEffect(() => {
    duesInputRef.current?.focus();
    if (state.selectedSleeperLeague) {
      setLeagueName(state.selectedSleeperLeague.name); // Using 6 characters for the random string
    }
    // setLeagueName(Math.random().toString(36).substring(2, 8)); // Using 6 characters for the random string
  }, [state.selectedSleeperLeague]);

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

        if (state.selectedSleeperLeague) {
          const leagueWithAddress = { ...state.selectedSleeperLeague, address: leagueAddress };
          dispatch({ type: 'SET_SELECTED_LEAGUE', payload: leagueWithAddress });

          // Dispatch Contract League Address
          dispatch({ type: 'SET_SELECTED_CONTRACT_LEAGUE_ADDRESS', payload: leagueAddress });

          // Dispatch Contract League Address
          const walletLeague: WalletLeague = {
            avatar: state.selectedSleeperLeague.avatar,
            leagueName: state.selectedSleeperLeague.name, // Should Pull League Name
            leagueAddress: leagueAddress,
            leagueBalance: 0, // Add appropriate value for leagueBalance
            joined: true,
            currentlyActive: true,
            commissioner: true,
            treasurer: false,
            sleeperTeams: [],
            activeTeams: [], // Add appropriate value for activeTeams
            leagueRewards: [], // Add appropriate value for leagueRewards
            yourRewards: [] // Add appropriate value for leagueRewards
          };
          dispatch({ type: 'SET_SELECTED_CONTRACT_LEAGUE', payload: walletLeague });
        }

        sessionStorage.setItem('leagueAddress', leagueAddress);
        setHasCreatedLeague(true);
        
        if (leagueAddress) {
          handleCreateLeague(leagueAddress);
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

  const handleCreateLeague = async (leagueAddress: string) => {
    console.log('🛜 League Created, Backend Call ...');
    // Log selectedSleeperLeague
    console.log("🛜 selectedSleeperLeague",selectedSleeperLeague);
    // Create Payload
    const leagueCreatedPayload = {
        session_id: sessionStorage.getItem('sessionID'),
        league_id: selectedSleeperLeague?.id || '',
        league_sleeper_id: selectedSleeperLeague?.sleeper_id || '',
        wallet_address: wallet_address || '',
        league_address: leagueAddress,
        league_dues_usdc: sessionStorage.getItem('leagueDues') || ''
    };
    // Log leagueCreatedPayload
    console.log("🛜 leagueCreatedPayload",leagueCreatedPayload);
    // Hit Backend API
    try {
        if (leagueAddress) {
          console.log("🛜 request - started");
          await ApiService.createLeague(leagueCreatedPayload);



          // const response = await ApiService.readLeague(contractAddress);
          // console.log("🤝 response", response);
          // setLeagueData(response);
          // setIsLoading(false);
          // dispatch({
          //   type: 'SET_SELECTED_CONTRACT_LEAGUE',
          //   payload: {
          //     ...selectedContractLeague,
          //     avatar: response.league.avatar,
          //     sleeperTeams: response.league.sleeperTeams,
          //   },
          // });




          console.log("🛜 request - successful");
        } else {
          console.error('🛜 League address is undefined');
        }
        console.log('🛜 League created successfully');
    } catch (error) {
        console.error('🛜Error creating league:', error);
    }
  };

  // Calculate current calls based on dues
  const currentCalls = Number(dues) > 0 && leagueName ? [
    getApproveCall(usdcAddress, factoryAddress, Number(dues) * 1e6),
    getCreateLeagueCall(leagueName, Number(dues) * 1e6, state.username || sessionStorage.getItem('username') || '')
  ] : [];

  return (
    <main className="min-h-screen flex flex-col items-center px-4">

    <LeagueDetails selectedLeague={selectedSleeperLeague as League} />

      <div className="max-w-4xl w-full mt-16 space-y-12">


        {/* Main Actions */}
        <div className="space-y-8">

        <div className="space-y-2">
              <label className="text-xl text-gray-300">League Name</label>
              <input
                type="text"
                value={leagueName}
                onChange={(e) => setLeagueName(e.target.value)}
                // onBlur={(e) => {const newName = e.target.value;}}
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
            href="/confirm-league" 
            className="w-full text-gray-300 hover:text-white py-4 text-lg transition-colors text-center block"
          >
            Choose Different League
          </Link>
          {/* Start Over Link */}
          <Link 
            href="/sleeper-username" 
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