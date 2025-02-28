"use client";

import React, { useState, useEffect } from 'react';
import { TransactionDefault } from "@coinbase/onchainkit/transaction"
import { getAllocateRewardCall } from '../utils/createCallUtils';
import { useGlobalState } from '@/context/GlobalStateContext';
import DropdownLeagueActiveTeams from "@/components/example/DropdownExample/DropdownLeagueActiveTeams";
import { TeamInfo, ContractCall } from '@/types/state';

const AllocateReward: React.FC = () => {
  const [teamAddress, setTeamAddress] = useState<`0x${string}` | null>(null);
  const [rewardName, setRewardName] = useState('');
  const [amount, setAmount] = useState(0);
  const [calls, setCalls] = useState<ContractCall[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<TeamInfo | null>(null);
  const [isCommissioner, setIsCommissioner] = useState(false);

  const { state } = useGlobalState();

  useEffect(() => {
    async function checkCommissioner() {
      if (state.walletLeagues?.filter(league => league.leagueAddress === state.selectedLeagueAddress)[0].commissioner) {
        setIsCommissioner(true);
      } else {
        setIsCommissioner(false);
      }
    }
    checkCommissioner();
  }, [state.walletLeagues, state.selectedLeagueAddress]);

  useEffect(() => {
    async function fetchCalls() {
      if (state.selectedLeagueAddress && teamAddress && rewardName) {
        setCalls([
          getAllocateRewardCall(state.selectedLeagueAddress, teamAddress, rewardName, amount * 1e6),
        ])
      } else {
        setCalls([]);
      }
    }
    fetchCalls();
  }, [state.selectedLeagueAddress, teamAddress, rewardName, amount]);

  useEffect(() => {
    if (selectedTeam) {
      setTeamAddress(selectedTeam.wallet);
    } else {
      setTeamAddress(null);
    }
  }, [selectedTeam]);

  return (
    <main className="min-h-screen flex flex-col items-center px-4">
      <div className="max-w-4xl w-full mt-16 space-y-12">
        {!isCommissioner ? (
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Commissioner Access Only
            </h1>
            <p className="text-xl text-gray-300">
              Only the commissioner can allocate rewards for this league.
            </p>
          </div>
        ) : (
          <>
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Allocate League Reward
              </h1>
              <p className="text-xl text-gray-300">
                Select a team and specify their reward details
              </p>
            </div>

            <form 
              className="space-y-8 max-w-[320px] mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              {/* Winner Selection */}
              <div className="space-y-2">
                <label className="text-xl text-gray-300">Winner</label>
                <DropdownLeagueActiveTeams
                  selectedTeam={selectedTeam}
                  setSelectedTeam={setSelectedTeam}
                />
              </div>

              {/* Reward Name */}
              <div className="space-y-2">
                <label className="text-xl text-gray-300">Reward Name</label>
                <input
                  type="text"
                  value={rewardName}
                  onChange={(e) => setRewardName(e.target.value)}
                  className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-lg text-white focus:border-white focus:outline-none"
                  placeholder="Enter reward name"
                />
              </div>

              {/* Reward Amount */}
              <div className="space-y-2">
                <label className="text-xl text-gray-300">Reward Amount (USDC)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-lg text-white focus:border-white focus:outline-none"
                  placeholder="Enter amount in USDC"
                  min="0"
                  step="1"
                />
              </div>

              {/* Transaction Button */}
              {calls.length > 0 && (
                <div className="pt-4">
                  <TransactionDefault
                    isSponsored={true}
                    calls={calls}
                  />
                </div>
              )}
            </form>
          </>
        )}
      </div>
    </main>
  );
};

export default AllocateReward;