/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./node_modules/flowbite/**/*.js",
    "./src/components/WebSide/**/*.{html,js}",
    "./src/pages/WebSide/Template1/**/*.{html,js}",
    "./src/pages/WebSide/Template2/**/*.{html,js}",
    "./src/pages/WebSide/Template3/**/*.{html,js}",
  ],
  theme: {
    // 斷點 
    screens: {
      'sm': '576px',
      // => @media (min-width: 576px) { ... }

      'md': '960px',
      // => @media (min-width: 960px) { ... }

      'lg': '1440px',
      // => @media (min-width: 1440px) { ... }
    },
    extend: {
      // 顏色
      colors: {
        'primary': '#F0BF1B',
        'secondary': '#595758',
        'success': '',
        'info': '#000000',
        'secInfo': '#AAAAAA',
        'headerInfo': '#000000',
        'footerInfo': '#000000',
        'warning': '',
        'error': '#EF444A',
        'light-gray': '#D9D9D9',
        'light-gray-100': '#FAF9F8',
      },
    },
    animation: {
      fadeInDown: 'fadeInDown 1s ease-in-out',
      fadeIn: 'fadeIn .5s ease'
    },
    keyframes: {
      fadeInDown: {
        '0%': { opacity: '0', transform: 'translateY(-10px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
      fadeIn: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      }
    }
  },
  // plugins: [
  //   require('flowbite/plugin')
  // ]
}

