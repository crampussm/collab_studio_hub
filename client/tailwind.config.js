/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    
    extend: {
      colors: {
        cshgreen: '#019963',
        cshoffwhite: '#f5efe8',
        cshlightgreen: '#6aad95',
      },
      fontFamily: {
        csh: ["Cabin", "sans-serif"],
      }
    },
  },
  plugins: [],
}

