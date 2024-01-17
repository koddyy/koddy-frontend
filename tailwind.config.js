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
        dropdown: 1000,
        header: 1100,
        dimmed: 1100,
        overlay: 1200,
        tooltip: 1300,
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
      transparent: "transparent",
      accent: "var(--accent)",
      "accent-dark": "var(--accent-dark)",
      "accent-light": "var(--accent-light)",
    },
    backgroundImage: {
      "dimmed-gradient":
        "linear-gradient(180deg, rgba(0, 0, 0, 0.34) 0%, rgba(0, 0, 0, 0.00) 100%)",
      "primary-gradient": "linear-gradient(155deg, #0EB05C 32.22%, #FFD15C 124.26%)",
    },
  },
  plugins: [],
};
