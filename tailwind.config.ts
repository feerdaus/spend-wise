import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      inter: ["var(--font-inter)", ...fontFamily.sans],
      roboto: ["var(--font-roboto)", ...fontFamily.sans],
    },
    extend: {
      colors: {
        primary: "#438883",
        "primary-50": "#EEF8F7",
        grey: "#D0D5DD",
      },
      screens: {
        sm: "640px",
        md: "900px",
        lg: "1200px",
        xl: "1440px",
      },
      maxWidth: {
        1535: "1535px",
      },
      spacing: {
        58: "58px",
      },
    },
  },
  plugins: [],
};
export default config;
