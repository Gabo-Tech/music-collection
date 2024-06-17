/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{html,ts}'],
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        primary: '#ff6347',
        secondary: '#4caf50',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
