"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGlobalState } from '@/context/GlobalStateContext';

const RequestVerification: React.FC = () => {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const { state, dispatch } = useGlobalState();

  // Redirect if no league is selected
  useEffect(() => {
    if (!state.selectedLeague) {
      router.push('/confirm-league');
    }
    // Pre-fill email if it exists in state
    if (state.email) {
      setEmail(state.email);
    }
  }, [state.selectedLeague, state.email, router]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'SET_EMAIL', payload: email });
    router.push('/verification');
  };

  if (!state.selectedLeague) {
    return null;
  }

  return (
    <main className="min-h-screen flex flex-col items-center px-4">
      <div className="max-w-4xl w-full mt-16 space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Verify League Ownership
          </h1>
          <p className="text-xl text-gray-300">
            We&apos;ll send you a verification code
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

          {/* Email Form */}
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xl text-gray-300">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-lg text-white focus:border-white focus:outline-none"
                placeholder="Enter your email"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-3 bg-gray-700 hover:bg-gray-600 text-white py-6 rounded-lg transition-colors"
            >
              <span className="text-xl">Send Code</span>
            </button>
          </form>

          <Link
            href="/confirm-league"
            className="w-full text-gray-300 hover:text-white py-4 text-lg transition-colors text-center block"
          >
            ← Choose Different League
          </Link>
        </div>
      </div>
    </main>
  );
};

export default RequestVerification; 