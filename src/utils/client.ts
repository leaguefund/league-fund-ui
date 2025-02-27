import { createPublicClient, createWalletClient, http, custom } from 'viem'
import { baseSepolia } from 'viem/chains'
 
export const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(),
})
 
// eg: Metamask
export const walletClient = typeof window !== 'undefined' && window.ethereum ? createWalletClient({
  chain: baseSepolia,
  transport: custom(window.ethereum),
}) : null;