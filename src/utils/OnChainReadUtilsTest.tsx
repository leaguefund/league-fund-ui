import React, { useState, useEffect } from 'react';
import { getTokenBalance, getLeagueNActiveTeams, getUserLeagues, getLeagueTotalBalance, getLeagueName } from './onChainReadUtils';
import { useAccount } from 'wagmi';

const OnChainReadUtilsTest: React.FC = () => {
  const [tokenAddress, setTokenAddress] = useState<`0x${string}`>('0xa2fc8C407E0Ab497ddA623f5E16E320C7c90C83B');
  const [account, setAccount] = useState<`0x${string}`>('0xE262C1e7c5177E28E51A5cf1C6944470697B2c9F');
  const [leagueAddress, setLeagueAddress] = useState<`0x${string}`>('0x2c2Ff53deC9810D449d9Ea45A669a3614Ff7C3DE');
  const [teamAddress, setTeamAddress] = useState<`0x${string}`>('0xE262C1e7c5177E28E51A5cf1C6944470697B2c9F');

  const { address, isConnected } = useAccount()

  useEffect(() => {
    async function fetchAddress() {
      if (address && isConnected) {
        console.log('Account:', address)
        setAccount(address)
        setTeamAddress(address)
      }
    }
    fetchAddress()
  }, [address, isConnected])

  return (
    <div>
      <h1>OnChain Read Utils Test</h1>
      <div>
        <h2>Token Balance</h2>
        {getTokenBalance(tokenAddress, account)}
      </div>
      <div>
        <h2>League Active Teams</h2>
        <input
          type="text"
          value={leagueAddress}
          onChange={(e) => setLeagueAddress(e.target.value as `0x${string}`)}
          placeholder="League Address"
        />
        {getLeagueNActiveTeams(leagueAddress)}
      </div>
      <div>
        <h2>User Leagues</h2>
        {getUserLeagues(teamAddress).toString()}
      </div>
      <div>
        <h2>League Total Balance</h2>
        <input
          type="text"
          value={leagueAddress}
          onChange={(e) => setLeagueAddress(e.target.value as `0x${string}`)}
          placeholder="League Address"
        />
        {getLeagueTotalBalance(leagueAddress)}
      </div>
      <div>
        <h2>League Name</h2>
        <input
          type="text"
          value={leagueAddress}
          onChange={(e) => setLeagueAddress(e.target.value as `0x${string}`)}
          placeholder="League Address"
        />
        {getLeagueName(leagueAddress)}
      </div>
    </div>
  );
};

export default OnChainReadUtilsTest;