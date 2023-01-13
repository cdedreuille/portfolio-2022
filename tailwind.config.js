const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "!./node_modules", // 👈 https://stackoverflow.com/questions/74457600/tailwind-requires-refresh-to-apply-changes-in-next-js-13
  ],
  theme: {
    fontSize: {
      xs: ["12px", "16px"],
      sm: ["14px", "20px"],
      base: ["17px", "32px"],
      lg: ["20px", "32px"],
      xl: ["24px", "42px"],
      "2xl": ["32px", "52px"],
      "3xl": ["48px", "56px"],
      titleSm: ["80px", "96px"],
      titleLg: ["118px", "142px"],
      titleXl: ["132px", "154px"],
      title2Xl: ["148px", "180px"],
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
      serif: ["var(--font-romie)", ...fontFamily.serif],
      mono: ["var(--font-redaction)", ...fontFamily.mono],
    },
    extend: {
      colors: {
        red: "#F52D11",
        cream: "#FBF7F2",
        white: "#FFFFFF",
        black: "#000000",
        footer: "#222222",
      },
      screens: {
        "3xl": "1920px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
