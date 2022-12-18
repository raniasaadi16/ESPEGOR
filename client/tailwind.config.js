/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        "egor-red": "#9A1920",
        "egor-primary": {
          100: "#B39DCA",
          200: "#79559F",
          300: "#382A47",
          400: "#282130",
          500: "#251E2C"
        }
      }
    },
  },
  plugins: [],
}
