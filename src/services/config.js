export const env = process.env.NEXT_PUBLIC_NODE_ENV === "production" ? "mainnet" : "testnet";

console.log("NEXT_PUBLIC_NODE_ENV", env)

const config = {
    testnet: {
      backendHost: "https://league-fund-76860069ad93.herokuapp.com",
      backendApiSleeperUser: "/v1/api/sleeper/username",
      backendApiEmail: "/v3/f9064b97-804c-481a-90a1-de58d912f561",
      backendApiValidateEmail: "/v3/f9064b97-804c-481a-90a1-de58d912f561",
      backendApiLeagueInvite: "/v3/f9064b97-804c-481a-90a1-de58d912f561",
      backendApiWalletRead: "/v3/f9064b97-804c-481a-90a1-de58d912f561",
      backendApiLeagueRead: "/v1/api/league/read",
      backendApiCreateLeague: "/v1/api/league/created",
      backendApiRewardImage: "/v1/api/reward/image",
      backendApiRewardRead: "/v1/api/reward/read",
      backendApiRewardCreated: "/v1/api/reward/created",
    },
    mainnet: {
      backendHost: "https://league-fund-76860069ad93.herokuapp.com",
      backendApiSleeperUser: "/v1/api/sleeper/username",
      backendApiEmail: "/v3/f9064b97-804c-481a-90a1-de58d912f561",
      backendApiValidateEmail: "/v3/f9064b97-804c-481a-90a1-de58d912f561",
      backendApiLeagueInvite: "/v3/f9064b97-804c-481a-90a1-de58d912f561",
      backendApiWalletRead: "/v3/f9064b97-804c-481a-90a1-de58d912f561",
      backendApiLeagueRead: "/v1/api/league/read",
      backendApiCreateLeague: "/v1/api/league/created",
      backendApiRewardImage: "/v1/api/reward/image",
      backendApiRewardRead: "/v1/api/reward/read",
      backendApiRewardCreated: "/v1/api/reward/created",
    },
  };

const envConfig = config[env];
export default envConfig;