/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4CAF4F',
        secondary: '#263238',
        dark: '#18191F',
        light: '#F5F7FA',
        gray: {
          100: '#F5F5F5',
          200: '#E6E6E6',
          300: '#D9DBE1',
          400: '#89939E',
          500: '#717171',
          600: '#4D4D4D',
          700: '#333333',
        }
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
