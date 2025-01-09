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
        'cloud-gray': '#bdc3c7',
        'flame-red': '#e74c3c',
        'ash-gray': '#95a5a6',
        'charcoal-gray': '#34495e',
        'about-text': '#f2f3f4',
        'projects-bg': '#e3f2fd',
        'contact-bg': '#fafafa',
        'about-bg': '#34495e',
        'projects-text': '#2c3e50',
        'contact-text': '#7f8c8d',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
} satisfies Config;
