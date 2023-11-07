/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      zIndex: {
        lowest: -1,
        overlay: 1000,
        highest: 9999,
      },
    },
    colors: {
      primary: {
        light: "#36E588",
        DEFAULT: "#0EBE5F",
        dark: "#0B9C4E",
      },
      secondary: {
        light: "#FFE091",
        DEFAULT: "#FFCD4C",
        dark: "#FFBA34",
      },
      success: "#00C851",
      danger: "#EA4758",
      white: "#FFFFFF",
      black: "#000000",
      gray: {
        100: "#F2F2F2",
        200: "#E3E3E0",
        300: "#D9D9D9",
        400: "#ACACAC",
        500: "#868686",
        600: "#4B4B4B",
        700: "#212121",
      },
    },
  },
  plugins: [],
};
