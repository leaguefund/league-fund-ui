import React from 'react';
import Image from 'next/image';
import { League } from '@/types/state';

interface LeagueDetailsProps {
  selectedLeague: League;
}

const LeagueDetails: React.FC<LeagueDetailsProps> = ({ selectedLeague }) => {
  return (
    <div className="max-w-4xl w-full mt-20 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl text-white">
          {selectedLeague.name}
        </h1>
        <div className="flex flex-col mt-4 items-center space-y-4">
          <Image 
            src={selectedLeague.avatar || "/images/placeholder.png"}
            alt="League Avatar" 
            width={120} 
            height={120}
            className="rounded-full mt-4"
          />
        </div>
      </div>
    </div>
  );
};

export default LeagueDetails;
