/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        arbutus: ['"Arbutus Slab"', 'serif'],
        bree: ['"Bree Serif"', 'serif'],
        satisfy: ['Satisfy', 'cursive'],
      },
      colors: {
        magenta: {
          dark: '#A41262',
          DEFAULT: '#e61c3f', // Updated to new red/magenta
        },
        whatsapp: {
          green: '#25D366',
        },
        brand: {
          green: '#008F24',
          'green-dark': '#005114',
        },
        // New Palette
        pepe: {
          red: '#e61c3f',
          blue: {
            dark: '#283a5b',
            light: '#1aabd4',
          },
          green: {
            light: '#65ae2d',
            dark: '#3d743e',
          },
          purple: '#8c52ff',
          white: '#ffffff',
        },
        pink: {
          primary: '#EE193F',
        }
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(5deg)' },
        },
        eat: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(5px) rotate(10deg)' },
        },
        swing: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
      animation: {
        wave: 'wave 2s infinite ease-in-out',
        eat: 'eat 0.8s infinite alternate',
        swing: 'swing 3s infinite ease-in-out',
        breathe: 'breathe 3s infinite ease-in-out',
      },
    },
  },
  plugins: [],
}

