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
    username: string;
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
            if (!response.ok) {
                throw new Error(`API request failed: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error in fetchData:", error);
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
        return this.fetchData<SessionData>("backendApiConnectWallet", {});
    }

    static createLeague(username: string) {
        console.log('Creating league...');
        return this.fetchData<CreateLeagueData>("backendApiCreateLeague", { username });
    }
}

export default ApiService; 