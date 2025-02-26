"use client";

import React, { useState, KeyboardEvent } from 'react';
import { useGlobalState } from '@/context/GlobalStateContext';
import Badge from '@/components/ui/badge/Badge';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const InviteTeams: React.FC = () => {
  const { state, dispatch } = useGlobalState();
  const [emailInput, setEmailInput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const email = emailInput.trim();
      
      if (!email) return;

      if (!validateEmail(email)) {
        setError('Please enter a valid email address');
        return;
      }

      if (!state.inviteEmails.includes(email)) {
        const newEmails = [...state.inviteEmails, email];
        dispatch({ type: 'SET_INVITE_EMAILS', payload: newEmails });
        setEmailInput('');
        setError('');
        console.log('Updated invite emails:', newEmails);
      }
    }
  };

  const removeEmail = (emailToRemove: string) => {
    const newEmails = state.inviteEmails.filter(email => email !== emailToRemove);
    dispatch({ type: 'SET_INVITE_EMAILS', payload: newEmails });
    console.log('Updated invite emails after removal:', newEmails);
  };

  const handleSendInvites = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement send invites functionality
      console.log('Sending invites to:', state.inviteEmails);
      // For now, just simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/invites-sent');
    } catch (error) {
      console.error('Error sending invites:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText("https://leaguecontract.xyz/join/0xa2c");
      setCopied(true);
      setTimeout(() => setCopied(false), 5000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center px-4">
      <div className="max-w-4xl w-full mt-16 space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Collect Dues
          </h1>
          <p className="text-xl md:text-2xl text-gray-300">
            Invite other team managers to grow treasury
          </p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <textarea
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter email addresses and press Enter"
              className="w-full min-h-[100px] bg-transparent border border-gray-700 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:border-gray-600"
            />
            {error && (
              <p className="text-error-500 text-sm mt-1">{error}</p>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {state.inviteEmails.map((email) => (
              <Badge
                key={email}
                variant="light"
                color="primary"
                endIcon={
                  <button
                    onClick={() => removeEmail(email)}
                    className="ml-1 flex items-center justify-center"
                  >
                    <Image
                      src="/images/icons/x.png"
                      alt="Remove"
                      width={12}
                      height={12}
                    />
                  </button>
                }
              >
                {email}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <button
            onClick={handleSendInvites}
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-3 bg-gray-700 hover:bg-gray-600 text-white py-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-4 border-white/30 border-t-white" />
            ) : (
              <span className="text-xl">Send Invites</span>
            )}
          </button>

          <div className="space-y-4">
            <p className="text-center text-gray-400">Or, Invite Link</p>
            <div className="flex items-center gap-2 p-4 bg-gray-800 rounded-lg">
              <input
                type="text"
                value="https://leaguecontract.xyz/join/0xa2c"
                readOnly
                className="flex-1 bg-transparent text-gray-300 outline-none"
              />
              <button 
                onClick={copyToClipboard}
                className="text-gray-400 hover:text-white transition-colors p-1.5 rounded hover:bg-gray-700/50"
                title={copied ? "Copied!" : "Copy to clipboard"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  {copied ? (
                    <path d="M20 6L9 17l-5-5" />
                  ) : (
                    <>
                      <rect x="8" y="8" width="12" height="12" rx="2" />
                      <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default InviteTeams; 