"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useGlobalState } from '@/context/GlobalStateContext';

const InvitesSent: React.FC = () => {
  const { state } = useGlobalState();

  return (
    <main className="min-h-screen flex flex-col items-center px-4">
      <div className="max-w-4xl w-full mt-16 space-y-12">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Invitations Sent 🎉
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-300">
            Invites have been sent to
          </p>
          <p className="text-lg text-gray-400">
            {state.inviteEmails?.join(', ')}
          </p>
        </div>

        <div className="space-y-8">
          <Link
            href="/league-dashboard"
            className="w-full flex items-center justify-center space-x-3 bg-gray-700 hover:bg-gray-600 text-white py-6 rounded-lg transition-colors"
          >
            <span className="text-xl">League Dashboard</span>
          </Link>

          <Link
            href="/invite-teams"
            className="w-full text-gray-300 hover:text-white py-4 text-lg transition-colors text-center block"
          >
            Invite More Friends
          </Link>
        </div>
      </div>
    </main>
  );
};

export default InvitesSent; 