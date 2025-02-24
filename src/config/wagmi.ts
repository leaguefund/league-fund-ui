import { createConfig, http } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { coinbaseWallet } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [coinbaseWallet()], 
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})