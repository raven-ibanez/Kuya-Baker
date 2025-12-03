/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        baker: {
          // Primary Palette - Modern Asian (Brighter Tones)
          'butter-yellow': '#FFE135',
          'butter-yellow-light': '#FFF4A3',
          'caramel-brown': '#C97D60',
          'caramel-brown-dark': '#B8654A',
          'caramel-brown-light': '#E09A7A',
          cream: '#FFFEF7',
          'cream-dark': '#F5F5DC',
          coconut: '#FAFAF5',
          // Secondary Palette
          'ube-purple': '#9B59B6',
          'mint-teal': '#4ECDC4',
          'mint-teal-light': '#6FE5DD',
          'mocha-butter': '#FF9F66',
          'mocha-butter-light': '#FFB88C',
          // Legacy mappings for compatibility
          beige: '#FAFAF5',
          'beige-light': '#FFFEF7',
          'beige-dark': '#F5F5DC',
          gold: '#FFE135',
          'gold-light': '#FFF4A3',
          orange: '#FF9F66',
          'orange-light': '#FFB88C',
          brown: '#C97D60',
          'brown-dark': '#B8654A',
          'brown-light': '#E09A7A',
          teal: '#4ECDC4',
          'teal-light': '#6FE5DD',
          green: '#90EE90',
          'green-light': '#B0F5B0',
          red: '#D7263D',
          'red-dark': '#B81D24',
          yellow: '#FFE135',
          'yellow-light': '#FFF4A3'
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