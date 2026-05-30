/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0A0F1E',
        'dark-secondary': '#111729',
        'cyan-accent': '#00D4FF',
        'cyan-dark': '#00A8CC',
        'danger': '#FF3B3B',
        'success': '#00FF88',
        'warning': '#FFB500',
        'text-secondary': '#8892A4',
        'text-tertiary': '#5A6270',
        'border-dark': '#1A2332',
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 212, 255, 0.3)',
        'glow-cyan-lg': '0 0 40px rgba(0, 212, 255, 0.4)',
        'glow-danger': '0 0 20px rgba(255, 59, 59, 0.3)',
        'glow-success': '0 0 20px rgba(0, 255, 136, 0.3)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backgroundColor: {
        'glass': 'rgba(255, 255, 255, 0.05)',
      },
    },
  },
  plugins: [],
}
