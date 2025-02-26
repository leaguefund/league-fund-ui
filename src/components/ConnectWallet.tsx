"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGlobalState } from '@/context/GlobalStateContext';
import ApiService from '@/services/backend';

const ConnectWallet: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { state, dispatch } = useGlobalState();

  const handleConnectWallet = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await ApiService.connectWallet();
      console.log('response', response);
      dispatch({ type: 'CONNECT_WALLET', payload: true });
      router.push('/create-league');
    } catch (error) {
      console.error('Error connecting wallet:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center px-4">
      <div className="max-w-4xl w-full mt-16 space-y-12">
        {/* Title Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Connect Wallet
          </h1>
          <p className="text-xl md:text-2xl text-gray-300">
            Let&apos;s get your wallet connected to handle dues.
          </p>
        </div>

        {/* League Display */}
        <div className="flex flex-col items-center space-y-4">
          <Image 
            src="/images/trophy.png"
            alt="League Trophy" 
            width={120} 
            height={120}
            className="rounded-lg"
          />
          <h2 className="text-2xl font-bold text-white">
            {state.leagueSelected?.name || 'Champions League'}
          </h2>
        </div>

        {/* Main Actions */}
        <div className="space-y-8">
          {/* Connect Wallet Button */}
          <Link 
            href="/create-league"
            onClick={handleConnectWallet}
            className="w-full flex items-center justify-center space-x-3 bg-gray-700 hover:bg-gray-600 text-white py-6 rounded-lg transition-colors"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-4 border-white/30 border-t-white" />
            ) : (
              <span className="text-xl">Connect Wallet</span>
            )}
          </Link>

          {/* Start Over Link */}
          <Link 
            href="/" 
            className="w-full text-gray-300 hover:text-white py-4 text-lg transition-colors text-center block"
          >
            Start Over
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ConnectWallet; 