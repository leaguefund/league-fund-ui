"use client";

import React, { useEffect, useState } from 'react';
import { TransactionDefault } from "@coinbase/onchainkit/transaction"
import { getApproveCall, getCreateLeagueCall } from '../utils/createCallUtils';
import { ContractCall } from '@/types/state';

const CreateLeague: React.FC = () => {
  const [leagueName, setLeagueName] = useState('');
  const [dues, setDues] = useState(0);
  const [teamName, setTeamName] = useState('');
  const [calls, setCalls] = useState<ContractCall[]>([]);
  const usdcAddress = "0xa2fc8C407E0Ab497ddA623f5E16E320C7c90C83B";
  const factoryAddress = "0x466C4Ff27b97fF5b11A3AD61F4b61d2e02a18e35";

  useEffect(() => {
    async function fetchCalls() {
      if (leagueName && teamName) {
        setCalls([
          getApproveCall(usdcAddress, factoryAddress, dues * 1e6),
          getCreateLeagueCall(leagueName, dues * 1e6, teamName)
        ])
      } else {
        setCalls([]);
      }
    }
    fetchCalls();
  }, [leagueName, dues, teamName]);

  return (
    <main className="min-h-screen flex flex-col items-center px-4">
      <div>
        <h2>League Name</h2>
        <input
          type="text"
          value={leagueName}
          onChange={(e) => setLeagueName(e.target.value)}
          placeholder="League Name"
        />
      </div>
      <div>
        <h2>League Dues</h2>
        <input
          type="number"
          value={dues}
          onChange={(e) => setDues(Number(e.target.value))}
          placeholder="League Dues"
        />
      </div>
      <div>
        <h2>Team Name</h2>
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Team Name"
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

export default CreateLeague; 