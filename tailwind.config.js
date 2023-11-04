/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
    colors: {
      primary: "#0EBE5F",
      secondary: "#F8BD20",
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
