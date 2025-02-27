"use client";

import React from 'react';
import { useGlobalState } from '@/context/GlobalStateContext';
import { getLeagueName, getLeagueDues } from '@/utils/onChainReadUtils';
import { useSidebar } from '@/context/SidebarContext';

const AuxiliaryHeader: React.FC = () => {
  const { state } = useGlobalState();
  const { isExpanded } = useSidebar();
  const [leagueName, setLeagueName] = React.useState<string>('');
  const [leagueDues, setLeagueDues] = React.useState<number>(0);

  React.useEffect(() => {
    const fetchLeagueInfo = async () => {
      if (state.address) {
        try {
          const name = await getLeagueName(state.address);
          const dues = await getLeagueDues(state.address);
          setLeagueName(name);
          setLeagueDues(dues);
        } catch (error) {
          console.error('Error fetching league info:', error);
        }
      }
    };

    fetchLeagueInfo();
  }, [state.address]);

  return (
    <header className="sticky top-[57px] flex w-full bg-white border-gray-200 z-99999 dark:border-gray-800 dark:bg-gray-900 lg:border-b">
      <div className={`flex items-center justify-between w-full px-5 py-3 lg:px-6 ${
        isExpanded ? 'lg:ml-64' : 'lg:ml-20'
      }`}>
        <h2 className="text-base font-medium text-gray-800 dark:text-white truncate">
          {leagueName || 'Loading...'}
        </h2>
        <div className="bg-gray-50 rounded-lg dark:bg-gray-800 px-2 py-1">
          <span className="text-base font-medium text-gray-800 dark:text-white">
            ${leagueDues}
          </span>
        </div>
      </div>
    </header>
  );
};

export default AuxiliaryHeader; 