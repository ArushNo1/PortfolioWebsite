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
      typography: ({ theme }: { theme: (path: string) => string }) => ({
        terminal: {
          css: {
            '--tw-prose-body': theme('colors.terminal.white'),
            '--tw-prose-headings': theme('colors.terminal.green'),
            '--tw-prose-lead': theme('colors.terminal.green-dim'),
            '--tw-prose-links': theme('colors.terminal.amber'),
            '--tw-prose-bold': theme('colors.terminal.white'),
            '--tw-prose-counters': theme('colors.terminal.green-dim'),
            '--tw-prose-bullets': theme('colors.terminal.green-dim'),
            '--tw-prose-hr': theme('colors.terminal.border'),
            '--tw-prose-quotes': theme('colors.terminal.green-dim'),
            '--tw-prose-quote-borders': theme('colors.terminal.border'),
            '--tw-prose-captions': theme('colors.terminal.green-muted'),
            '--tw-prose-code': theme('colors.terminal.green'),
            '--tw-prose-pre-code': theme('colors.terminal.white'),
            '--tw-prose-pre-bg': theme('colors.terminal.surface'),
            '--tw-prose-th-borders': theme('colors.terminal.border'),
            '--tw-prose-td-borders': theme('colors.terminal.border-dim'),
          },
        },
      }),
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('@tailwindcss/typography'),
  ],
} satisfies Config;
