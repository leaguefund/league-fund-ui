"use client";

import { useGlobalState } from '@/context/GlobalStateContext';
import NFTCard from "@/components/cards/card-with-image/NFTCard";
import Button from "@/components/ui/button/Button";

const LeagueRewards: React.FC = () => {

  const { state } = useGlobalState();

  if (!((state.selectedContractLeague?.leagueRewards?.length ?? 0) > 0)) {
    return (
      <main className="min-h-screen flex flex-col items-center px-4">
        <div>
          <h5>Empty Trophy Wall 😴</h5>
          <br></br>
          <a href="/allocate-reward" >
            <Button size="sm" variant="primary">
              Distribute First Reward
            </Button>
            </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center px-4">
      {(state.selectedContractLeague?.activeTeams?.length ?? 0) > 0 && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {state.selectedContractLeague?.leagueRewards.map((reward, index) => (
              <NFTCard
              key={index}
              imageSrc={reward.imageData}
              title={reward.rewardName}
              description={
                <>
                <span>Winner: {reward.teamName}</span>
                <br />
                <span>Amount: {Number(reward.usdcAmount) / 1e6} USDC</span>
                </>
              }
              />
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default LeagueRewards;