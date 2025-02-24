import { createCoinbaseWalletSDK } from '@coinbase/wallet-sdk';
 
export const sdk = createCoinbaseWalletSDK({
    appName: "My App",
    appLogoUrl: "https://example.com/logo.png",
    appChainIds: [8453],
    preference: {
        options: "smartWalletOnly",
        attribution: {
            auto: true,
        }
    },
});
 
// Create provider
export const coinbaseProvider = sdk.getProvider();
// Use provider
const addresses = coinbaseProvider.request({method: 'eth_requestAccounts'});