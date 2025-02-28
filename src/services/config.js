export const env = process.env.NEXT_PUBLIC_NODE_ENV === "production" ? "mainnet" : "testnet";

console.log("NEXT_PUBLIC_NODE_ENV", env)

const config = {
    testnet: {
      // backendHost: "https://run.mocky.io",
      backendHost: "https://league-fund-76860069ad93.herokuapp.com",
      backendApiSleeperUser: "/v1/api/sleeper/username",
      backendApiEmail: "/v3/f9064b97-804c-481a-90a1-de58d912f561",
      backendApiValidateEmail: "/v3/f9064b97-804c-481a-90a1-de58d912f561",
      backendApiLeagueInvite: "/v3/f9064b97-804c-481a-90a1-de58d912f561",
      backendApiWalletRead: "/v3/f9064b97-804c-481a-90a1-de58d912f561",
      backendApiLeagueRead: "/v3/f9064b97-804c-481a-90a1-de58d912f561",
      backendApiCreateLeague: "/v1/api/league/created",
    },
    mainnet: {
      backendHost: "https://api.leaguefund.io",
      backendApiSleeperUser: "/v1/api/sleeper/username",
      backendApiEmail: "/v1/api/email",
      backendApiValidateEmail: "/v1/api/email/validate",
      backendApiLeagueInvite: "/v1/api/league/invite",
      backendApiWalletRead: "/v1/api/wallet/read",
      backendApiLeagueRead: "/v1/api/league/read",
      backendApiCreateLeague: "/v1/api/league/created",
    },
  };

const envConfig = config[env];
export default envConfig;