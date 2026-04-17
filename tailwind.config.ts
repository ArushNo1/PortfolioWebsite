import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        terminal: {
          bg: '#080c08',
          surface: '#0d120d',
          border: '#1a2e1a',
          'border-dim': '#0e1e0e',
          'border-bright': '#2a4e2a',
          green: '#4aff4a',
          'green-dim': '#6aaa6a',
          'green-muted': '#3a6e3a',
          amber: '#ffaa00',
          red: '#ff4444',
          white: '#c8ffc8',
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
} satisfies Config;
