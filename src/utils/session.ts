const SESSION_KEY = 'sessionID';
const EXPIRY_KEY = 'sessionExpiry';
const EXPIRY_DAYS = 7;

// Define the type for our debug commands
interface SessionDebug {
  shortenExpiry: () => void;
  clearSession: () => void;
  viewSession: () => void;
}

// Extend the Window interface
declare global {
  interface Window {
    sessionDebug?: SessionDebug;
  }
}

export const initializeSession = () => {
  // Only run on client side
  if (typeof window === 'undefined') return;

  const existingSession = sessionStorage.getItem(SESSION_KEY);
  const existingExpiry = sessionStorage.getItem(EXPIRY_KEY);

  // Check if session exists and is not expired
  if (existingSession && existingExpiry) {
    const expiryDate = new Date(existingExpiry);
    if (expiryDate > new Date()) {
      return; // Session exists and is valid
    }
  }

  // Create new session
  const sessionID = generateSessionID();
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + EXPIRY_DAYS);

  sessionStorage.setItem(SESSION_KEY, sessionID);
  sessionStorage.setItem(EXPIRY_KEY, expiryDate.toISOString());
};

const generateSessionID = () => {
  return 'sid_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
};

// Debug utilities
const debugCommands = {
  shortenExpiry: () => {
    const expiryDate = new Date();
    expiryDate.setSeconds(expiryDate.getSeconds() + 5);
    sessionStorage.setItem(EXPIRY_KEY, expiryDate.toISOString());
    console.log('Session will expire in 5 seconds (at:', expiryDate.toLocaleString() + ')');
  },

  clearSession: () => {
    sessionStorage.clear();
    console.log('Session storage cleared');
  },

  viewSession: () => {
    const sessionID = sessionStorage.getItem(SESSION_KEY);
    const expiry = sessionStorage.getItem(EXPIRY_KEY);
    console.log('Current Session:', {
      sessionID,
      expiry: expiry ? new Date(expiry).toLocaleString() : null,
      isExpired: expiry ? new Date(expiry) < new Date() : null
    });
  }
};

// Make debug commands available globally in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  window.sessionDebug = debugCommands;
} 