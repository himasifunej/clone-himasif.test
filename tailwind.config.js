/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./node_modules/flowbite/**/*.{js,ts}"
  ],
  theme: {
    extend: {
      spacing: {
        '4.5': '18px'
      },
      fontSize: {
        button: ['18px', {
          lineHeight: '24px',
          fontWeight: '500',
        }],
          'title-1': ['40px', {
            lineHeight: '48px',
            fontWeight: '700'
          }],
          'title-2': ['32px', {
            lineHeight: '48px',
            fontWeight: '700'
          }],
          'title-3': ['20px', {
            lineHeight: 'normal',
            fontWeight: '600'
          }],
          'title-4': ['18px', {
            lineHeight: 'normal',
            fontWeight: '500'
          }],
      },
      colors: {
        'primary': {
          100: '#F8F8F8',
          200: '#E9E9E9',
          400: '#CECECE',
          600: '#868686',
          700: '#494949',
          800: '#333333',
          900: '#1A1A1A',
          950: '#151515',
          1000: '#0A0A0A'
        },
        'secondary': '#868686',
        'psdm': '#64B5F6',
        'kaderisasi': '#9D78BC',
        'litbang': '#FDD734',
        'humas': '#A5A5A5',
        'mediatek': '#FF6D00'
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}

