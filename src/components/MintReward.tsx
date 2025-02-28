"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ApiService from '@/services/backend';
import { useGlobalState } from '@/context/GlobalStateContext';
import { useNotification } from '@/context/NotificationContext';

const MintReward: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageData, setImageData] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('Pengiun');
  const router = useRouter();
  
  const { state } = useGlobalState();
  const { showNotification } = useNotification();

  const fetchRewardImage = async () => {
    setIsLoading(true);
    try {
      const response = await ApiService.getRewardImage();
      setImageData(response.image_data);
    } catch (error: any) {
      console.error('Error fetching reward image:', error);
      showNotification({
        variant: 'error',
        title: 'Error',
        description: error.message || 'Failed to fetch reward image',
        hideDuration: 5000
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRewardImage();
  }, []);

  const handleChange = () => {
    fetchRewardImage();
  };

  const handleClaimReward = async () => {
    // Stub for future functionality
    console.log('Claim reward functionality will be implemented here');
  };

  return (
    <main className="min-h-screen flex flex-col items-center px-4">
      <div className="max-w-4xl w-full mt-16 space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Victory 🎉
          </h1>
          <p className="text-gray-300">
            In addition to $900 you get to generate trophy art
          </p>
        </div>

        <div className="space-y-8">
          {/* Reward Image Section */}
          <div className="space-y-4">
            <label className="text-xl text-gray-300">Reward Artwork</label>
            <div className="flex flex-col items-center">
              <div className="relative w-full max-w-[400px] aspect-square bg-gray-800 rounded-lg overflow-hidden">
                {isLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-white/30 border-t-white" />
                  </div>
                ) : (
                  imageData && (
                    <img
                      src={`data:image/png;base64,${imageData}`}
                      alt="Reward Artwork"
                      className="w-full h-full object-cover"
                    />
                  )
                )}
              </div>
              
              {/* Input and Change Button */}
              <div className="w-full max-w-[400px] mt-4 flex gap-2">
                <input 
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1 px-4 py-2 bg-transparent border border-gray-700 rounded-lg text-white focus:border-white focus:outline-none"
                  placeholder="Enter text"
                />
                <button 
                  onClick={handleChange}
                  disabled={isLoading}
                  className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Change
                </button>
              </div>
            </div>
          </div>

          {/* Claim Reward Button */}
          <button 
            onClick={handleClaimReward}
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-3 bg-gray-700 hover:bg-gray-600 text-white py-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="text-xl">Claim Reward NFT</span>
          </button>
        </div>
      </div>
    </main>
  );
};

export default MintReward; 