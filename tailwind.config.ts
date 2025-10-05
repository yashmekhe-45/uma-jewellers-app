import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: '#B8860B',
          dark: '#1A1A1A'
        }
      }
    }
  },
  plugins: []
} satisfies Config;