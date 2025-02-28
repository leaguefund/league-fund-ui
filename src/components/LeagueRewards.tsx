"use client";

import React, { useState, useEffect } from 'react';
import { getLeagueRewards } from '../utils/onChainReadUtils';
import { useGlobalState } from '@/context/GlobalStateContext';
import { RewardInfo } from '@/types/state';
import NFTCard from "@/components/cards/card-with-image/NFTCard";

const LeagueRewards: React.FC = () => {
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {leagueRewards.map((reward, index) => (
              <NFTCard
              key={index}
              imageSrc={reward.imageData}
              title={reward.rewardName}
              description={
                <>
                <span>Winner: {reward.teamName}</span>
                <br />
                <span>Amount: {Number(reward.usdcAmount) / 1e6} USDC</span>
                </>
              }
              />
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default LeagueRewards;