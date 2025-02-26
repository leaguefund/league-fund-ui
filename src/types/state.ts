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

export interface GlobalState {
    sessionId: string | null;
    username: string | null;
    leagues: League[] | null;
    leagueSelected: League | null;
    email: string | null;
    phone: string | null;
    verified: boolean;
    hydrated: boolean;
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
    'HYDRATE_FROM_STORAGE': GlobalState;
}

export type ActionType = keyof ActionMap;

export type Action = {
    [K in ActionType]: {
        type: K;
        payload: ActionMap[K];
    }
}[ActionType];

export const initialState: GlobalState = {
    sessionId: null,
    username: null,
    leagues: null,
    leagueSelected: null,
    email: null,
    phone: null,
    verified: false,
    hydrated: false
}; 