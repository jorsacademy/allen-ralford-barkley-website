/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          darkest: '#022593',
          darker: '#071B57',
          dark: '#07149D',
          medium: '#0918BF',
          DEFAULT: '#0A1AD1',
          light: '#0B1DE2',
          lighter: '#0D20F3',
          highlight: '#200CF2',
        },
        azure: {
          DEFAULT: '#2C6EC7',
          light: '#3E7CC8',
          lighter: '#94C9DE',
        },
        silver: {
          DEFAULT: '#C0C0C0',
          light: '#E5E5E5',
          dark: '#A9A9A9',
        },
        navy: {
          DEFAULT: '#0A1A2F',
          light: '#122C4B',
          dark: '#061018',
        },
        indigo: {
          DEFAULT: '#6366f1',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
        },
        purple: {
          DEFAULT: '#9333ea',
          500: '#8b5cf6',
          600: '#9333ea',
          700: '#7e22ce',
        },
        silver: {
          DEFAULT: '#CED4DA',
          light: '#E9ECEF',
          dark: '#ADB5BD',
        },
        white: '#FFFFFF',
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
