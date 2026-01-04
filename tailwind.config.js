/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom branding colors based on the ForgeFit aesthetic
        lime: {
          400: '#84cc16',
          DEFAULT: '#84cc16',
        },
        zinc: {
          950: '#09090b',
        }
      },
      backgroundImage: {
        // The vivid gradient used for the background shift
        'vivid-gradient': 'linear-gradient(-45deg, #09090b, #064e3b, #1e1b4b, #09090b)',
      },
      keyframes: {
        fadeIn: {
          'from': { opacity: '0', transform: 'translateY(15px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          'from': { transform: 'scale(0.95)', opacity: '0' },
          'to': { transform: 'scale(1)', opacity: '1' },
        },
        'pulse-lime': {
          '0%': { boxShadow: '0 0 0 0 rgba(132, 204, 22, 0.7)' },
          '70%': { boxShadow: '0 0 0 15px rgba(132, 204, 22, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(132, 204, 22, 0)' },
        },
        'gradient-shift': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-lime': 'pulse-lime 2s infinite',
        'gradient-shift': 'gradient-shift 12s ease infinite',
      },
      backdropBlur: {
        '3xl': '64px',
      },
    },
  },
  plugins: [],
}