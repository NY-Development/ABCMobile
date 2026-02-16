/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './components/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#ecb613',
        'primary-dark': '#d4a00f',
        'primary-content': '#1b180d',
        'background-light': '#fcfbf8',
        'background-light-alt': '#f8f8f6',
        'background-dark': '#221d10',
        'surface-light': '#ffffff',
        'surface-dark': '#2d2616',
        'text-main': '#1b180d',
        'text-muted': '#9a864c',
        'neutral-light': '#e8e6e1',
        'neutral-dark': '#3a342a',
        'primary-light': '#fdf3d0',
        'background-cream': '#FAF7F2',
        'text-charcoal': '#2C2824',
        'input-border': '#E6DCCC',
      },
      borderRadius: {
        DEFAULT: 8,
        lg: 16,
        xl: 24,
        '2xl': 32,
        '3xl': 32,
      },
    },
  },
  plugins: [],
};
