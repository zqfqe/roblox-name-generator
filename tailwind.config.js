/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'], // Assuming Inter is loaded, usually looks premium
        gaming: ['"Press Start 2P"', 'cursive'],
      },
      colors: {
        brand: {
          dark: '#030014', // Deep cosmic void
          primary: '#6366f1', // Indigo
          accent: '#a855f7', // Purple
          secondary: '#ec4899', // Pink
          success: '#10b981',
        }
      },
      backgroundImage: {
        'mesh-gradient': 'radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%)',
        'glass-shine': 'linear-gradient(rgba(255,255,255,0.05), rgba(255,255,255,0))',
      },
      boxShadow: {
        'glow-primary': '0 0 40px -10px rgba(99, 102, 241, 0.4)',
        'glow-accent': '0 0 40px -10px rgba(168, 85, 247, 0.4)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'blob': 'blob 7s infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
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
            a: { color: theme('colors.brand.primary') },
            blockquote: { 
              borderLeftColor: theme('colors.brand.accent'),
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