"use client";

import React, { useState } from 'react';
import { TransactionDefault } from "@coinbase/onchainkit/transaction"
import { getClaimRewardCall } from '../utils/createCallUtils';

const ClaimReward: React.FC = () => {
  const [leagueAddress, setLeagueAddress] = useState<`0x${string}`>('0x');
  const [imageURL, setImageURL] = useState('');

  const [shouldSubmit, setShouldSubmit] = useState(false);

  const handleSubmit = () => {
    setShouldSubmit(true);
    console.log([
      getClaimRewardCall(leagueAddress, [imageURL]),
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
        <h2>Image URL</h2>
        <input
          type="text"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
          placeholder="Image URL"
        />
      </div>
      <button onClick={handleSubmit}>Join League</button>

    {shouldSubmit && (
      <TransactionDefault
        isSponsored={true}
        calls={[
          getClaimRewardCall(leagueAddress, [imageURL]),
        ]}
      />
    )}
  </main>
  );
};

export default ClaimReward; 