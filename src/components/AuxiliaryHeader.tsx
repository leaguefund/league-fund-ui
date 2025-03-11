"use client";

import React from 'react';
import { useSidebar } from "@/context/SidebarContext";
import { useGlobalState } from '@/context/GlobalStateContext';
import { getLeagueName, getLeagueTotalBalance } from '@/utils/onChainReadUtils';
import { WalletLeague } from '@/types/state';

const AuxiliaryHeader: React.FC = () => {
  const [leagueName, setLeagueName] = React.useState<string>('');
  const [leagueBalance, setLeagueBalance] = React.useState<number>(0);
  const { toggleSidebar, toggleMobileSidebar } = useSidebar();
  const { state, dispatch } = useGlobalState();
  const selectedContractLeague = state.selectedContractLeague as WalletLeague

  const handleToggle = () => {
    if (window.innerWidth >= 991) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  if (!selectedContractLeague) {
    return null;
  }

  return (
    <header onClick={handleToggle} className="sticky top-[62px] flex w-full !bg-gray-800 border-gray-200 z-99998 dark:border-gray-800 dark:bg-gray-900 lg:border-b">
      <div className={`flex items-center justify-between w-full px-5 py-3 lg:px-6`}>
        <h2 className="text-base font-medium text-gray-800 dark:text-white truncate">
          {selectedContractLeague.leagueName || 'Loading...'}
        </h2>
        <div className="bg-gray-50 rounded-lg dark:bg-gray-800 px-2 py-1">
          <span className="text-base font-medium text-gray-800 dark:text-white">
            ${selectedContractLeague.leagueBalance }
          </span>
        </div>
      </div>
    </header>
  );
};

export default AuxiliaryHeader;