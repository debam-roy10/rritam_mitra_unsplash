const { fontFamily } = require('tailwindcss/defaultTheme')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-custom)', ...fontFamily.sans],
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'dark' : '#1c1917',
      'semilight' : '#a8a29e',
      'light' : '#faf3ea',
    },
  },
  plugins: [],
}

