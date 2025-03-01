"use client";

import React from 'react';
import { useGlobalState } from '@/context/GlobalStateContext';
import { getLeagueName, getLeagueTotalBalance } from '@/utils/onChainReadUtils';

const AuxiliaryHeader: React.FC = () => {
  const { state } = useGlobalState();
  const [leagueName, setLeagueName] = React.useState<string>('');
  const [leagueBalance, setLeagueBalance] = React.useState<number>(0);

  React.useEffect(() => {
    const fetchLeagueInfo = async () => {
      const contractAddress = state.selectedLeagueAddress;
      if (contractAddress) {
        try {
          const name = await getLeagueName(contractAddress);
          const balance = await getLeagueTotalBalance(contractAddress);
          setLeagueName(name);
          setLeagueBalance(balance);
        } catch (error) {
          console.error('Error fetching league info:', error);
        }
      }
    };
    fetchLeagueInfo();
  }, [state.selectedLeagueAddress]);

  return (
    <header className="sticky top-[62px] flex w-full !bg-gray-800 border-gray-200 z-99998 dark:border-gray-800 dark:bg-gray-900 lg:border-b">
      <div className={`flex items-center justify-between w-full px-5 py-3 lg:px-6`}>
        <h2 className="text-base font-medium text-gray-800 dark:text-white truncate">
          {state.selectedLeagueName || leagueName || 'Loading...'}
        </h2>
        <div className="bg-gray-50 rounded-lg dark:bg-gray-800 px-2 py-1">
          <span className="text-base font-medium text-gray-800 dark:text-white">
            ${leagueBalance}
          </span>
        </div>
      </div>
    </header>
  );
};

export default AuxiliaryHeader; 