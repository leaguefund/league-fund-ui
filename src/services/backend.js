import envConfig from "./config";

console.log("test")
  
class ApiService {

static async fetchData(apiEndpoint, method = "GET", body = null) {
    
    const url = `${envConfig.backendHost}${envConfig[apiEndpoint]}`;
    
    const options = {
        method,
            headers: {
                "Content-Type": "application/json",
            },
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`API request failed: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    }

    static getSleeperUser(username) {
        console.log(username)
        return this.fetchData("backendApiSleeperUser");
    }

    static getUserEmail(email) {
        return this.fetchData("backendApiEmail", "POST", { email });
    }

    static validateEmail(email) {
        return this.fetchData("backendApiValidateEmail", "POST", { email });
    }

    static sendLeagueInvite(data) {
        return this.fetchData("backendApiLeagueInvite", "POST", data);
    }

    static readWallet() {
        return this.fetchData("backendApiWalletRead");
    }

    static readLeague() {
        return this.fetchData("backendApiLeagueRead");
    }
}

export default ApiService;
  