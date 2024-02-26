/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#06112C",
        secondary: "#027CC0",
        tertiary: "#004DE1",
      },
      fontFamily: {
        racingSansOne: ["Racing Sans One", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
