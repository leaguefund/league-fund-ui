"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGlobalState } from '@/context/GlobalStateContext';
import ApiService from '@/services/backend';
import sdk from "@farcaster/frame-sdk";

interface TeamMember {
  username: string;
  avatar: string | null;
  wallet: string | null;
  team_name: string | null;
  is_commissioner: boolean | null;
  is_owner: boolean | null;
}

interface LeagueResponse {
  status: string;
  league_id: number;
  name: string;
  avatar: string;
  league_sleeper_id: string;
  teams: {
    league_name: string;
    league_avatar: string;
    league_dues_ucsd: string;
    teams: TeamMember[];
  };
  dues_ucsd: string;
}

const JoinLeagueSleeper: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { dispatch } = useGlobalState();
  const [isLoading, setIsLoading] = useState(true);
  const [leagueData, setLeagueData] = useState<LeagueResponse | null>(null);

  useEffect(() => {
    sdk.actions.ready({});
  }, []);

  useEffect(() => {
    async function initializeWithLeagueAddress() {
      const urlLeagueAddress = searchParams?.get('league_address') || '';
      if (urlLeagueAddress?.startsWith('0x')) {
        const address = urlLeagueAddress as `0x${string}`;
        dispatch({ type: 'SET_SELECTED_WALLET_LEAGUE', payload: address });
        
        try {
          const response = await ApiService.readLeague(address);
          console.log('League data:', response);
          setLeagueData(response);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching league data:', error);
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    }

    initializeWithLeagueAddress();
  }, [searchParams, dispatch]);

  const handleSelectUser = async (user: TeamMember) => {
    setIsLoading(true);
    try {
      // Set the selected user in global state (as fallback for page refreshes)
      dispatch({
        type: 'SET_SELECTED_SLEEPER_USER',
        payload: {
          username: user.username,
          avatar: user.avatar
        }
      });
      
      // Navigate with user data as props
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
              Welcome 👋
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-300">
            Let&apos;s start with your Sleeper account
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {leagueData?.teams.teams.map((user, index) => (
            <button
              key={index}
              onClick={() => handleSelectUser(user)}
              disabled={isLoading}
              className="flex flex-col items-center p-6 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors space-y-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Image
                src={user.avatar || '/images/placeholder.png'}
                alt={user.username}
                width={80}
                height={80}
                className="rounded-full"
              />
              <span className="text-gray-300">{user.username}</span>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
};

export default JoinLeagueSleeper; 