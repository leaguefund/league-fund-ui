"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGlobalState } from '@/context/GlobalStateContext';

const Verification: React.FC = () => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { state, dispatch } = useGlobalState();

  // Redirect if no email or league is selected
  useEffect(() => {
    if (!state.email || !state.selectedLeague) {
      router.push('/request-verification');
    }
  }, [state.email, state.selectedLeague, router]);

  const handleValidate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      dispatch({ type: 'SET_VERIFIED', payload: true });
      router.push('/');
    } catch (error) {
      console.error('Error validating code:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!state.email || !state.selectedLeague) {
    return null;
  }

  return (
    <main className="min-h-screen flex flex-col items-center px-4">
      <div className="max-w-4xl w-full mt-16 space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Enter Verification Code
          </h1>
          <p className="text-xl text-gray-300">
            Check your email for the verification code
          </p>
        </div>

        <div className="space-y-8">
          {/* League Info */}
          <div className="flex flex-col items-center space-y-4">
            <Image
              src={state.selectedLeague.avatar || "/images/trophy.png"}
              alt="League Avatar"
              width={120}
              height={120}
              className="rounded-lg"
            />
            <h2 className="text-2xl font-bold text-white">
              {state.selectedLeague.name}
            </h2>
            <div className="flex items-center space-x-4 text-gray-300">
              <span className="text-lg">
                👥 {state.selectedLeague.members} Members
              </span>
              <span className="text-lg">
                🏆 Season {state.selectedLeague.season}
              </span>
            </div>
          </div>

          {/* Verification Form */}
          <form onSubmit={handleValidate} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xl text-gray-300">Verification Code</label>
              <p className="text-gray-400">
                Code sent to {state.email}
              </p>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-lg text-white focus:border-white focus:outline-none"
                placeholder="Enter verification code"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-3 bg-gray-700 hover:bg-gray-600 text-white py-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-4 border-white/30 border-t-white" />
              ) : (
                <span className="text-xl">Validate</span>
              )}
            </button>
          </form>

          <Link
            href="/request-verification"
            className="w-full text-gray-300 hover:text-white py-4 text-lg transition-colors text-center block"
          >
            ← Choose Different Validation Method
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Verification; 