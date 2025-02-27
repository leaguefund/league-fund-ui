"use client";
import React, { useState, useEffect } from "react";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import { getTokenBalance, getLeagueNActiveTeams, getUserLeagues, getLeagueTotalBalance, getLeagueName } from '@/utils/onChainReadUtils';
import Avatar from "@/components/ui/avatar/Avatar";
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
      } catch (error) {
        console.error('Error fetching leagues:', error);
      }
    };
    fetchLeagues();
  }, [teamAddress]);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  function updateSelectedLeague(address: `0x${string}`) {
    console.log("Selected league:", address);
    setIsOpen(false);
  }
  
  return (
    <div className="relative inline-block text-gray-400">
      <button
        onClick={toggleDropdown}
        className="inline-flex items-center dropdown-toggle gap-2 px-4 py-3 text-sm font-medium text-white rounded-lg bg-brand-500 hover:bg-brand-600"
      >
        Account Menu
        <svg
          className={`duration-200 ease-in-out stroke-current ${
            isOpen ? "rotate-180" : ""
          }`}
          width="20"
          height="20"
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
        className="absolute left-0 top-full z-40 mt-2 w-full min-w-[260px] rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-[#1E2635]"
        isOpen={isOpen}
        onClose={closeDropdown}
      >
        <ul className="flex flex-col gap-1">
          {leagues.map((data, index) => (
            <li key={`${data.league}-${index}`}>
              <DropdownItem
                onItemClick={() => updateSelectedLeague(data.league)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-white/5"
              >
                {data.league}
              </DropdownItem>
            </li>
          ))}
        </ul>
      </Dropdown>
    </div>
  );
}
