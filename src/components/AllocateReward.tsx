"use client";

import React, { useState } from 'react';
import { TransactionDefault } from "@coinbase/onchainkit/transaction"
import { getAllocateRewardCall } from '../utils/createCallUtils';

const AllocateReward: React.FC = () => {
  const [leagueAddress, setLeagueAddress] = useState<`0x${string}`>('0x');
  const [teamAddress, setTeamAddress] = useState<`0x${string}`>('0x');
  const [rewardName, setRewardName] = useState('');
  const [amount, setAmount] = useState(0);

  const [shouldSubmit, setShouldSubmit] = useState(false);

  const handleSubmit = () => {
    setShouldSubmit(true);
    console.log([
      getAllocateRewardCall(leagueAddress, teamAddress, rewardName, amount * 1e6),
    ])
  };

  return (
    <main className="min-h-screen flex flex-col items-center px-4">
      <div>
        <h2>League Address</h2>
        <input
          type="text"
          value={leagueAddress}
          onChange={(e) => setLeagueAddress(e.target.value as `0x${string}`)}
          placeholder="League Address"
        />
      </div>
      <div>
        <h2>Team Address</h2>
        <input
          type="text"
          value={teamAddress}
          onChange={(e) => setTeamAddress(e.target.value as `0x${string}`)}
          placeholder="Team Address"
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
      <button onClick={handleSubmit}>Join League</button>

    {shouldSubmit && (
      <TransactionDefault
        isSponsored={true}
        calls={[
          getAllocateRewardCall(leagueAddress, teamAddress, rewardName, amount * 1e6),
        ]}
      />
    )}
  </main>
  );
};

export default AllocateReward; 