"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGlobalState } from '@/context/GlobalStateContext';
import CopyInput from './form/form-elements/CopyInput';

const LeagueCreated: React.FC = () => {
  const router = useRouter();
  const { state } = useGlobalState();

  const handleInviteTeams = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push('/invite-teams');
  };

  return (
    <main className="min-h-screen flex flex-col items-center px-4">
      <div className="max-w-4xl w-full mt-16 space-y-12">
        {/* Title Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              League Created
            </h1>
            <span className="text-4xl">🎉</span>
          </div>
          <p className="text-xl md:text-2xl text-gray-300">
            {state.selectedLeague?.name || 'The Champions League'} has been immortalized onchain
          </p>
        </div>

        {/* Main Actions */}
        <div className="space-y-8">
          {/* Invite Teams Button */}
          <Link 
            href="/invite-teams"
            onClick={handleInviteTeams}
            className="w-full flex items-center justify-center space-x-3 bg-gray-700 hover:bg-gray-600 text-white py-6 rounded-lg transition-colors"
          >
            <span className="text-xl">League Dashboard</span>
          </Link>
          <CopyInput />
        </div>
      </div>
    </main>
  );
};

export default LeagueCreated; 