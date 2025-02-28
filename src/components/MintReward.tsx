"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TransactionDefault } from "@coinbase/onchainkit/transaction";
import ApiService from '@/services/backend';
import { useGlobalState } from '@/context/GlobalStateContext';
import { useNotification } from '@/context/NotificationContext';
import { getClaimRewardCall } from '../utils/createCallUtils';
import { getUserRewards } from '../utils/onChainReadUtils';
import { ContractCall } from '@/types/state';

interface Reward {
  amount: string;
  name: string;
}

interface OnChainReward {
  name: string;
  amount: bigint;
  nft_image?: string;
}

const MintReward: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [imageData, setImageData] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [rewardPending, setRewardPending] = useState(false);
  const [currentReward, setCurrentReward] = useState<Reward | null>(null);
  const [calls, setCalls] = useState<ContractCall[]>([]);
  const router = useRouter();
  
  const { state } = useGlobalState();
  const { showNotification } = useNotification();
  const [hasLoadedImage, setHasLoadedImage] = useState(false);

  // Check if user has claimable rewards
  useEffect(() => {
    async function checkRewards() {
      if (!state.selectedLeagueAddress || !state.wallet) {
        console.log('Missing required parameters for fetching rewards:', {
          hasLeagueAddress: !!state.selectedLeagueAddress,
          hasWallet: !!state.wallet
        });
        setRewardPending(false);
        setIsInitialLoading(false);
        return;
      }

      try {
        const teamRewards = await getUserRewards(state.selectedLeagueAddress, state.wallet) as OnChainReward[];
        console.log('User Rewards Response:', {
          rewards: teamRewards,
          hasRewards: teamRewards.length > 0,
          timestamp: new Date().toISOString()
        });
        
        setRewardPending(teamRewards.length > 0);
        if (teamRewards.length > 0) {
          setCurrentReward({
            name: teamRewards[0].name,
            amount: teamRewards[0].amount.toString()
          });
          setHasLoadedImage(false); // Reset flag when rewards change
        }
      } catch (error) {
        console.error('Error fetching user rewards:', error);
        setRewardPending(false);
      } finally {
        setIsInitialLoading(false);
      }
    }
    checkRewards();
  }, [state.wallet, state.selectedLeagueAddress]);

  // Load initial image when rewards are available
  useEffect(() => {
    async function loadImage() {
      if (!rewardPending || hasLoadedImage) return;

      setIsLoading(true);
      try {
        const response = await ApiService.readRewardImage();
        console.log('Full API Response:', response);
        console.log('Image response:', {
          hasNftImage: !!response.reward?.nft_image,
          nftImageUrl: response.reward?.nft_image,
          responseKeys: Object.keys(response)
        });
        
        if (!response.reward?.nft_image) {
          throw new Error('No reward image available');
        }
        
        // Fetch the image from the URL and convert to base64
        const imageResponse = await fetch(response.reward.nft_image);
        const blob = await imageResponse.blob();
        const base64data = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });
        
        // Extract the base64 data (remove the data:image/png;base64, prefix)
        const base64String = (base64data as string).split(',')[1];
        setImageData(base64String);
        setHasLoadedImage(true);
      } catch (error: any) {
        console.error('Error fetching initial reward image:', error);
        showNotification({
          variant: 'error',
          title: 'Error',
          description: error.message || 'Failed to fetch initial reward image',
          hideDuration: 5000
        });
      } finally {
        setIsLoading(false);
      }
    }
    loadImage();
  }, [rewardPending, hasLoadedImage]);

  // Update contract calls when image data changes
  useEffect(() => {
    async function fetchCalls() {
      if (state.selectedLeagueAddress && imageData) {
        setCalls([
          getClaimRewardCall(state.selectedLeagueAddress, `data:image/png;base64,${imageData}`),
        ]);
      } else {
        setCalls([]);
      }
    }
    fetchCalls();
  }, [state.selectedLeagueAddress, imageData]);

  const fetchNewImage = async () => {
    setIsLoading(true);
    try {
      const response = await ApiService.getRewardImage(inputValue);
      setImageData(response.image_data);
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

  const handleChange = () => {
    fetchNewImage();
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
            You don't have any claimable rewards at this time.
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
            {currentReward?.name} Wins! 🎉
          </h1>
          <p className="text-gray-300">
            In addition to ${formattedAmount}, you get to generate trophy art.
          </p>
        </div>

        <div className="space-y-8 flex flex-col items-center">
          {/* Reward Image Section */}
          <div className="space-y-4 w-full max-w-[320px]">
            <label className="text-xl text-gray-300 block text-center">Reward Artwork</label>
            <div className="flex flex-col items-center">
              <div className="relative w-full aspect-square bg-gray-800 rounded-lg overflow-hidden">
                {isLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-white/30 border-t-white" />
                  </div>
                ) : (
                  imageData && (
                    <img
                      src={`data:image/png;base64,${imageData}`}
                      alt="Reward Artwork"
                      className="w-full h-full object-contain"
                    />
                  )
                )}
              </div>
              
              {/* Input and Change Button */}
              <div className="w-[140%] -mx-[20%] mt-4 flex gap-2">
                <input 
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1 px-4 py-2 bg-transparent border border-gray-700 rounded-lg text-white focus:border-white focus:outline-none"
                  placeholder="Enter text"
                />
                <button 
                  onClick={handleChange}
                  disabled={isLoading || !inputValue.trim()}
                  className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Change
                </button>
              </div>
            </div>
          </div>

          {/* Claim Reward Button/Transaction */}
          <div className="w-full max-w-[320px]">
            {calls.length > 0 ? (
              <div className="w-[140%] -mx-[20%]">
                <TransactionDefault
                  isSponsored={true}
                  calls={calls}
                />
              </div>
            ) : (
              <button 
                disabled={true}
                className="w-[140%] -mx-[20%] flex items-center justify-center space-x-3 bg-gray-700 hover:bg-gray-600 text-white py-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-xl">Generate Image First</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default MintReward; 