/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        codex: {
          bg: '#0d1117',
          sidebar: '#161b22',
          input: '#21262d',
          text: '#c9d1d9',
          accent: '#58a6ff',
          code: '#1e1e1e',
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
