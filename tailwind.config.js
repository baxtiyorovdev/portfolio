/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        jet: "var(--jet)",
        onyx: "var(--onyx)",
        eerie1: "var(--eerie-black-1)",
        eerie2: "var(--eerie-black-2)",
        smoky: "var(--smoky-black)",
        white1: "var(--white-1)",
        white2: "var(--white-2)",
        accent: "var(--orange-yellow-crayola)",
        grayLight: "var(--light-gray)",
        gray70: "var(--light-gray-70)",
      },
      boxShadow: {
        soft: "var(--shadow-1)",
        card: "var(--shadow-2)",
        deep: "var(--shadow-3)",
      },
      borderRadius: {
        xl2: "20px",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
