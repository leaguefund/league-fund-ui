"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGlobalState } from '@/context/GlobalStateContext';
import sdk from "@farcaster/frame-sdk";
import { WalletLeague } from '@/types/state';
import SleeperLogo from './SleeperLogo';

interface TeamMember {
  username: string;
  avatar: string | null;
  wallet: string | null;
  team_name: string | null;
  is_commissioner: boolean | null;
  is_owner: boolean | null;
}

const JoinLeagueSleeper: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const { state, dispatch } = useGlobalState();
  const selectedContractLeague = state.selectedContractLeague as WalletLeague
  const [sleeperTeams, setSleeperTeams] = useState<TeamMember[]>([]);

  useEffect(() => {
    sdk.actions.ready({});
  }, []);

  useEffect(() => {
    async function initializeContractLeague() {
      const urlLeagueAddress = searchParams?.get('league_address') || '';
      if (urlLeagueAddress?.startsWith('0x')) {
        const contractAddress = urlLeagueAddress as `0x${string}`;

        dispatch({ type: 'SET_SELECTED_CONTRACT_LEAGUE_ADDRESS', payload: contractAddress });
        console.log("🔗 SELECTED_CONTRACT_LEAGUE_ADDRESS Updated", contractAddress);
        
      } else {
        console.log("🤝 error 2");
        setIsLoading(false);
      }
    }
    console.log("selectedContractLeague", selectedContractLeague)
    initializeContractLeague();

    // Stop loading if sleeperTeams has 1 or more elements
    if (selectedContractLeague?.sleeperTeams?.length > 0) {
      setSleeperTeams(selectedContractLeague.sleeperTeams);
      setIsLoading(false);
    }

  }, [searchParams, dispatch, selectedContractLeague]);

  const handleSelectUser = async (user: TeamMember) => {
    setIsLoading(true);
    try {
      dispatch({
        type: 'SET_SELECTED_SLEEPER_USER',
        payload: {
          username: user.username,
          avatar: user.avatar
        }
      });
      router.push(`/join-connect-wallet?username=${encodeURIComponent(user.username)}&avatar=${encodeURIComponent(user.avatar || '')}`);
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
              Welcome To League Fund 👋
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-300">
            Let&apos;s start with your Sleeper account
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {sleeperTeams && sleeperTeams.map((user, index) => (
            <button
              key={index}
              onClick={() => handleSelectUser(user)}
              disabled={isLoading}
              className="flex flex-col items-center p-6 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors space-y-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <SleeperLogo avatar={user.avatar} username={user.username} width={80} />
              <span className="text-gray-300">{user.username}</span>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
};

export default JoinLeagueSleeper;