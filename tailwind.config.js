/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#0B57D0',
          'blue-dark': '#0842A0',
          'blue-light': '#E8F0FE',
          alert: '#FF3B30',
          'alert-dark': '#D32F2F',
          'alert-light': '#FEECEB',
          amber: '#F59E0B',
          'amber-light': '#FEF3C7',
          success: '#10B981',
          'success-light': '#D1FAE5',
          navy: '#0F172A',
          surface: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0',
        }
      },
      borderRadius: {
        'card': '16px',
        '2card': '20px',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(11, 87, 208, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'elevated': '0 12px 32px -4px rgba(15, 23, 42, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.06)',
        'alert': '0 4px 20px -2px rgba(255, 59, 48, 0.25)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      keyframes: {
        pulseUrgent: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.88', transform: 'scale(1.02)' },
        },
        wave: {
          '0%, 100%': { transform: 'scaleY(0.4)' },
          '50%': { transform: 'scaleY(1)' },
        }
      },
      animation: {
        'urgent': 'pulseUrgent 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'wave': 'wave 1s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
