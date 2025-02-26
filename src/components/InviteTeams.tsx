"use client";

import React from 'react';
import { useGlobalState } from '@/context/GlobalStateContext';

const InviteTeams: React.FC = () => {
  const { state } = useGlobalState();

  return (
    <main className="min-h-screen flex flex-col items-center px-4">
      <div className="max-w-4xl w-full mt-16 space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Invite Teams
          </h1>
          <p className="text-xl md:text-2xl text-gray-300">
            {state.leagueSelected?.name || 'Champions League'}
          </p>
        </div>
      </div>
    </main>
  );
};

export default InviteTeams; 