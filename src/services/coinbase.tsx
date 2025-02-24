import { createCoinbaseWalletSDK } from '@coinbase/wallet-sdk';

let sdk, coinbaseProvider;

if (typeof window !== "undefined") {
    sdk = createCoinbaseWalletSDK({
        appName: "My App",
        appLogoUrl: "https://example.com/logo.png",
        appChainIds: [8453],
        preference: {
            options: "smartWalletOnly",
            attribution: {
                auto: true,
            },
        },
    });

    // Create provider
    coinbaseProvider = sdk.getProvider();
}

export { sdk, coinbaseProvider };
