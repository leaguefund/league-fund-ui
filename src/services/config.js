export const env = process.env.NEXT_PUBLIC_NODE_ENV === "production" ? "mainnet" : "testnet";

const config = {
    testnet: {
      backendHost: "https://run.mocky.io",
      backendApiSleeperUser: "/v3/d74af1e5-fd87-41aa-abb9-c4a494a11dce",
      backendApiEmail: "/v3/6c2cae0d-81ee-4712-986e-050a98bfa905",
      backendApiValidateEmail: "/v3/52d1b333-c548-44fa-9cc8-724c5de2759b",
      backendApiLeagueInvite: "/v3/9a695be5-5ebf-4c60-9e24-451356df7c17",
      backendApiWalletRead: "/tbd",
      backendApiLeagueRead: "/tbd",
    },
    mainnet: {
      backendHost: "https://leaguefund.xyz",
      backendApiSleeperUser: "/v1/api/sleeper/username",
      backendApiEmail: "/v1/api/user/email",
      backendApiValidateEmail: "/v1/api/user/validate-email",
      backendApiLeagueInvite: "/v1/api/league/invite",
      backendApiWalletRead: "/v1/api/wallet/read",
      backendApiLeagueRead: "/v1/api/league/read",
    },
  };

const envConfig = config[env];
export default envConfig;