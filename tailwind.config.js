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
        warm: {
          bg: '#FBF9F6',       // 浅米色主背景
          sidebar: '#F2EFE9',  // 略深的米色侧边栏
          input: '#FFFFFF',    // 输入框纯白
          text: '#4A4238',     // 深褐色文字
          muted: '#8C847A',    // 柔和的次要文字
          accent: '#D4A373',   // 温暖的泥土橘/强调色
          border: '#E8E4DB',   // 柔和边框
          bubble: '#FFFFFF',   // AI气泡
          user: '#F2EFE9',     // User气泡
          code: '#F7F5F0',     // 代码块背景
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'Consolas', 'monospace'],
        sans: ['"Nunito"', 'system-ui', 'ui-rounded', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(74, 66, 56, 0.05)',
        'float': '0 8px 30px rgba(74, 66, 56, 0.08)',
      }
    },
  },
  plugins: [],
};
