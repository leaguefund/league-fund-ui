'use client';
import Link from 'next/link';
import ConnectCoinbaseButton from "@/components/wallet-connect/connect";

export default function ConnectWallet() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <h1 className="text-2xl font-bold text-white">Connect Wallet</h1>
        <p className="text-gray-200 text-center mt-2 ">
          Let's get your wallet connected to handle dues.
        </p>
        <div className="mt-6">
          <img
            src="/images/icons/trophy.png" // Replace with the correct image path
            alt="Trophy"
            className="w-24 h-24"
          />
        </div>
        <h2 className="text-lg font-semibold mt-4 text-gray-200 mb-2">Champions League</h2>
        <ConnectCoinbaseButton />
        <Link href="/" className="mt-4 text-gray-500 text-sm underline">
              Start Over
        </Link>
      </div>
    );
  }
  