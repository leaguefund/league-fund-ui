export interface League {
    id: string;
    name: string;
    avatar?: string;
    season: string;
    members: number;
    teams: number;
    started: string;
    logo?: string;
}

export interface WalletLeague {
    league: `0x${string}`;
    joined: boolean;
    currentlyActive: boolean;
    name?: string;
}

export interface GlobalState {
    sessionId: string | null;
    username: string | null;
    leagues: League[] | null;
    leagueSelected: `0x${string}` | null;
    email: string | null;
    phone: string | null;
    verified: boolean;
    hydrated: boolean;
    inviteEmails: string[];
    wallet: `0x${string}` | null;
    walletLeagues: WalletLeague[] | null;
}

export type ActionMap = {
    'SET_SESSION_ID': string;
    'SET_USERNAME': string;
    'SET_LEAGUES': League[];
    'SET_EMAIL': string;
    'SET_PHONE': string;
    'SET_VERIFIED': boolean;
    'SET_LEAGUE_SELECTED': League;
    'SET_SELECTED_LEAGUE': League;
    'SET_INVITE_EMAILS': string[];
    'HYDRATE_FROM_STORAGE': GlobalState;
}

export type ActionType = keyof ActionMap;

export type Action = 
  | { type: 'SET_SESSION_ID'; payload: string }
  | { type: 'SET_USERNAME'; payload: string }
  | { type: 'SET_LEAGUES'; payload: League[] }
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_PHONE'; payload: string }
  | { type: 'SET_VERIFIED'; payload: boolean }
  | { type: 'SET_LEAGUE_SELECTED' | 'SET_SELECTED_LEAGUE'; payload: `0x${string}` | null }
  | { type: 'CONNECT_WALLET'; payload: boolean }
  | { type: 'CREATE_LEAGUE'; payload: boolean }
  | { type: 'SET_INVITE_EMAILS'; payload: string[] }
  | { type: 'SET_WALLET_ADDRESS'; payload: `0x${string}` | null }
  | { type: 'SET_WALLET_LEAGUES'; payload: WalletLeague[] | null }
  | { type: 'HYDRATE_FROM_STORAGE'; payload: Partial<GlobalState> };

export const initialState: GlobalState = {
    sessionId: null,
    username: null,
    leagues: null,
    leagueSelected: null,
    email: null,
    phone: null,
    verified: false,
    hydrated: false,
    inviteEmails: [],
    wallet: null,
    walletLeagues: null
}; 