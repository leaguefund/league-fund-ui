"use client";

import React, { useEffect, useState } from 'react';
import LeagueRewards from './LeagueRewards';
import { useGlobalState } from '@/context/GlobalStateContext';
import { useSearchParams } from 'next/navigation';
import CopyInput from './form/form-elements/CopyInput';

type Tab = 'teams' | 'rewards';

const League: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('teams');

  const { state } = useGlobalState();
  const searchParams = useSearchParams();

  // Check for selectedTab in localStorage or URL params
  useEffect(() => {
    setActiveTab('teams');
    const selectedTab = localStorage.getItem('selectedTab');
    const rewardsParam = searchParams?.get('rewards') || '';
    if (selectedTab === 'rewards' || rewardsParam === 'true') {
      setActiveTab('rewards');
      localStorage.removeItem('selectedTab');
    }
  }, [searchParams]);

  return (
    <main className="min-h-screen flex flex-col items-center px-4">
      <div className="max-w-4xl w-full mt-16 space-y-12">
        {/* <div className="text-center space-y-4">
          <CopyInput />
        </div> */}
        {/* Tabs */}
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('teams')}
            className={`px-8 py-3 rounded-full text-md font-medium transition-colors ${
              activeTab === 'teams'
                ? 'bg-gray-700 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Teams
            <span className="text-xs ml-1">👥 {state.selectedContractLeague?.activeTeams?.length}</span>
          </button>
          <button
            onClick={() => setActiveTab('rewards')}
            className={`px-8 py-3 rounded-full text-md font-medium transition-colors ${
              activeTab === 'rewards'
                ? 'bg-gray-700 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Rewards
            <span className="text-xs ml-1">🏆 {state.selectedContractLeague?.leagueRewards?.length}</span>
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {activeTab === 'teams' && (state.selectedContractLeague?.activeTeams?.length ?? 0) > 0 && (
            <>
              {state.selectedContractLeague?.activeTeams?.map((team, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg"
                >
                  <div className="flex items-center space-x-4 truncate">
                    <div className="space-y-1 truncate">
                      <div className="text-white text-lg">{team.name}</div>
                      <div className="text-gray-400 text-sm truncate">{team.wallet}</div>
                    </div>
                  </div>
                  {team.owner && (
                    <span className="px-4 py-1 bg-gray-700 rounded-full text-sm text-white">
                      Owner
                    </span>
                  )}
                </div>
              ))}
              <div className="text-center space-y-4">
                <h1 className="text-md md:text-md font-bold text-white  mt-12">
                  Invite Teams 💌
                </h1>
                <CopyInput />
              </div>
            </>
          )}
          {activeTab === 'rewards' && (
            <div className="text-center text-gray-400 py-8">
              <LeagueRewards />
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default League;