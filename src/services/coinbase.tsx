import { createCoinbaseWalletSDK } from '@coinbase/wallet-sdk';
import { ProviderInterface } from "@coinbase/wallet-sdk";

let sdk;
let coinbaseProvider: ProviderInterface;

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
    coinbaseProvider = sdk.getProvider();
}

export { sdk, coinbaseProvider };
