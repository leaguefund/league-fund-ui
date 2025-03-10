/* eslint-disable @typescript-eslint/no-explicit-any */
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
    leagueName: string;
    leagueAddress: `0x${string}`;
    leagueBalance: number;
    joined: boolean;
    currentlyActive: boolean;
    commissioner: boolean;
    treasurer: boolean;
    avatar?: string;
}

export interface TeamInfo {
    name: string;
    wallet: `0x${string}`;
    owner?: boolean;
}

export interface RewardInfo {
    leagueName: string;
    teamName: string;
    rewardName: string;
    usdcAmount: bigint;
    imageData: string;
}

export interface ContractCall {
    address: `0x${string}`;
    abi: any;
    functionName: string;
    args: any[];
}

export interface GlobalState {
    sessionId: string | null;
    username: string | null;
    leagues: League[] | null;
    selectedLeague: League | null;
    selectedSleeperLeague: League | null;
    selectedContractLeague: WalletLeague | null;
    email: string | null;
    phone: string | null;
    verified: boolean;
    hydrated: boolean;
    inviteEmails: string[];
    wallet: `0x${string}` | null;
    walletLeagues: WalletLeague[] | null;
    selectedLeagueAddress: `0x${string}` | null;
    selectedLeagueName: string | null;
    leagueAddress: `0x${string}` | null;
    selectedWalletLeague: `0x${string}` | null;
    selectedSleeperUser: {
        username: string;
        avatar: string | null;
    } | null;
    sleeperLeagues: League[] | null;
}

export type ActionMap = {
    'SET_SESSION_ID': string;
    'SET_USERNAME': string;
    'SET_LEAGUES': League[];
    'SET_SLEEPER_LEAGUES': League[];
    'SET_EMAIL': string;
    'SET_PHONE': string;
    'SET_VERIFIED': boolean;
    'SET_LEAGUE_SELECTED': League;
    'SET_SELECTED_LEAGUE': League;
    'SET_SELECTED_SLEEPER_LEAGUE': League;
    'SET_SELECTED_CONTRACT_LEAGUE': WalletLeague;
    'SET_SELECTED_WALLET_LEAGUE': League;
    'SET_INVITE_EMAILS': string[];
    'HYDRATE_FROM_STORAGE': GlobalState;
}

export type ActionType = keyof ActionMap;

export type Action = 
  | { type: 'SET_SESSION_ID'; payload: string }
  | { type: 'SET_USERNAME'; payload: string }
  | { type: 'SET_LEAGUES'; payload: League[] }
  | { type: 'SET_SLEEPER_LEAGUES'; payload: League[] }
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_PHONE'; payload: string }
  | { type: 'SET_VERIFIED'; payload: boolean }
  | { type: 'SET_LEAGUE_SELECTED' | 'SET_SELECTED_LEAGUE'; payload: League }
  | { type: 'SET_LEAGUE_SLEEPER_SELECTED' | 'SET_SELECTED_SLEEPER_LEAGUE'; payload: League }
  | { type: 'SET_LEAGUE_CONTRACT_SELECTED' | 'SET_SELECTED_CONTRACT_LEAGUE'; payload: WalletLeague }
  | { type: 'CONNECT_WALLET'; payload: boolean }
  | { type: 'CREATE_LEAGUE'; payload: boolean }
  | { type: 'SET_INVITE_EMAILS'; payload: string[] }
  | { type: 'SET_WALLET_ADDRESS'; payload: `0x${string}` | null }
  | { type: 'SET_WALLET_LEAGUES'; payload: WalletLeague[] | null }
  | { type: 'SET_SELECTED_LEAGUE_ADDRESS'; payload: `0x${string}` | null }
  | { type: 'SET_SELECTED_LEAGUE_NAME'; payload: string | null }
  | { type: 'SET_LEAGUE_ADDRESS'; payload: `0x${string}` | null }
  | { type: 'SET_SELECTED_WALLET_LEAGUE'; payload: `0x${string}` | null }
  | { type: 'SET_SELECTED_SLEEPER_USER'; payload: { username: string; avatar: string | null } | null }
  | { type: 'HYDRATE_FROM_STORAGE'; payload: Partial<GlobalState> };

export const initialState: GlobalState = {
    sessionId: null,
    username: null,
    leagues: null,
    selectedLeague: null,
    selectedSleeperLeague: null,
    selectedContractLeague: null,
    email: null,
    phone: null,
    verified: false,
    hydrated: false,
    inviteEmails: [],
    wallet: null,
    walletLeagues: null,
    selectedLeagueAddress: null,
    selectedLeagueName: null,
    leagueAddress: null,
    selectedWalletLeague: null,
    selectedSleeperUser: null,
    sleeperLeagues: null,
};