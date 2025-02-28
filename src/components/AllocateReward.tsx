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
      { !isCommissioner && (
        <div>
          <h1>You are not the commissioner of this league.</h1>
          <h1>Only the commissioner can allocate rewards.</h1>
        </div>
      )}
      { isCommissioner && (
              <>
                <div>
                  <h2>Winner</h2>
                  <DropdownLeagueActiveTeams
                    selectedTeam={selectedTeam}
                    setSelectedTeam={setSelectedTeam}
                  />
                </div>
                <div>
                  <h2>Reward Name</h2>
                  <input
                    type="text"
                    value={rewardName}
                    onChange={(e) => setRewardName(e.target.value)}
                    placeholder="Reward Name"
                  />
                </div>
                <div>
                  <h2>Reward Amount</h2>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    placeholder="Reward Amount"
                  />
                </div>
              </>
            )}

      {calls.length > 0 && (
        <TransactionDefault
          isSponsored={true}
          calls={calls}
        />
      )}
    </main>
  );
};

export default AllocateReward;