"use client";

import React, { useEffect, useState } from 'react';
import { TransactionDefault } from "@coinbase/onchainkit/transaction"
import { getApproveCall, getJoinLeagueCall } from '../utils/createCallUtils';
import { getLeagueDues } from '../utils/onChainReadUtils';
import { ContractCall } from '@/types/state';

const JoinLeague: React.FC = () => {
  const [leagueAddress, setLeagueAddress] = useState<`0x${string}` | null>(null);
  const [teamName, setTeamName] = useState('');
  const [dues, setDues] = useState(0);
  const [calls, setCalls] = useState<ContractCall[]>([]);
  const usdcAddress = "0xa2fc8C407E0Ab497ddA623f5E16E320C7c90C83B";

  useEffect(() => {
    async function fetchDues() {
      if (leagueAddress) {
        const dues = await getLeagueDues(leagueAddress);
        setDues(dues);
      } else {
        setDues(0);
      }
    }
    fetchDues();
  }, [leagueAddress]);

  useEffect(() => {
    async function fetchCalls() {
      if (leagueAddress && teamName) {
        setCalls([
          getApproveCall(usdcAddress, leagueAddress, dues * 1e6),
          getJoinLeagueCall(leagueAddress, teamName)
        ])
      } else {
        setCalls([]);
      }
    }
    fetchCalls();
  }, [leagueAddress, teamName, dues]);

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
          value={leagueAddress ? leagueAddress : ''}
          onChange={(e) => setLeagueAddress(e.target.value as `0x${string}`)}
          placeholder="League Address"
        />
      </div>
    
    {calls.length > 0 && (
      <TransactionDefault
        isSponsored={true}
        calls={calls}
      />
    )}
  </main>
  );
};

export default JoinLeague; 