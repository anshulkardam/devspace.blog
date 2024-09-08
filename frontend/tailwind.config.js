/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: '#745e59',
      },
      fontFamily: {
        nunito: ['Nunito Sans', 'sans-serif'],
        
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

