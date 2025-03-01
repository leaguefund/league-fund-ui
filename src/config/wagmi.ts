import { createConfig, http } from 'wagmi'
import { baseSepolia } from 'wagmi/chains'
import { coinbaseWallet } from 'wagmi/connectors'
import { farcasterFrame } from "@farcaster/frame-wagmi-connector";

export const config = createConfig({
  chains: [baseSepolia],
  connectors: [coinbaseWallet(), farcasterFrame()], 
  transports: {
    [baseSepolia.id]: http(),
  },
})