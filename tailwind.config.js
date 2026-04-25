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
          bg: '#FFFFFF',       // 主背景纯白
          sidebar: '#F8F9F9',  // 侧边栏极浅灰
          input: '#FFFFFF',    // 输入框纯白
          text: '#111827',     // 深色文字
          muted: '#6B7280',    // 次要文字
          accent: '#000000',   // 强调色黑
          border: '#E5E7EB',   // 边框色
          bubble: '#FFFFFF',   // AI气泡
          user: '#F3F4F6',     // User气泡
          code: '#F9FAFB',     // 代码块背景
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'Consolas', 'monospace'],
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(0, 0, 0, 0.05)',
        'float': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'input': '0 2px 12px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
};
