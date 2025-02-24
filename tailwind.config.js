/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        button: '#333333',
        'button-hover': '#4d4d4d',
      },
      fontFamily: {
        heading: ['var(--font-montserrat)'],
        body: ['var(--font-outfit)'],
      },
    },
  },
  plugins: [],
} 