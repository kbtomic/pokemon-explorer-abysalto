import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        pokemon: {
          red: '#FF6B6B',
          blue: '#4ECDC4',
          green: '#45B7D1',
          yellow: '#FFE66D',
          purple: '#A8E6CF',
        },
      },
    },
  },
  plugins: [],
};

export default config;
