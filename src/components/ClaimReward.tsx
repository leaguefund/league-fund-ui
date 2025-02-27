"use client";

import React, { useState, useEffect } from 'react';
import { TransactionDefault } from "@coinbase/onchainkit/transaction"
import { getClaimRewardCall } from '../utils/createCallUtils';
import { getUserRewards } from '../utils/onChainReadUtils';
import { useGlobalState } from '@/context/GlobalStateContext';
import { ContractCall } from '@/types/state';

const ClaimReward: React.FC = () => {
  const [imageURL, setImageURL] = useState('');
  const [rewardPending, setRewardPending] = useState(false);
  const [calls, setCalls] = useState<ContractCall[]>([]);

  const { state } = useGlobalState();

  useEffect(() => {
    async function fetchUserRewards() {
      if (state.selectedLeagueAddress && state.wallet) {
        const teamRewards = await getUserRewards(state.selectedLeagueAddress, state.wallet);
        console.log('User Rewards:', teamRewards);
        if (teamRewards.length > 0) {
          setRewardPending(true);
        } else {
          setRewardPending(false);
        }
      } else {
        setRewardPending(false);
      }
    }
    fetchUserRewards();
  }, [state.wallet, state.selectedLeagueAddress]);

  useEffect(() => {
    async function fetchCalls() {
      if (state.selectedLeagueAddress && imageURL) {
        setCalls([
          getClaimRewardCall(state.selectedLeagueAddress, imageURL),
        ])
      } else {
        setCalls([]);
      }
    }
    fetchCalls();
  }, [state.selectedLeagueAddress, imageURL]);
  

  return (
    <main className="min-h-screen flex flex-col items-center px-4">
      { rewardPending && (
      <div>
        <h2>Image URL</h2>
        <input
          type="text"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
          placeholder="Image URL"
        />
      </div>)}

    {calls.length > 0 && rewardPending && (
      <TransactionDefault
        isSponsored={true}
        calls={calls}
      />
    )}
  </main>
  );
};

export default ClaimReward; 