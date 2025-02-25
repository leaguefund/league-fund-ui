'use client';

import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { GlobalState, Action, initialState } from '@/types/state';

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
    case 'SET_LEAGUE_SELECTED':
    case 'SET_SELECTED_LEAGUE':
      nextState = { ...state, leagueSelected: action.payload };
      if (action.payload) sessionStorage.setItem('leagueSelected', JSON.stringify(action.payload));
      break;
    case 'HYDRATE_FROM_STORAGE':
      nextState = { ...state, ...action.payload, hydrated: true };
      
      // Hydrate simple string values
      const sessionId = sessionStorage.getItem('sessionId');
      const username = sessionStorage.getItem('username');
      const email = sessionStorage.getItem('email');
      const phone = sessionStorage.getItem('phone');
      const verified = sessionStorage.getItem('verified');
      
      if (sessionId) nextState.sessionId = sessionId;
      if (username) nextState.username = username;
      if (email) nextState.email = email;
      if (phone) nextState.phone = phone;
      if (verified) nextState.verified = verified === 'true';

      // Hydrate complex objects
      try {
        const leagues = sessionStorage.getItem('leagues');
        if (leagues) nextState.leagues = JSON.parse(leagues);
        
        const leagueSelected = sessionStorage.getItem('leagueSelected');
        if (leagueSelected) nextState.leagueSelected = JSON.parse(leagueSelected);
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

  useEffect(() => {
    // On mount only - log initial state and hydrate from storage
    if (!state.hydrated) {
      console.group('🚀 Initial State');
      console.log('State:', state);
      console.groupEnd();
      
      const savedState = sessionStorage.getItem('globalState');
      if (savedState) {
        try {
          const parsedState = JSON.parse(savedState);
          dispatch({ type: 'HYDRATE_FROM_STORAGE', payload: parsedState });
        } catch (error) {
          console.error('Error parsing stored state:', error);
        }
      }
    } else {
    console.group('♻ Hydrated App State:');
    console.log('State:', state);
    console.groupEnd();
      // After hydration - save state changes to storage
      sessionStorage.setItem('globalState', JSON.stringify(state));
    }
  }, [state]);

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