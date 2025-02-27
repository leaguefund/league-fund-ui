"use client";

import React, { useEffect, useState, useRef } from 'react';
import { TransactionDefault } from "@coinbase/onchainkit/transaction"
import { getApproveCall, getCreateLeagueCall } from '../utils/createCallUtils';
import { ContractCall } from '@/types/state';
import { useGlobalState } from '@/context/GlobalStateContext';
import { useNotification } from '@/context/NotificationContext';
import ApiService from '@/services/backend';

const CreateLeague: React.FC = () => {
  const [leagueName, setLeagueName] = useState('');
  const [dues, setDues] = useState(0);
  const [teamName, setTeamName] = useState('');
  const [calls, setCalls] = useState<ContractCall[]>([]);
  const { state, dispatch } = useGlobalState();
  const { showNotification } = useNotification();
  const usdcAddress = "0xa2fc8C407E0Ab497ddA623f5E16E320C7c90C83B";
  const factoryAddress = "0x466C4Ff27b97fF5b11A3AD61F4b61d2e02a18e35";
  const hasAttemptedApiCall = useRef(false);

  // Fetch league data on component mount
  useEffect(() => {
    async function fetchLeagueData() {
      // Skip if we've already attempted the call
      if (hasAttemptedApiCall.current) return;
      
      hasAttemptedApiCall.current = true;
      try {
        const response = await ApiService.createLeague(state.username || '');
        if (response.league_address) {
          dispatch({ 
            type: 'SET_LEAGUE_ADDRESS', 
            payload: response.league_address as `0x${string}` 
          });
        }
      } catch (error: any) {
        console.error('Error fetching league data:', error);
        showNotification({
          variant: 'error',
          title: 'Error',
          description: error.message || 'Failed to fetch league data',
          hideDuration: 5000
        });
      }
    }
    fetchLeagueData();
  }, [dispatch, showNotification, state.username]);

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