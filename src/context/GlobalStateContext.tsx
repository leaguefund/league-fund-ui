'use client';

import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { GlobalState, Action, initialState } from '@/types/state';
import { useAccount } from 'wagmi';
import ApiService from '@/services/backend';
import { getLeagueName, getLeagueTotalBalance } from '@/utils/onChainReadUtils';
import { WalletLeague } from '@/types/state';

const GlobalStateContext = createContext<{
  state: GlobalState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Debug logger for state changes
const logStateChange = (action: Action, prevState: GlobalState, nextState: GlobalState) => {
  console.group(`🔄 State Change: ${action.type}`);
  console.log('Payload:', 'payload' in action ? action.payload : 'No payload');
  console.log('Previous State:', prevState);
  console.log('Next State:', nextState);
  console.log('Changed Keys:', Object.keys(nextState).filter(key => nextState[key as keyof GlobalState] !== prevState[key as keyof GlobalState]));
  console.groupEnd();
};

function reducer(state: GlobalState, action: Action): GlobalState {
  let nextState: GlobalState;

  switch (action.type) {
    case 'SET_SESSION_ID':
      nextState = { ...state, sessionId: action.payload };
      sessionStorage.setItem('sessionId', action.payload);
      break;
    case 'SET_USERNAME':
      nextState = { ...state, username: action.payload };
      if (action.payload) sessionStorage.setItem('username', action.payload);
      break;
    case 'SET_LEAGUES':
      nextState = { ...state, leagues: action.payload };
      if (action.payload) sessionStorage.setItem('leagues', JSON.stringify(action.payload));
      break;
    case 'SET_SLEEPER_LEAGUES':
      nextState = { ...state, sleeperLeagues: action.payload };
      if (action.payload) sessionStorage.setItem('sleeperLeagues', JSON.stringify(action.payload));
      break;
    case 'SET_EMAIL':
      nextState = { ...state, email: action.payload };
      if (action.payload) sessionStorage.setItem('email', action.payload);
      break;
    case 'SET_PHONE':
      nextState = { ...state, phone: action.payload };
      if (action.payload) sessionStorage.setItem('phone', action.payload);
      break;
    case 'SET_VERIFIED':
      nextState = { ...state, verified: action.payload };
      sessionStorage.setItem('verified', String(action.payload));
      break;
    case 'SET_SELECTED_LEAGUE':
      nextState = { ...state, selectedLeague: action.payload };
      if (action.payload) sessionStorage.setItem('selectedLeague', JSON.stringify(action.payload));
      break;
    case 'SET_SELECTED_SLEEPER_LEAGUE':
      nextState = { ...state, selectedSleeperLeague: action.payload };
      if (action.payload) sessionStorage.setItem('selectedSleeperLeague', JSON.stringify(action.payload));
      break;
    case 'SET_SELECTED_CONTRACT_LEAGUE':
      nextState = { ...state, selectedContractLeague: action.payload as WalletLeague | null };
      if (action.payload) sessionStorage.setItem('selectedContractLeague', JSON.stringify(action.payload));
      break; // Add this break statement
    case 'SET_SELECTED_CONTRACT_LEAGUE_ADDRESS':
      nextState = { ...state, selectedContractLeagueAddress: action.payload as `0x${string}` };
      if (action.payload) sessionStorage.setItem('selectedContractLeagueAddress', action.payload as string);
      break;
    case 'SET_SELECTED_WALLET_LEAGUE':
      nextState = { ...state, selectedWalletLeague: action.payload };
      if (action.payload) sessionStorage.setItem('selectedWalletLeague', JSON.stringify(action.payload));
      break;
    case 'SET_INVITE_EMAILS':
      nextState = { ...state, inviteEmails: action.payload };
      sessionStorage.setItem('inviteEmails', JSON.stringify(action.payload));
      break;
    case 'SET_WALLET_ADDRESS':
      nextState = { ...state, wallet: action.payload };
      break;
    case 'SET_WALLET_LEAGUES':
      nextState = { ...state, walletLeagues: action.payload };
      break;
    case 'SET_SELECTED_LEAGUE_ADDRESS':
      nextState = { ...state, selectedLeagueAddress: action.payload };
      break;  
    case 'SET_LEAGUE_ADDRESS':
      nextState = { ...state, leagueAddress: action.payload };
      if (action.payload) sessionStorage.setItem('leagueAddress', action.payload);
      break;
    case 'SET_SELECTED_WALLET_LEAGUE':
      nextState = { ...state, selectedWalletLeague: action.payload };
      if (action.payload) sessionStorage.setItem('selectedWalletLeague', action.payload);
      break;
    case 'HYDRATE_FROM_STORAGE':
      nextState = { ...state, ...action.payload, hydrated: true };
      
      // Hydrate simple string values
      const sessionId = sessionStorage.getItem('sessionId');
      const username = sessionStorage.getItem('username');
      const email = sessionStorage.getItem('email');
      const phone = sessionStorage.getItem('phone');
      const verified = sessionStorage.getItem('verified');
      const inviteEmails = sessionStorage.getItem('inviteEmails');
      const leagueAddress = sessionStorage.getItem('leagueAddress') as `0x${string}` | null;
      const selectedContractLeagueAddress = sessionStorage.getItem('selectedContractLeagueAddress') as `0x${string}` | null;

      const selectedWalletLeague = sessionStorage.getItem('selectedWalletLeague') as `0x${string}` | null;
      const selectedContractLeague = sessionStorage.getItem('selectedContractLeague');
      
      if (sessionId) nextState.sessionId = sessionId;
      if (username) nextState.username = username;
      if (email) nextState.email = email;
      if (phone) nextState.phone = phone;
      if (verified) nextState.verified = verified === 'true';
      if (selectedContractLeagueAddress?.startsWith('0x')) nextState.selectedContractLeagueAddress = selectedContractLeagueAddress as `0x${string}`;
      if (leagueAddress?.startsWith('0x')) nextState.leagueAddress = leagueAddress as `0x${string}`;
      if (selectedWalletLeague?.startsWith('0x')) nextState.selectedWalletLeague = selectedWalletLeague as `0x${string}`;
      if (inviteEmails) {
        try {
          nextState.inviteEmails = JSON.parse(inviteEmails);
        } catch (error) {
          console.error('Error parsing stored inviteEmails:', error);
          nextState.inviteEmails = [];
        }
      }

      // Hydrate complex objects
      try {
        const leagues = sessionStorage.getItem('leagues');
        if (leagues) nextState.leagues = JSON.parse(leagues);

        const sleeperLeagues = sessionStorage.getItem('sleeperLeagues');
        if (sleeperLeagues) nextState.leagues = JSON.parse(sleeperLeagues);
        
        const selectedSleeperLeague = sessionStorage.getItem('selectedSleeperLeague');
        if (selectedSleeperLeague) nextState.selectedSleeperLeague = JSON.parse(selectedSleeperLeague);
        
        if (selectedContractLeague) nextState.selectedContractLeague = JSON.parse(selectedContractLeague) as WalletLeague;
        
        // const selectedWalletLeague = sessionStorage.getItem('selectedWalletLeague');
        // if (selectedSleeperLeague) nextState.selectedWalletLeague = JSON.parse(selectedWalletLeague);
        
        const selectedLeague = sessionStorage.getItem('selectedLeague');
        if (selectedLeague) nextState.selectedLeague = JSON.parse(selectedLeague);
      } catch (error) {
        console.error('Error parsing stored JSON:', error);
      }
      break;
    default:
      return state;
  }

  // Log state change
  logStateChange(action, state, nextState);
  return nextState;
}

export function GlobalStateProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { address, isConnected } = useAccount();

  // Watch for wallet address changes
  useEffect(() => {
    if(address) { 
      console.log('Wallet connected!')
      dispatch({ type: 'SET_WALLET_ADDRESS', payload: address });
    } else {
      console.log('Wallet NOT connected.')
      dispatch({ type: 'SET_WALLET_ADDRESS', payload: null });
    }
  }, [address, dispatch]);

  // Handle state hydration and storage
  useEffect(() => {
    // On mount only - log initial state and hydrate from storage
    if (!state.hydrated) {
      console.group('🚀 Initial State');
      console.log('State:', state);
      console.groupEnd();
      
      // Selected Contract
      const selectedContractLeagueAddress = sessionStorage.getItem('selectedContractLeagueAddress');
      const selectedContractLeague = sessionStorage.getItem('selectedContractLeague');
      
      // Hydrate from individual storage items
      const username = sessionStorage.getItem('username');
      const leagues = sessionStorage.getItem('leagues');
      const sleeperLeagues = sessionStorage.getItem('sleeperLeagues');
      const email = sessionStorage.getItem('email');
      const phone = sessionStorage.getItem('phone');
      const verified = sessionStorage.getItem('verified');
      const selectedLeague = sessionStorage.getItem('selectedLeague');
      const selectedSleeperLeague = sessionStorage.getItem('selectedSleeperLeague');
      const selectedWalletLeague = sessionStorage.getItem('selectedWalletLeague');
      const sessionId = sessionStorage.getItem('sessionId');
      const selectedLeagueAddress = sessionStorage.getItem('selectedLeagueAddress');
      
      // const selectedWalletLeague = sessionStorage.getItem('selectedWalletLeague');

      const hydratedState = {
        ...initialState,
        hydrated: true,
        selectedContractLeagueAddress: (selectedContractLeagueAddress?.startsWith('0x') ? selectedContractLeagueAddress as `0x${string}` : null),
        selectedContractLeague: selectedContractLeague ? JSON.parse(selectedContractLeague) as WalletLeague : null,
        username: username || null,
        email: email || null,
        phone: phone || null,
        verified: verified === 'true',
        sessionId: sessionId || null,
        leagues: [],
        sleeperLeagues: [],
        selectedLeague: null,
        selectedSleeperLeague: null,
        // selectedWalletLeague: null,
        wallet: address || null,
        selectedLeagueAddress: (selectedLeagueAddress?.startsWith('0x') ? selectedLeagueAddress as `0x${string}` : null),
        selectedWalletLeague: (selectedWalletLeague?.startsWith('0x') ? selectedWalletLeague as `0x${string}` : null),
      };

      try {
        if (leagues) hydratedState.leagues = JSON.parse(leagues);
        if (sleeperLeagues) hydratedState.sleeperLeagues = JSON.parse(sleeperLeagues);
        if (selectedLeague) hydratedState.selectedLeague = JSON.parse(selectedLeague);
        if (selectedSleeperLeague) hydratedState.selectedSleeperLeague = JSON.parse(selectedSleeperLeague);
      } catch (error) {
        console.error('Error parsing stored JSON:', error);
      }
      
      dispatch({ type: 'HYDRATE_FROM_STORAGE', payload: hydratedState });

    } else {
      // After any state change - log and save to storage
      console.group('♻️ Updated App State:');
      console.log('State:', state);
      console.groupEnd();
      
      // Save selected League
      if (state.selectedContractLeagueAddress) sessionStorage.setItem('selectedContractLeagueAddress', state.selectedContractLeagueAddress);
      if (state.selectedContractLeague) sessionStorage.setItem('selectedContractLeague', JSON.stringify(state.selectedContractLeague));

      // Save individual items to storage
      if (state.username) sessionStorage.setItem('username', state.username);
      if (state.leagues) sessionStorage.setItem('leagues', JSON.stringify(state.leagues));
      if (state.email) sessionStorage.setItem('email', state.email);
      if (state.phone) sessionStorage.setItem('phone', state.phone);
      if (state.verified !== undefined) sessionStorage.setItem('verified', String(state.verified));
      if (state.selectedLeague) sessionStorage.setItem('selectedLeague', JSON.stringify(state.selectedLeague));
      if (state.selectedSleeperLeague) sessionStorage.setItem('selectedSleeperLeague', JSON.stringify(state.selectedSleeperLeague));
      if (state.sessionId) sessionStorage.setItem('sessionId', state.sessionId);
      if (address && isConnected) sessionStorage.setItem('wallet', address);
      if (state.selectedLeagueAddress) sessionStorage.setItem('selectedLeagueAddress', state.selectedLeagueAddress);
      if (state.selectedWalletLeague) sessionStorage.setItem('selectedWalletLeague', state.selectedWalletLeague);
    }
  }, [state, address, isConnected]);

  useEffect(() => {
    const initializeAndFetchContractLeague = async (address: `0x${string}`) => {
      console.log("🌱 initializeAndFetchContractLeague", address);
      let initialContractLeague: WalletLeague = {
        leagueAddress: address,
        leagueName: '',
        leagueBalance: 0,
        joined: false,
        currentlyActive: false,
        commissioner: false,
        treasurer: false,
        sleeperTeams: []
      };

      // Initialize Selected Contract League
      if (address !== state.selectedContractLeague?.leagueAddress) {
        console.log("🌱 address mismatch", state.selectedContractLeague?.leagueAddress);
        dispatch({ type: 'SET_SELECTED_CONTRACT_LEAGUE', payload: initialContractLeague });
      }

      // Fetch Backend Data
      try {
        const leagueData = await ApiService.readLeague(address);
        console.log("📞 leagueData", leagueData);
        initialContractLeague = {
          ...initialContractLeague,
          avatar: leagueData.league.avatar,
          sleeperTeams: leagueData.league.sleeper_teams
        };
        console.log("📞 Dispatch avatar & sleeper_teams", initialContractLeague);
        dispatch({ type: 'SET_SELECTED_CONTRACT_LEAGUE', payload: initialContractLeague });
      } catch (error) {
        console.error('📞 Error fetching league data:', error);
      }

      // Fetch Onchain Data
      try {
        const name = await getLeagueName(address);
        const balance = await getLeagueTotalBalance(address);
        initialContractLeague = {
          ...initialContractLeague,
          leagueName: name,
          leagueBalance: balance
        };
        console.log("⛓️ Dispatch name & balance", initialContractLeague);
        dispatch({ type: 'SET_SELECTED_CONTRACT_LEAGUE', payload: initialContractLeague });
      } catch (error) {
        console.error('⛓️ Error fetching league info:', error);
      }
    };

    if (state.selectedContractLeagueAddress) {
      initializeAndFetchContractLeague(state.selectedContractLeagueAddress);
    }

  }, [state.selectedContractLeagueAddress]);

  // Don't render anything until state is hydrated
  if (!state.hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-white/30 border-t-white" />
      </div>
    );
  }

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
}

export function useGlobalState() {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
}