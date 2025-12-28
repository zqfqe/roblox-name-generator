/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        gaming: ['"Press Start 2P"', 'cursive'],
      },
      colors: {
        roblox: {
          dark: '#020202', // True black base
          card: '#0A0A0A', // Slightly lighter for cards
          accent: '#00FFA3', // High-voltage neon green
          secondary: '#7000FF', // Deep electric purple
          surface: '#121212',
        }
      },
      backgroundImage: {
        'void-gradient': 'radial-gradient(circle at 50% 0%, #111827 0%, #020202 70%)',
        'aurora-glow': 'conic-gradient(from 180deg at 50% 50%, #00FFA3 0deg, #7000FF 180deg, #00FFA3 360deg)',
      },
      boxShadow: {
        'neon': '0 0 20px rgba(0, 255, 163, 0.15)',
        'neon-hover': '0 0 40px rgba(0, 255, 163, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.400'),
            h1: { color: theme('colors.white') },
            h2: { color: theme('colors.white') },
            h3: { color: theme('colors.white') },
            strong: { color: theme('colors.white') },
            a: { color: theme('colors.roblox.accent') },
            blockquote: { 
              borderLeftColor: theme('colors.roblox.accent'),
              color: theme('colors.gray.300'),
              backgroundColor: 'rgba(255,255,255,0.02)'
            }
          },
        },
      }),
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}