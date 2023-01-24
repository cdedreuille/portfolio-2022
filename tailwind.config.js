const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      xxs: ["11px", "14px"],
      xs: ["12px", "16px"],
      sm: ["14px", "20px"],
      base: ["17px", "32px"],
      lg: ["20px", "32px"],
      xl: ["24px", "42px"],
      "2xl": ["32px", "52px"],
      "3xl": ["48px", "56px"],
      titleXxs: ["24px", "38px"],
      titleXs: ["32px", "38px"],
      titleXsPlus: ["40px", "56px"],
      titleSmSm: ["64px", "80px"],
      titleSm: ["88px", "120px"],
      titleLg: ["96px", "120px"],
      titleXl: ["112px", "130px"],
      title2Xl: ["124px", "140px"],
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
      sans: ["var(--font-union)", ...fontFamily.sans],
      serif: ["var(--font-romie)", ...fontFamily.serif],
      mono: ["var(--font-ibm-plex-mono)", ...fontFamily.mono],
    },
    extend: {
      colors: {
        red: "#F52D11",
        cream: "#F4F6FA",
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
