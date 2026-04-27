import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: { red: '#C0161C', redDark: '#A51319' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        ar: ['"IBM Plex Sans Arabic"', 'system-ui', 'sans-serif'],
        display: ['Söhne', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: { none: '0', sm: '2px', DEFAULT: '4px' },
    },
  },
  plugins: [],
} satisfies Config;
