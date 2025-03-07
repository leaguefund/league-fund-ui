"use client";

import React, { useEffect, useState, useRef } from 'react';
import { TransactionDefault } from "@coinbase/onchainkit/transaction"
import { getApproveCall, getJoinLeagueCall } from '../utils/createCallUtils';
import { getLeagueDues } from '../utils/onChainReadUtils';
import { ContractCall } from '@/types/state';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGlobalState } from '@/context/GlobalStateContext';
import sdk from "@farcaster/frame-sdk";

const JoinLeague: React.FC = () => {
  const [leagueAddress, setLeagueAddress] = useState<`0x${string}` | null>(null);
  const [teamName, setTeamName] = useState('');
  const [dues, setDues] = useState(0);
  const [calls, setCalls] = useState<ContractCall[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFromUrl, setIsFromUrl] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { dispatch } = useGlobalState();
  const teamNameInputRef = useRef<HTMLInputElement>(null);
  const usdcAddress = "0xa2fc8C407E0Ab497ddA623f5E16E320C7c90C83B";

  useEffect(() => {
    sdk.actions.ready({});
  }, []);

  useEffect(() => {
    console.log(setIsLoading)
    // Get league_address from URL params
    const urlLeagueAddress = searchParams.get('league_address');
    if (urlLeagueAddress?.startsWith('0x')) {
      const address = urlLeagueAddress as `0x${string}`;
      setLeagueAddress(address);
      setIsFromUrl(true);
      dispatch({ type: 'SET_SELECTED_WALLET_LEAGUE', payload: address });
    }
  }, [searchParams, dispatch]);

  useEffect(() => {
    teamNameInputRef.current?.focus();
  }, []);

  useEffect(() => {
    async function fetchDues() {
      if (leagueAddress) {
        const dues = await getLeagueDues(leagueAddress);
        setDues(dues);
      } else {
        setDues(0);
      }
    }
    fetchDues();
  }, [leagueAddress]);

  useEffect(() => {
    async function fetchCalls() {
      if (leagueAddress && teamName) {
        setCalls([
          getApproveCall(usdcAddress, leagueAddress, dues * 1e6),
          getJoinLeagueCall(leagueAddress, teamName)
        ])
      } else {
        setCalls([]);
      }
    }
    fetchCalls();
  }, [leagueAddress, teamName, dues]);

  React.useEffect(() => {
    console.log('Loading state:', isLoading);
    console.log('Router ready for navigation:', router);
  }, [isLoading, router]);

  const handleJoinLeague = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
  };

  const isFormValid = Boolean(leagueAddress && teamName);

  return (
    <main className="min-h-screen flex flex-col items-center px-4">
      <div className="max-w-4xl w-full mt-16 space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Join League
          </h1>
          <p className="text-xl md:text-2xl text-gray-300">
            Enter your team details to join the league
          </p>
        </div>

        <form onSubmit={handleJoinLeague} className="space-y-8">
          <div className="space-y-2">
            <label className="text-xl text-gray-300">Team Name</label>
            <input
              ref={teamNameInputRef}
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Enter your team name"
              className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-lg text-white focus:border-white focus:outline-none"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xl text-gray-300">League Address</label>
            <input
              type="text"
              value={leagueAddress ? leagueAddress : ''}
              onChange={(e) => !isFromUrl && setLeagueAddress(e.target.value as `0x${string}`)}
              placeholder="Enter league address"
              className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-lg text-white focus:border-white focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              required
              disabled={isFromUrl}
            />
          </div>

          <div className="mt-8">
            <TransactionDefault
              isSponsored={true}
              calls={calls}
              disabled={!isFormValid}
            />
          </div>
        </form>
      </div>
    </main>
  );
};

export default JoinLeague; 