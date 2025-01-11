import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'pigment-green': '#4caf50',
        'neon-green': '#31c48d',
        'onyx': '#36393b',
        'snow': '#fcf7f8',
        'lake-blue': '#6c91c2',
        'neon-blue': '#3f83f8',
        'gamboge': '#f39c12',
        'midnight-blue': '#2c3e50',
        'flame-red': '#e74c3c',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
} satisfies Config;
