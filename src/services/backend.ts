/* eslint-disable @typescript-eslint/no-explicit-any */
import envConfig from "./config";
import { fetchWithSession } from "./fetch";

type ConfigKey = keyof typeof envConfig;

interface SessionData {
    sessionID?: string;
    sessionExpiry?: string;
}

interface SleeperUserData extends SessionData {
    username: string;
}

interface EmailData extends SessionData {
    email: string;
}

interface LeagueInviteData extends SessionData {
    leagueId: string;
    userId: string;
    role: string;
}

interface CreateLeagueData extends SessionData {
    league_id: string;
    league_address: string;
    league_dues_usdc: string;
}

interface RewardImageData extends SessionData {
    name: string;
    receiver_wallet: string;
    league_address: string;
}

class ApiService {
    static async fetchData<T extends SessionData>(apiEndpoint: ConfigKey, body: T) {
        const url = `${envConfig.backendHost}${envConfig[apiEndpoint]}`;
        
        console.log('=== ApiService.fetchData ===');
        console.log('URL:', url);
        console.log('Body:', body);

        const options: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        };

        console.log('Options before fetchWithSession:', options);

        try {
            const response = await fetchWithSession(url, options);
            console.log('Response status:', response.status);
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || `API request failed: ${response.statusText}`);
            }
            
            return data;
        } catch (error: any) {
            console.error("Error in fetchData:", error);
            if (!error.message) {
                throw new Error('An unexpected error occurred. Please try again.');
            }
            throw error;
        }
    }

    static getSleeperUser(username: string) {
        console.log('Calling getSleeperUser with username:', username);
        return this.fetchData<SleeperUserData>("backendApiSleeperUser", { username });
    }

    static getUserEmail(email: string) {
        return this.fetchData<EmailData>("backendApiEmail", { email });
    }

    static validateEmail(email: string) {
        return this.fetchData<EmailData>("backendApiValidateEmail", { email });
    }

    static readLeague() {
        return this.fetchData<SessionData>("backendApiLeagueRead", {});
    }

    static sendLeagueInvite(data: LeagueInviteData) {
        return this.fetchData<LeagueInviteData>("backendApiLeagueInvite", data);
    }

    static readWallet() {
        return this.fetchData<SessionData>("backendApiWalletRead", {});
    }

    static connectWallet() {
        console.log('Connecting wallet...');
        // return this.fetchData<SessionData>("backendApiConnectWallet", {});
    }

    static createLeague() {
        console.log('Creating league...');
        const selectedLeague = sessionStorage.getItem('selectedLeague')
        const selectedLeagueId = selectedLeague ? JSON.parse(selectedLeague).id : '';
        const data = {
            session_id: sessionStorage.getItem('sessionID'),
            league_id: selectedLeagueId || '',
            league_address: sessionStorage.getItem('leagueAddress') || '',
            league_dues_usdc: sessionStorage.getItem('leagueDues') || ''
        }
        return this.fetchData<CreateLeagueData>("backendApiCreateLeague", data);
    }

    static getRewardImage() {
        console.log('Fetching reward image...');
        const selectedLeague = sessionStorage.getItem('selectedLeague');
        const data = {
            name: sessionStorage.getItem('username') || '',
            receiver_wallet: '',
            league_address: sessionStorage.getItem('leagueAddress') || ''
        }
        return this.fetchData<RewardImageData>("backendApiRewardImage", data);
    }
}

export default ApiService; 