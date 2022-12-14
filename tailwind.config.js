const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      red: "#F52D11",
      cream: "#F3F2F3",
      white: "#FFFFFF",
      black: "#000000",
      gray: "#595959",
      gray2: "#D4D4D4",
    },
    fontSize: {
      xs: ["12px", "16px"],
      sm: ["14px", "20px"],
      base: ["17px", "32px"],
      lg: ["20px", "32px"],
      xl: ["24px", "36px"],
      "2xl": ["32px", "44px"],
      "3xl": ["48px", "56px"],
    },
    fontWeight: {
      thin: 100,
      extralight: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    fontFamily: {
      sans: ["var(--font-inter)", ...fontFamily.sans],
      serif: ["var(--font-redaction)", ...fontFamily.serif],
    },
  },
  plugins: [],
};
