"use client";

import React, { useState, useEffect } from 'react';
import { TransactionDefault } from "@coinbase/onchainkit/transaction"
import { getApproveCall, getCreateLeagueCall } from '../utils/createCallUtils';


const CreateLeague: React.FC = () => {
  const [leagueName, setLeagueName] = useState('');
  const [dues, setDues] = useState(0);
  const [teamName, setTeamName] = useState('');
  const usdcAddress = "0xa2fc8C407E0Ab497ddA623f5E16E320C7c90C83B";
  const factoryAddress = "0x6dCe56BEc9FB3a2CB065c4b49c79aBc8d0216f97";

  const [shouldSubmit, setShouldSubmit] = useState(false);

  const handleSubmit = () => {
    setShouldSubmit(true);
    console.log([
      getApproveCall(usdcAddress, factoryAddress, dues),
      getCreateLeagueCall(leagueName, dues, teamName)
    ])
  };

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
      <button onClick={handleSubmit}>Create League</button>

    {shouldSubmit && (
      <TransactionDefault
        isSponsored={true}
        calls={[
          getApproveCall(usdcAddress, factoryAddress, dues),
          getCreateLeagueCall(leagueName, dues, teamName)
        ]}
      />
    )}
  </main>
  );
};

export default CreateLeague; 