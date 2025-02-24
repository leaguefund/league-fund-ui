/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        button: '#1a1a1a',
        'button-hover': '#333333',
      },
    },
  },
  plugins: [],
} 