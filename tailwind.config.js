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
        teal: {
          950: '#042f2e',
          900: '#134e4a',
          800: '#115e59',
          700: '#0f766e',
          600: '#0d9488',
          500: '#14b8a6',
          400: '#2dd4bf',
          300: '#5eead4',
          200: '#99f6e4',
          100: '#ccfbf1',
          50: '#f0fdfa',
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
