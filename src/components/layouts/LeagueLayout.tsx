"use client";

import React from 'react';
import AuxiliaryHeader from '../AuxiliaryHeader';

interface LeagueLayoutProps {
  children: React.ReactNode;
}

const LeagueLayout: React.FC<LeagueLayoutProps> = ({ children }) => {
  return (
    <>
      <AuxiliaryHeader />
      {children}
    </>
  );
};

export default LeagueLayout; 