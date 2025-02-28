"use client";

import React from 'react';

interface LeagueLayoutProps {
  children: React.ReactNode;
}

const LeagueLayout: React.FC<LeagueLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex-1 min-h-0">
        {children}
      </div>
    </div>
  );
};

export default LeagueLayout; 