/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        baker: {
          // Primary Palette - Modern Filipino
          'butter-yellow': '#FFE5A6',
          'butter-yellow-light': '#FFF4D6',
          'caramel-brown': '#A67C52',
          'caramel-brown-dark': '#8B6F47',
          'caramel-brown-light': '#C49A6C',
          cream: '#FFFEF7',
          'cream-dark': '#F5F5DC',
          coconut: '#FAFAF5',
          // Secondary Palette
          'ube-purple': '#6B4C7A',
          'mint-teal': '#7FB3B3',
          'mint-teal-light': '#9FC7C7',
          'mocha-butter': '#D4A574',
          'mocha-butter-light': '#E8C19A',
          // Legacy mappings for compatibility
          beige: '#FAFAF5',
          'beige-light': '#FFFEF7',
          'beige-dark': '#F5F5DC',
          gold: '#FFE5A6',
          'gold-light': '#FFF4D6',
          orange: '#D4A574',
          'orange-light': '#E8C19A',
          brown: '#A67C52',
          'brown-dark': '#8B6F47',
          'brown-light': '#C49A6C',
          teal: '#7FB3B3',
          'teal-light': '#9FC7C7',
          green: '#90EE90',
          'green-light': '#B0F5B0',
          red: '#D7263D',
          'red-dark': '#B81D24',
          yellow: '#FFE5A6',
          'yellow-light': '#FFF4D6'
        }
      },
      fontFamily: {
        'nunito': ['Nunito', 'system-ui', 'sans-serif'],
        'comic': ['Comic Neue', 'cursive'],
        'fredoka': ['Fredoka', 'sans-serif']
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'bounce-gentle': 'bounceGentle 0.6s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite'
      },
      borderWidth: {
        '3': '3px',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        bounceGentle: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-4px)' },
          '60%': { transform: 'translateY(-2px)' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' }
        }
      }
    },
  },
  plugins: [],
};