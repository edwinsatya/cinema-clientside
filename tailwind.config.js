const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        100: "40rem",
        97: "38rem",
      },
      width: {
        97: "30rem",
      },
      maxHeight: {
        97: "30rem",
      },
      colors: {
        primary: "#0779E4",
        fullBlack: "#171717",
        sky: colors.sky,
        cyan: colors.cyan,
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(30deg)" },
        },
      },
    },
  },
  variants: {
    extend: {
      animation: ["hover", "focus"],
      width: ["responsive", "hover", "focus"],
      flex: ["hover", "focus"],
      backgroundColor: ["active"],
      borderColor: ["active"],
      textColor: ["active"],
    },
  },
  plugins: [],
};
