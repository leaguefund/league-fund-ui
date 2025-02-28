"use client";

import React, { useEffect, useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { getLeagueDues, getTokenAllowance } from '../utils/onChainReadUtils';
import { tokenContract } from '@/contracts/token';
import { leagueContract } from '@/contracts/league';
import sdk from "@farcaster/frame-sdk";
import { useGlobalState } from '@/context/GlobalStateContext';

const JoinLeague: React.FC = () => {
  const [leagueAddress, setLeagueAddress] = useState<`0x${string}` | null>(null);
  const [teamName, setTeamName] = useState('');
  const [dues, setDues] = useState(0);
  const [allowance, setAllowance] = useState(0);
  const [txHashApprove, setTxHashApprove] = useState<`0x${string}` | undefined>(undefined);
  const [txHashJoin, setTxHashJoin] = useState<`0x${string}` | undefined>(undefined);
  const usdcAddress = "0xa2fc8C407E0Ab497ddA623f5E16E320C7c90C83B";

  const { state } = useGlobalState();

  useEffect(() => {
    sdk.actions.ready({});
  }, []);

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

  const { writeContract, isPending } = useWriteContract();

  const handleApprove = async () => {
    if (leagueAddress) {
      if (allowance >= dues) {
        console.log("User has sufficient allowance. Proceeding to join league...");
        handleJoinLeague();
        return;
      }
      try {
        const hash = await writeContract({
          address: usdcAddress,
          abi: tokenContract.abi,
          functionName: "approve",
          args: [leagueAddress, BigInt(dues * 1e6)],
        });
        setTxHashApprove(hash); // ✅ Now updates state correctly
        console.log("Approval Transaction Hash:", hash);
      } catch (error) {
        console.error("Approval failed:", error);
      }
    }
  };

  const handleJoinLeague = async () => {
    if (leagueAddress) {
      try {
        const hash = await writeContract({
          address: leagueAddress,
          abi: leagueContract.abi,
          functionName: "joinSeason",
          args: [teamName],
        });
        setTxHashJoin(hash); // ✅ Now updates state correctly
        console.log("Join League Transaction Hash:", hash);
      } catch (error) {
        console.error("Join League failed:", error);
      }
    }
  };

  const { isLoading: isApproveLoading, isSuccess: isApproveSuccess } = useWaitForTransactionReceipt({
    hash: txHashApprove,
  });

  const { isLoading: isJoinLeagueLoading, isSuccess: isJoinLeagueSuccess } = useWaitForTransactionReceipt({
    hash: txHashJoin,
  });

  useEffect(() => {
    async function fetchAllowance() {
      if (leagueAddress && state.wallet) {
        const allowance = await getTokenAllowance(usdcAddress, state.wallet, leagueAddress);
        setAllowance(allowance);
      } else {
        setAllowance(0);
      }
    }
    fetchAllowance();
  }, [leagueAddress, state.wallet, isApproveSuccess]);

  useEffect(() => {
    if (isApproveSuccess && !txHashJoin) {
      console.log("Approval confirmed. Proceeding to join league...");
      handleJoinLeague();
    }
  }, [isApproveSuccess, txHashJoin]);

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
      <button
        onClick={handleApprove}
        disabled={isApproveLoading || isJoinLeagueLoading}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {isPending || isApproveLoading || isJoinLeagueLoading ? "Processing..." : "Join League"}
      </button>

      {isApproveLoading && <p>⏳ Approving USDC...</p>}
      {isApproveSuccess && <p>✅ Approval Confirmed!</p>}
      {isJoinLeagueLoading && <p>⏳ Joining League...</p>}
      {isJoinLeagueSuccess && <p>🎉 Successfully joined the league!</p>}
    </main>  );
};

export default JoinLeague;