export {};

declare global {
  interface Window {
    SkipAPI: () => void;
  }
}

// Navigation map for the flow
const navigationMap: { [key: string]: string } = {
  '/': '/sleeper-username',
  '/sleeper-username': '/confirm-league',
  '/confirm-league': '/request-verification',
  '/request-verification': '/verification',
  '/verification': '/dashboard',
  'default': '/sleeper-username'
};

// Make SkipAPI available globally
if (typeof window !== 'undefined') {
  (window as any).SkipAPI = function() {
    const currentPath = window.location.pathname;
    const nextPath = navigationMap[currentPath] || navigationMap['default'];
    console.log(`🐛 Skipping API and navigating to: ${nextPath}`);
    window.location.href = nextPath;
  };
  console.log('🐛 Debug command ready: Type SkipAPI() to navigate through pages');
} 