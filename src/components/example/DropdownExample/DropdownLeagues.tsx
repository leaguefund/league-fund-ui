"use client";
import React, { useState, useEffect } from "react";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import { getUserLeagues } from '@/utils/onChainReadUtils';
import { useGlobalState } from '@/context/GlobalStateContext';

export default function DropdownLeagues() {
  const [isOpen, setIsOpen] = useState(false);
  const [leagues, setLeagues] = useState<Array<{ league: `0x${string}`; joined: boolean; currentlyActive: boolean }>>([]);
  const [teamAddress] = useState<`0x${string}`>('0xE262C1e7c5177E28E51A5cf1C6944470697B2c9F');
  const { state, dispatch } = useGlobalState();
  // const [leagueAddress, setLeagueAddress] = useState<`0x${string}`>('0x');
  // setLeagueAddress('0x2c2Ff53deC9810D449d9Ea45A669a3614Ff7C3DE');

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const userLeagues = await getUserLeagues(teamAddress);
        setLeagues(userLeagues);
        // Initialize with first league if none selected
        if (userLeagues.length > 0 && !state.address) {
          dispatch({ type: 'SET_WALLET_ADDRESS', payload: userLeagues[0].league });
        }
      } catch (error) {
        console.error('Error fetching leagues:', error);
      }
    };
    fetchLeagues();
  }, [teamAddress, dispatch, state.address]);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  function updateSelectedLeague(address: `0x${string}`) {
    dispatch({ type: 'SET_WALLET_ADDRESS', payload: address });
    setIsOpen(false);
  }
  
  return (
    <div className="w-full max-w-[280px]">
      <div className="relative w-full">
        <button
          onClick={toggleDropdown}
          className="w-full inline-flex items-center justify-between dropdown-toggle gap-2 px-4 py-3 text-sm font-medium text-white rounded-lg bg-brand-500 hover:bg-brand-600 transition-colors duration-200"
        >
          <div className="truncate">
            {state.address ? `${state.address.slice(0, 6)}...${state.address.slice(-4)}` : 'Select League'}
          </div>
          <svg
            className={`flex-shrink-0 w-5 h-5 duration-200 ease-in-out stroke-current ${
              isOpen ? "rotate-180" : ""
            }`}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.79199 7.396L10.0003 12.6043L15.2087 7.396"
              stroke=""
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <Dropdown
          className="absolute left-0 top-full z-40 mt-2 w-full rounded-xl border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-700/50 dark:bg-gray-800"
          isOpen={isOpen}
          onClose={closeDropdown}
        >
          <ul className="flex flex-col gap-1">
            {leagues.map((data, index) => (
              <li key={`${data.league}-${index}`}>
                <DropdownItem
                  onItemClick={() => updateSelectedLeague(data.league)}
                  className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50 transition-colors duration-200"
                >
                  <span className="truncate">{data.league.slice(0, 6)}...{data.league.slice(-4)}</span>
                </DropdownItem>
              </li>
            ))}
          </ul>
        </Dropdown>
      </div>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 truncate">
        Connected Wallet: {state.address ? state.address.slice(0, 6) + '...' + state.address.slice(-4) : 'Not Connected'}
      </p>
    </div>
  );
}
