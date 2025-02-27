"use client";

import React from 'react';
import Image from 'next/image';
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
    <div className="sticky top-[73px] w-full bg-gray-50/80 border-b border-gray-200 backdrop-blur-sm z-50 dark:bg-gray-900/50 dark:border-gray-800">
      <div className={`flex items-center justify-between h-14 px-5 lg:px-6 transition-all duration-300 ${
        isExpanded ? 'lg:ml-64' : 'lg:ml-20'
      }`}>
        <div className="flex items-center space-x-4 min-w-0">
          <Image
            src="/images/trophy.png"
            alt="League Icon"
            width={24}
            height={24}
            className="rounded flex-shrink-0"
          />
          <h2 className="text-base font-medium text-gray-900 dark:text-white truncate">
            {leagueName || 'Loading...'}
          </h2>
        </div>
        <div className="flex items-center justify-center">
          <div className="px-3 py-1.5 bg-gray-100/80 rounded-lg dark:bg-gray-800/50 backdrop-blur-sm">
            <span className="text-base font-medium text-gray-900 dark:text-white">
              ${leagueDues}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuxiliaryHeader; 