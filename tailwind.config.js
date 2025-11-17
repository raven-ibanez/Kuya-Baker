/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        baker: {
          beige: '#F5F0E8',
          'beige-light': '#FAF7F2',
          'beige-dark': '#E8E0D4',
          gold: '#E0A106',
          'gold-light': '#F4C430',
          orange: '#FF8C42',
          'orange-light': '#FFA366',
          brown: '#8B6F47',
          'brown-dark': '#5C4033',
          'brown-light': '#A0826D',
          teal: '#4ECDC4',
          'teal-light': '#7EDDD6',
          green: '#90EE90',
          'green-light': '#B0F5B0',
          red: '#D7263D',
          'red-dark': '#B81D24',
          yellow: '#FFD700',
          'yellow-light': '#FFE44D'
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