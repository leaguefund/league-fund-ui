"use client";
// Load debug utilities first
import '../services/debug';

import { Outfit, Montserrat } from "next/font/google";
import "./globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "simplebar-react/dist/simplebar.min.css";
import "flatpickr/dist/flatpickr.css";
import '@coinbase/onchainkit/styles.css';
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { GlobalStateProvider } from "@/context/GlobalStateContext";
import ClientInitializer from "@/components/ClientInitializer";
import { WagmiProvider } from 'wagmi';
import { config } from "@/config/wagmi";
import { Providers } from "../../providers";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

// Create a client
const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${montserrat.variable} dark:bg-gray-900`}>
        <QueryClientProvider client={queryClient}>
          <WagmiProvider config={config}>
            <Providers> 
            <ThemeProvider>
              <SidebarProvider>
                <ClientInitializer />
                {children}
              </SidebarProvider>
            </ThemeProvider>
            </Providers>
          </WagmiProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
