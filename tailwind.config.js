/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'light-blue': '#1E213A',
      'dark-blue': '#100E1D',
      'white': '#E7E7EB',
      'light-gray': '#A09FB1',
      'dark-gray': '#6E707A',
      'yellow': '#FFEC65',
      'input': '#616475',
      'button': '#3C47E9'
    },
    extend: {
      screens: {
        'md': '944px'
      }
    },
  },
  plugins: [],
}
