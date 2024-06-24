/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-delayed': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        blink: {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: '1' },
        },
        reveal: {
          '0%': { content: '""' },
          '10%': { content: '"Y"' },
          '20%': { content: '"Yo"' },
          '30%': { content: '"You"' },
          '40%': { content: '"Your"' },
          '50%': { content: '"Your "' },
          '60%': { content: '"Your u"' },
          '70%': { content: '"Your ul"' },
          '80%': { content: '"Your ult"' },
          '90%': { content: '"Your ulti"' },
          '100%': { content: '"Your ultim"' },
        },
      },
      animation: {
        'fade-in': 'fade-in 4s ease-out',
        'fade-in-delayed': 'fade-in 5s ease-out',
        'blink': 'blink 1s steps(2, start) infinite',
        'reveal': 'reveal 5s steps(12) infinite',
      },
    },
  },
  plugins: [
    daisyui,
  ],
}