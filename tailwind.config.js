/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"Fira Code"', 'monospace'],
      },
      colors: {
        bg: '#f0f2f5',
        surface: '#ffffff',
        border: '#e2e6ed',
        primary: '#6c63ff',
        'primary-light': '#ede9ff',
        muted: '#8b95a6',
        dark: '#1a1d23',
        pendiente: '#f59e0b',
        progreso: '#3b82f6',
        completada: '#10b981',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        modal: '0 20px 60px rgba(0,0,0,0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.25s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pop': 'pop 0.2s ease-out',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(10px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        pop: { '0%': { transform: 'scale(0.95)' }, '60%': { transform: 'scale(1.02)' }, '100%': { transform: 'scale(1)' } },
      },
    },
  },
  plugins: [],
}
