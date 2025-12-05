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
      },
      colors: {
        magenta: {
          dark: '#A41262',
        },
        whatsapp: {
          green: '#25D366',
        },
        brand: {
          green: '#008F24',
          'green-dark': '#005114',
        },
        pink: {
          primary: '#EE193F',
        }
      },
    },
  },
  plugins: [],
}

