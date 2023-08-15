/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        'grotesque':['Bricolage Grotesque', 'sans-serif']
      },
      backgroundImage:{
        'bamboo':"url('./src/assets/bamboo.jpg')",
        'box':"url('./src/assets/box.jpg')"
      }
    },

  },
  plugins: [],
};