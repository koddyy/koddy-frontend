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
      primary: "#0EBE5F",
      secondary: "#F8BD20",
      error: "#EC5757",
      white: "#FFFFFF",
      black: "#000000",
      gray: {
        100: "#F3F3F0",
        200: "#E3E3E0",
        300: "#CACAC9",
        400: "#878787",
        500: "#4B4B4B",
        600: "#212121",
      },
    },
  },
  plugins: [],
};
