/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { TransactionDefault } from "@coinbase/onchainkit/transaction";
import { useRouter } from 'next/navigation';
import ApiService from '@/services/backend';
import { useGlobalState } from '@/context/GlobalStateContext';
import { useNotification } from '@/context/NotificationContext';
import { getClaimRewardCall } from '../utils/createCallUtils';
import { getUserRewards } from '../utils/onChainReadUtils';
import { ContractCall } from '@/types/state';
import sdk from "@farcaster/frame-sdk";
import Image from 'next/image';

interface Reward {
  amount: string;
  name: string;
}

interface OnChainReward {
  name: string;
  amount: bigint;
}

interface RewardResponse {
  status: string;
  message: string;
  reward: {
    web_2_id: number;
    name: string;
    amount_ucsd: string;
    season: string;
    nft_image: string;
    nft_image_history: string[];
    league_name: string;
    league_avatar: string;
    winner_username: string | null;
    winner_wallet: string;
    winner_avatar: string | null;
  };
  other_wallet_rewards: any[];
}

const MintReward: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [rewardPending, setRewardPending] = useState(false);
  const [currentReward, setCurrentReward] = useState<Reward | null>(null);
  const [rewardWeb2Id, setRewardWeb2Id] = useState<number | null>(null);
  const [calls, setCalls] = useState<ContractCall[]>([]);
  
  const { state } = useGlobalState();
  const { showNotification } = useNotification();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    sdk.actions.ready({});
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Check if user has claimable rewards
  useEffect(() => {
    async function checkRewards() {
      if (!state.selectedContractLeagueAddress || !state.wallet) {
        console.log('Missing required parameters for fetching rewards:', {
          hasLeagueAddress: !!state.selectedContractLeagueAddress,
          hasWallet: !!state.wallet
        });
        setRewardPending(false);
        setIsInitialLoading(false);
        return;
      }

      try {
        const teamRewards = await getUserRewards(state.selectedContractLeagueAddress, state.wallet) as OnChainReward[];
        console.log('Raw team rewards data:', teamRewards);
        console.log('First reward full object:', teamRewards[0]);
        console.log('User Rewards Response:', {
          rewards: teamRewards,
          hasRewards: teamRewards.length > 0,
          timestamp: new Date().toISOString()
        });
        
        setRewardPending(teamRewards.length > 0);
        if (teamRewards.length > 0) {
          console.log('Setting current reward:', {
            name: teamRewards[0].name,
            amount: teamRewards[0].amount.toString()
          });
          setCurrentReward({
            name: teamRewards[0].name,
            amount: teamRewards[0].amount.toString()
          });

          // Load initial reward image
          try {
            const response = await ApiService.readRewardImage() as RewardResponse;
            console.log('API Response reward:', response.reward);
            console.log('NFT Image URL from API:', response.reward.nft_image);
            if (response.reward.nft_image) {
              setImageUrl(response.reward.nft_image);
              setRewardWeb2Id(response.reward.web_2_id);
              console.log('Setting image URL in state:', response.reward.nft_image);
            }
          } catch (error) {
            console.error('Error reading initial reward image:', error);
            showNotification({
              variant: 'error',
              title: 'Error',
              description: 'Failed to load reward image',
              hideDuration: 5000
            });
          }
        }
      } catch (error) {
        console.error('Error fetching user rewards:', error);
        setRewardPending(false);
      } finally {
        setIsInitialLoading(false);
      }
    }
    checkRewards();
  }, [state.selectedContractLeagueAddress, state.wallet]);

  // Update contract calls when image data changes
  useEffect(() => {
    async function fetchCalls() {
      if (state.selectedContractLeagueAddress && (imageData || imageUrl)) {
        setCalls([
          getClaimRewardCall(state.selectedContractLeagueAddress, imageData ? `data:image/png;base64,${imageData}` : imageUrl!),
        ]);
      } else {
        setCalls([]);
      }
    }
    fetchCalls();
  }, [state.selectedContractLeagueAddress, imageData, imageUrl]);

  const fetchNewImage = async () => {
    setIsLoading(true);
    try {
      const response = await ApiService.getRewardImage(inputValue, rewardWeb2Id) as RewardResponse;
      setImageUrl(response.reward.nft_image);
      setImageData(null);
    } catch (error: any) {
      console.error('Error generating new reward image:', error);
      showNotification({
        variant: 'error',
        title: 'Error',
        description: error.message || 'Failed to generate new reward image',
        hideDuration: 5000
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoading && inputValue.trim()) {
      fetchNewImage();
    }
  };

  const handleTransactionSuccess = () => {
    localStorage.setItem('selectedTab', 'rewards');
    router.push('/league');
  };

  if (isInitialLoading) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white/30 border-t-white" />
      </main>
    );
  }

  if (!rewardPending) {
    return (
      <main className="min-h-screen flex flex-col items-center px-4">
        <div className="max-w-4xl w-full mt-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            No Rewards Available
          </h1>
          <p className="text-gray-300">
            You don&apos;t have any claimable rewards at this time.
          </p>
        </div>
      </main>
    );
  }

  // Format the amount by removing 'n' and converting to a number
  const formattedAmount = currentReward ? 
    (parseInt(currentReward.amount.replace('n', '')) / 1000000).toString() : 
    '0';

  return (
    <main className="min-h-screen flex flex-col items-center px-4">
      <div className="max-w-4xl w-full mt-16 space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            {currentReward?.name} 🎉
          </h1>
          <h3 className="text-md md:text-2xl font-bolxd text-white">
            Winnings
          </h3>
          <p className="text-gray-300">
            $ {formattedAmount} <Image src="/images/logo/usd-coin-usdc-logo.png" className="inline-flex pl-1 mb-1"
                            alt="Logo"
                            width={24}
                            height={24}
                            />
            <div className="block">Trophy 🏆</div>
          </p>
        </div>

        <div className="space-y-8 flex flex-col items-center">
          {/* Reward Image Section */}
          <div className="space-y-4 w-full max-w-[320px]">
          {/* Load New Image */}
          <div className="space-y-8">
            <div className="relative">
              <button
                onClick={handleSubmit}
                className={`absolute right-0 top-1/2 inline-flex -translate-y-1/2 cursor-pointer items-center gap-1 border-l border-gray-200 py-3 pl-3.5 pr-3 text-sm font-medium text-gray-700 dark:border-gray-800 dark:text-gray-400 ${isLoading ? 'animate-pulse' : ''}`}
              >
                {isLoading ? '🧠' : '✨'}
              </button>
              <input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmit(e);
                  }
                }}
                placeholder="Customize Trophy Artwork"
                type="url"
                className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent py-3 pl-4 pr-[90px] text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              />
            </div>
          </div>
          {/* End new image load */}
            {/* <label className="text-xl text-gray-300 block text-center">Customize Trophy Artwork</label> */}
            <div className="flex flex-col items-center">
              <div className="relative w-full aspect-square bg-gray-800 rounded-lg overflow-hidden">
                {isLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-white/30 border-t-white" />
                  </div>
                ) : imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Reward Artwork"
                    className="w-full h-full object-contain"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                  />
                ) : imageData ? (
                  <img
                    src={`data:image/png;base64,${imageData}`}
                    alt="Reward Artwork"
                    className="w-full h-full object-contain"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                  />
                ) : null}
              </div>

            </div>
          </div>

          {/* Claim Reward Button/Transaction */}
          <div className="w-full max-w-[320px]">
            {(imageUrl || imageData) ? (
              <div className="w-full [&_button]:w-full [&_button]:flex [&_button]:items-center [&_button]:justify-center [&_button]:space-x-3 [&_button]:bg-gray-700 [&_button:hover]:bg-gray-600 [&_button]:text-white [&_button]:py-6 [&_button]:rounded-lg [&_button]:transition-colors [&_button:disabled]:opacity-50 [&_button:disabled]:cursor-not-allowed [&_button_span]:text-xl">
                <TransactionDefault
                  isSponsored={true}
                  calls={calls}
                  onSuccess={handleTransactionSuccess}
                />
              </div>
            ) : (
              <button 
                disabled={true}
                className="w-[140%] -mx-[20%] flex items-center justify-center space-x-3 bg-gray-700 hover:bg-gray-600 text-white py-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-xl">Loading Image...</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default MintReward;