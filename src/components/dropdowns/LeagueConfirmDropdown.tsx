"use client";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import React, { useState, useEffect } from "react";
import { useGlobalState } from '@/context/GlobalStateContext';
import { League } from '@/types/state';

const LeagueConfirmDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { state, dispatch } = useGlobalState();
  const [selectedSleeperLeague, setSelectedSleeperLeague] = useState<League | null>(null);
  // const [selectedLeague, setSelectedLeague] = useState<League | null>(null);

  // If no leagues in state, go back to sleeper username page
  useEffect(() => {

    console.log("Sleeper Leagues Found 1");
    console.log(state);
    console.log(selectedSleeperLeague);
    console.log("Sleeper Leagues Found 2");

    if (!state.sleeperLeagues || state.sleeperLeagues.length === 0) {
      console.log("No Sleeper Leagues Found ❌");
      // router.push('/sleeper-username');
      return;
    }

    // Handle League Change
    if (!selectedSleeperLeague && state.selectedSleeperLeague) {
      console.log("Sleeper League Change (already set)");
      handleLeagueChange(state.selectedSleeperLeague);
    } else if (!selectedSleeperLeague && state.sleeperLeagues.length > 0) {
      console.log("Sleeper League Change (first sleeper league)");
      handleLeagueChange(state.sleeperLeagues[0]);
    }

  }, [state.sleeperLeagues, selectedSleeperLeague, dispatch]);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  // Handle Sleeper League Change
  const handleLeagueChange = (league: League) => {
    setSelectedSleeperLeague(league);
    // Update global state and sessionStorage with the new selection
    dispatch({ type: 'SET_SELECTED_SLEEPER_LEAGUE', payload: league });
  };

  // Return Early if no selected League 
  if (!selectedSleeperLeague) return null;
  
  return (
    <div className="relative xxw-full">

      <button
        onClick={toggleDropdown}
        className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-lg inline-flex justify-between dropdown-toggle gap-2 text-sm font-medium text-white focus:outline-none"
      >
        {selectedSleeperLeague.name}
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
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute left-0 top-full z-40 mt-2 w-full min-w-[260px] rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-[#1E2635]"
      >
        <ul className="flex flex-col gap-1">
          {state.sleeperLeagues?.map((league) => (
            <li key={league.name}>
              <DropdownItem
                onItemClick={() => {
                  closeDropdown();
                  handleLeagueChange(league);
                }}
                className="flex rounded-lg px-3 py-2.5 text-sm font-medium
                text-gray-700 hover:bg-gray-100 dark:text-gray-300
                dark:hover:bg-white/5"
              >
                {league.name}
              </DropdownItem>
            </li>
          ))}
        </ul>
      </Dropdown>
    </div>
  );
};

export default LeagueConfirmDropdown;
