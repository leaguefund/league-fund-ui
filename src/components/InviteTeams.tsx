"use client";

import React, { useState, KeyboardEvent } from 'react';
import { useGlobalState } from '@/context/GlobalStateContext';
import Badge from '@/components/ui/badge/Badge';
import { CloseIcon } from '@/icons';
import Link from 'next/link';

const InviteTeams: React.FC = () => {
  const { state } = useGlobalState();
  const [emailInput, setEmailInput] = useState('');
  const [emails, setEmails] = useState<string[]>([]);
  const [error, setError] = useState('');

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

      if (!emails.includes(email)) {
        setEmails([...emails, email]);
        setEmailInput('');
        setError('');
      }
    }
  };

  const removeEmail = (emailToRemove: string) => {
    setEmails(emails.filter(email => email !== emailToRemove));
  };

  const handleSendInvites = () => {
    // TODO: Implement send invites functionality
    console.log('Sending invites to:', emails);
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
            {emails.map((email) => (
              <Badge
                key={email}
                variant="light"
                color="primary"
                endIcon={
                  <button
                    onClick={() => removeEmail(email)}
                    className="ml-1 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    <CloseIcon />
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
            className="w-full flex items-center justify-center space-x-3 bg-gray-700 hover:bg-gray-600 text-white py-6 rounded-lg transition-colors"
          >
            <span className="text-xl">Send Invites</span>
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
              <button className="text-gray-400 hover:text-white">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-current"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6 4C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6ZM18 6H6V18H18V6Z"
                  />
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