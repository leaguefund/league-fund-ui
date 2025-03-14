"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import { useGlobalState } from '@/context/GlobalStateContext';
import { WalletLeague } from '@/types/state';
import SleeperLogo from '@/components/SleeperLogo';
import { useSidebar } from "@/context/SidebarContext";

export default function DropdownLeagues() {
  const [isOpen, setIsOpen] = useState(false);
  const { state, dispatch } = useGlobalState();
  const router = useRouter();
  const { toggleSidebar, toggleMobileSidebar } = useSidebar();

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  function updateSelectedLeague(league: WalletLeague) {
    dispatch({ type: 'SET_SELECTED_CONTRACT_LEAGUE_ADDRESS', payload: league.leagueAddress });
    setIsOpen(false);
    router.push('/league');
    if (window.innerWidth < 991) {
      toggleMobileSidebar();
    } else {
      toggleSidebar();
    }
  }
  
  return (
    <div className="w-full max-w-[280px]">
      <div className="relative w-full">
        <button
          onClick={toggleDropdown}
          className="w-full inline-flex items-center justify-between dropdown-toggle gap-2 px-3 py-3 text-sm font-medium text-white rounded-lg bg-transparent hover:bg-xxbrand-600 transition-colors duration-200"
        >
          <div className="truncate inline-flex">
            <SleeperLogo avatar={state.selectedContractLeague?.avatar} width={20} />

            <span className="ml-2">
              {state.selectedContractLeague?.leagueName || 'Select League'}
            </span>
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
          className="absolute left-0 top-full z-40 mt-2 w-full bg-transparent rounded-xl border border-gray-200 bg-whitexxx p-2 shadow-lg dark:xxxborder-gray-700/50 dark:xxxbg-gray-800"
          isOpen={isOpen}
          onClose={closeDropdown}
        >
          <ul className="flex flex-col gap-1">
            {state.walletLeagues?.map((data, index) => (
              <li key={`${data.leagueName}-${index}`}>
                <DropdownItem
                  onItemClick={() => updateSelectedLeague(data)}
                  className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50 transition-colors duration-200"
                >
                  <span>{data.leagueName}</span><br></br>
                  <span className="truncate">{data.leagueAddress}</span>
                </DropdownItem>
              </li>
            ))}
          </ul>
        </Dropdown>
      </div>
    </div>
  );
}
