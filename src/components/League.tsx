"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useGlobalState } from '@/context/GlobalStateContext';

type Tab = 'teams' | 'rewards';

const League: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('teams');
  const { state } = useGlobalState();

  // Placeholder data - replace with actual data later
  const users = [
    { id: 1, username: 'coylewis737', address: '0x123....543' },
    { id: 2, username: 'alexmcritchie', address: '0x543....678' },
    { id: 3, username: 'ncaldwell918', address: '0x123....543', isOwner: true },
    { id: 4, username: 'djwood', address: '0x543....678' },
  ];

  return (
    <main className="min-h-screen flex flex-col items-center px-4">
      <div className="max-w-4xl w-full mt-16 space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Champions League
          </h1>
          <p className="text-xl md:text-2xl text-gray-300">
            Welcome to your league dashboard
          </p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('teams')}
            className={`px-8 py-3 rounded-full text-lg font-medium transition-colors ${
              activeTab === 'teams'
                ? 'bg-gray-700 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Teams
          </button>
          <button
            onClick={() => setActiveTab('rewards')}
            className={`px-8 py-3 rounded-full text-lg font-medium transition-colors ${
              activeTab === 'rewards'
                ? 'bg-gray-700 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Rewards
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {activeTab === 'teams' && (
            <>
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <Image
                      src="/images/placeholder.png"
                      alt={user.username}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div className="space-y-1">
                      <div className="text-white text-lg">{user.username}</div>
                      <div className="text-gray-400 text-sm">{user.address}</div>
                    </div>
                  </div>
                  {user.isOwner && (
                    <span className="px-4 py-1 bg-gray-700 rounded-full text-sm text-white">
                      Owner
                    </span>
                  )}
                </div>
              ))}
            </>
          )}
          {activeTab === 'rewards' && (
            <div className="text-center text-gray-400 py-8">
              Rewards content coming soon
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default League; 