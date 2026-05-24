/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#060e1c',
          900: '#0a1628',
          800: '#0f2244',
          700: '#1a3460',
          600: '#1e3a5f',
          500: '#2a4a70',
        },
        silver: {
          100: '#e8ecf3',
          200: '#b8c4d8',
          300: '#8090a8',
          400: '#4a5a70',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
