"use client";

import React, { useState, useEffect } from 'react';
import { getLeagueRewards } from '../utils/onChainReadUtils';
import { useGlobalState } from '@/context/GlobalStateContext';
import { RewardInfo } from '@/types/state';

const ClaimReward: React.FC = () => {
  const [leagueRewards, setLeagueRewards] = useState<RewardInfo[]>([]);

  const { state } = useGlobalState();

  useEffect(() => {
    async function fetchLeagueRewards() {
      if (state.selectedLeagueAddress) {
        const leagueRewards = await getLeagueRewards(state.selectedLeagueAddress);
        console.log('League Rewards:', leagueRewards);
        setLeagueRewards([...leagueRewards]);
      } else {
        setLeagueRewards([]);
      }
    }
    fetchLeagueRewards();
  }, [state.selectedLeagueAddress]);  

  return (
    <main className="min-h-screen flex flex-col items-center px-4">
      {leagueRewards.length === 0 && (
        <div>
          <h1>No rewards have been minted for this league</h1>
        </div>
      )}
      {leagueRewards.length > 0 && (
        <div>
          <h1>League Rewards</h1>
            {leagueRewards.map((reward, index) => (
              <div key={index}>
                <h3>{reward.teamName}</h3>
                <h3>{reward.rewardName}</h3>
                <p>{Number(reward.usdcAmount) / 1e6}</p>
                <img src={reward.imageData} alt={reward.rewardName} />
                </div>
            ))}
        </div>)}
  </main>
  );
};

export default ClaimReward; 