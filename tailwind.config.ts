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
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-plex-mono)', 'ui-monospace', 'monospace'],
      },
      colors: {
        terminal: {
          bg: '#0e1110',
          surface: '#131716',
          border: '#222826',
          'border-dim': '#1a1f1d',
          'border-bright': '#3a423f',
          green: '#7ee787',
          'green-dim': '#a3aba7',
          'green-muted': '#7d8682',
          amber: '#e3b341',
          red: '#ff6b5e',
          white: '#e6eae7',
          bright: '#f5f7f6',
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
