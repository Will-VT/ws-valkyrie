import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'valkyrie': {
          'charcoal': '#2C3639',
          'sage': '#3F4E4F',
          'cream': '#F9F7F7',
          'stone': '#F5EFE6',
          'warm-grey': '#7D7C7C',
          'terracotta': '#A27B5C',
          'navy': '#2C3639',
        },
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config 