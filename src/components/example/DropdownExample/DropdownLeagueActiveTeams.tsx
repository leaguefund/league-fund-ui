"use client";
import React, { useState, useEffect } from "react";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import { useGlobalState } from '@/context/GlobalStateContext';
import { TeamInfo } from '@/types/state';

interface DropdownLeagueActiveTeamsProps {
  selectedTeam: TeamInfo | null;
  setSelectedTeam: (team: TeamInfo) => void;
}

export default function DropdownLeagueActiveTeams({
  selectedTeam,
  setSelectedTeam,
}: DropdownLeagueActiveTeamsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { state } = useGlobalState();

  useEffect(() => {
    if (state.selectedContractLeague?.activeTeams) {
      // Set Random selected team
      const activeTeams = state.selectedContractLeague.activeTeams;
      // validate team isn't already selected and there are options.
      if (activeTeams.length > 0 && !selectedTeam) {
        // Pluck Random Initial Selected Team
        const randomIndex = Math.floor(Math.random() * activeTeams.length);
        setSelectedTeam(activeTeams[randomIndex]);
      }
    }
  }, [state.selectedContractLeague?.activeTeams, selectedTeam, setSelectedTeam]);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  function updateSelectedTeam(team: TeamInfo) {
    setSelectedTeam(team);
    setIsOpen(false);
  }
  
  return (
    <div className="w-full">
      <div className="relative w-full">
        <button
          onClick={toggleDropdown}
          className="w-full inline-flex items-center justify-between dropdown-toggle gap-2 px-4 py-3 text-sm font-medium text-white rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 transition-colors duration-200"
        >
          <div className="truncate">
            {selectedTeam ? `${selectedTeam.name}` : 'Select Winner'}
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
            {state.selectedContractLeague?.activeTeams?.map((data, index) => (
              <li key={`${data.name}-${index}`}>
                <DropdownItem
                  onItemClick={() => updateSelectedTeam(data)}
                  className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50 transition-colors duration-200"
                >
                  {data.name}
                </DropdownItem>
              </li>
            ))}
          </ul>
        </Dropdown>
      </div>
    </div>
  );
}
