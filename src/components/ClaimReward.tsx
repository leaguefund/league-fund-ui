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
      if (state.selectedContractLeagueAddress && state.wallet) {
        const teamRewards = await getUserRewards(state.selectedContractLeagueAddress, state.wallet);
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
  }, [state.wallet, state.selectedContractLeagueAddress]);

  useEffect(() => {
    async function fetchCalls() {
      if (state.selectedContractLeagueAddress && imageURL) {
        setCalls([
          getClaimRewardCall(state.selectedContractLeagueAddress, imageURL),
        ])
      } else {
        setCalls([]);
      }
    }
    fetchCalls();
  }, [state.selectedContractLeagueAddress, imageURL]);
  

  return (
    <main className="min-h-screen flex flex-col items-center px-4">
      { !rewardPending && (
        <div>
          <h1>You have no claimable rewards</h1>
        </div>
      )}
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