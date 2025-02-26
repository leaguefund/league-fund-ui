"use client";

import React, { useEffect, useState } from 'react';
import { TransactionDefault } from "@coinbase/onchainkit/transaction"
import { getApproveCall, getJoinLeagueCall } from '../utils/createCallUtils';
import { getLeagueDues } from '../utils/onChainReadUtils';

const JoinLeague: React.FC = () => {
  const [leagueAddress, setLeagueAddress] = useState<`0x${string}`>('0x');
  const [teamName, setTeamName] = useState('');
  const [dues, setDues] = useState(0);
  const usdcAddress = "0xa2fc8C407E0Ab497ddA623f5E16E320C7c90C83B";

  const [shouldSubmit, setShouldSubmit] = useState(false);

  const handleSubmit = () => {
    setShouldSubmit(true);
    console.log([
      getApproveCall(usdcAddress, leagueAddress, dues * 1e6),
      getJoinLeagueCall(leagueAddress, teamName)
    ])
  };

  useEffect(() => {
    async function fetchDues() {
      if (leagueAddress === '0x') return;
      const dues = await getLeagueDues(leagueAddress);
      setDues(dues);
    }
    fetchDues();
  }
  , [leagueAddress]);

  return (
    <main className="min-h-screen flex flex-col items-center px-4">
      <div>
        <h2>Team Name</h2>
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Team Name"
        />
      </div>
      <div>
        <h2>League Address</h2>
        <input
          type="text"
          value={leagueAddress}
          onChange={(e) => setLeagueAddress(e.target.value as `0x${string}`)}
          placeholder="League Address"
        />
      </div>
      <button onClick={handleSubmit}>Join League</button>

    {shouldSubmit && (
      <TransactionDefault
        isSponsored={true}
        calls={[
          getApproveCall(usdcAddress, leagueAddress, dues * 1e6),
          getJoinLeagueCall(leagueAddress, teamName)
        ]}
      />
    )}
  </main>
  );
};

export default JoinLeague; 