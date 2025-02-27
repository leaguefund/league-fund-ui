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
    <div key={isExpanded ? 'expanded' : 'collapsed'} className="sticky top-[57px] w-full bg-gray-100 border-b border-gray-200 z-[99998] dark:bg-gray-800/40 dark:border-gray-800">
      <div className={`w-full flex items-center h-12 transition-all duration-300 ${
        isExpanded ? 'lg:ml-64' : 'lg:ml-20'
      }`}>
        <div className="flex items-center pl-5 lg:pl-6 min-w-0">
          <Image
            src="/images/trophy.png"
            alt="League Icon"
            width={22}
            height={22}
            className="rounded flex-shrink-0"
          />
          <h2 className="text-base font-medium text-gray-800 dark:text-white truncate ml-3">
            {leagueName || 'Loading...'}
          </h2>
        </div>
        <div className="ml-auto px-5 lg:px-6">
          <div className="px-3 py-1.5 bg-white rounded-lg dark:bg-gray-700/60">
            <span className="text-base font-medium text-gray-800 dark:text-white">
              ${leagueDues}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuxiliaryHeader; 