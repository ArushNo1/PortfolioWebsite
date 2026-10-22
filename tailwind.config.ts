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
          bg: '#0a0f0a',
          surface: '#0d140d',
          border: '#1f3320',
          'border-dim': '#14221a',
          'border-bright': '#3d5c3d',
          green: '#5cf55c',
          'green-dim': '#9dbf97',
          'green-muted': '#6f8f6a',
          amber: '#ffb42e',
          red: '#ff6b5e',
          white: '#dcebd8',
          bright: '#f1f8ef',
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
