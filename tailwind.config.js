/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      keyframes: {
        'zoom-in': {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'pop': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.15)' },
          '100%': { transform: 'scale(0)', opacity: '0' },
        }
      },
      animation: {
        'zoom-in': 'zoom-in 0.2s ease-out forwards',
        'pop': 'pop 0.3s ease-out forwards',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
};
