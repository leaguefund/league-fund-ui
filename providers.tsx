'use client';
 
import type { ReactNode } from 'react';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { baseSepolia } from 'wagmi/chains'; // add baseSepolia for testing 
 
export function Providers(props: { children: ReactNode }) {
  return (
    <OnchainKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      chain={baseSepolia}
      projectId={process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_ID}
      config={{ 
        appearance: {
          name: 'League Fund',
          mode: 'auto',
        },
        paymaster: process.env.NEXT_PUBLIC_ONCHAINKIT_PAYMASTER_ENDPOINT, 
      }}
    >
      {props.children}
    </OnchainKitProvider>
  );
}