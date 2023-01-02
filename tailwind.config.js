const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./components2/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
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
    },
    extend: {
      colors: {
        red: "#F52D11",
        cream: "#FBF7F2",
        white: "#FFFFFF",
        black: "#000000",
      },
      zIndex: {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        11: "11",
        12: "12",
        13: "13",
        14: "14",
        15: "15",
        16: "16",
        17: "17",
        18: "18",
        19: "19",
        21: "21",
        22: "22",
        23: "23",
        24: "24",
        25: "25",
        26: "26",
        27: "27",
        28: "28",
        29: "29",
        31: "31",
        32: "32",
        33: "33",
        34: "34",
        35: "35",
        36: "36",
        37: "37",
        38: "38",
        39: "39",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
