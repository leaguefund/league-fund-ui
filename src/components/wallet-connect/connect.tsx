import { useState } from "react";
import { ethers } from "ethers";
import { coinbaseProvider } from "@/services/coinbase";

const ConnectCoinbaseButton = () => {

  const [walletAddress, setWalletAddress] = useState();

  const connectWallet = async () => {
    try {
      const accounts = await coinbaseProvider.request({
        method: 'eth_requestAccounts',
      });
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
      }
    } catch (error) {
      console.error('Coinbase Wallet connection failed:', error);
    }
  };
  

  return (
    <button
      onClick={connectWallet}
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
    >
      {walletAddress ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "Connect"}
    </button>
  );
};

export default ConnectCoinbaseButton;
