/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        black: '#000000',
        surface: {
          DEFAULT: '#080808',
          subtle: '#0c0c0c',
          panel: '#101010',
          border: '#1a1a1a',
          hover: '#161616',
        },
        silver: {
          100: '#FFFFFF',
          200: '#E6E6E6',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          glow: 'rgba(255, 255, 255, 0.15)',
        },
        verdict: {
          trusted: '#22c55e',
          uncertain: '#eab308',
          hallucinated: '#ef4444',
          inconclusive: '#71717a',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['"Barlow Condensed"', 'Anton', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tightest: '-0.06em',
      },
      boxShadow: {
        'silver-glow': '0 0 25px rgba(255, 255, 255, 0.14), 0 0 50px rgba(255, 255, 255, 0.05)',
        'silver-glow-sm': '0 0 15px rgba(255, 255, 255, 0.08)',
        'silver-pill': '0 2px 12px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
        'subtle-panel': '0 10px 30px -10px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
      },
    },
  },
  plugins: [],
}
