/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{html,ts}'],
  darkMode: false,
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
