"use client";
import React, { useState, useEffect } from "react";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import { getUserLeagues, getLeagueTotalBalance, getLeagueNActiveTeams } from '@/utils/onChainReadUtils';
import { useGlobalState } from '@/context/GlobalStateContext';
import { WalletLeague } from '@/types/state';
import SleeperLogo from '@/components/SleeperLogo';

export default function DropdownLeagues() {
  const [isOpen, setIsOpen] = useState(false);
  // const [leagueBalance, setLeagueBalance] = useState<number | null>(null);
  // const [activeTeams, setActiveTeams] = useState<number | null>(null);
  const { state, dispatch } = useGlobalState();
  // const selectedLeague = state.selectedLeague;

  useEffect(() => {
    const fetchLeagues = async () => {
      if (state.wallet) {
        try {
          const userLeagues = await getUserLeagues(state.wallet);
          console.log(state.wallet)
          console.log(userLeagues)
          // Filter out undefined values and ensure type safety
          const validLeagues = userLeagues.filter((league): league is WalletLeague => league !== undefined);
          dispatch({ type: 'SET_WALLET_LEAGUES', payload: validLeagues });
          
          // Initialize with first league if none selected
          if (validLeagues.length > 0 && !state.selectedLeagueAddress) {
            dispatch({ type: 'SET_SELECTED_LEAGUE_NAME', payload: validLeagues[0].leagueName });
            dispatch({ type: 'SET_SELECTED_LEAGUE_ADDRESS', payload: validLeagues[0].leagueAddress });
          }
        } catch (error) {
          console.error('Error fetching leagues:', error);
        }
      } else {
        dispatch({ type: 'SET_WALLET_LEAGUES', payload: null });
        dispatch({ type: 'SET_SELECTED_LEAGUE_NAME', payload: null });
        dispatch({ type: 'SET_SELECTED_LEAGUE_ADDRESS', payload: null });
      }
    };
    fetchLeagues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.wallet, state.selectedLeagueAddress]);

  useEffect(() => {
    const fetchLeagueInfo = async () => {
      if (state.selectedLeagueAddress) {
        try {
          const totalBalance = await getLeagueTotalBalance(state.selectedLeagueAddress);
          const activeTeams = await getLeagueNActiveTeams(state.selectedLeagueAddress);
          console.log('League Balance:', totalBalance);
          console.log('League Teams:', activeTeams);
          // setLeagueBalance(totalBalance);
          // setActiveTeams(activeTeams);
        } catch (error) {
          console.error('Error fetching league info:', error);
        }
      } else {
        // setLeagueBalance(null);
        // setActiveTeams(null);
      }
    };
    fetchLeagueInfo();
  }, [state.selectedLeagueAddress]);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  function updateSelectedLeague(league: WalletLeague) {
    dispatch({ type: 'SET_SELECTED_LEAGUE_NAME', payload: league.leagueName });
    dispatch({ type: 'SET_SELECTED_LEAGUE_ADDRESS', payload: league.leagueAddress });
    setIsOpen(false);
  }
  
  return (
    <div className="w-full max-w-[280px]">
      <div className="relative w-full">
        <button
          onClick={toggleDropdown}
          className="w-full inline-flex items-center justify-between dropdown-toggle gap-2 px-4 py-3 text-sm font-medium text-white rounded-lg bg-transparent hover:bg-xxbrand-600 transition-colors duration-200"
        >
          <div className="truncate">
            <SleeperLogo width={100} />
             {/* src={selectedLeague?.avatar */}

            {state.selectedLeagueName ? `${state.selectedLeagueName}` : 'Select League'}
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
