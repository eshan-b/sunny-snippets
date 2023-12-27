import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        "peach-orange": "#f1a400",
        "pale-orange": "ffffdd",
        "dark-orange1": "#d97706",
        "dark-orange2": "#d17000",
        "dark-orange3": "#c16903",
      },
      backgroundColor: {
        "peach-orange": "#f1a400",
        "pale-orange": "ffffdd",
      },
      spacing: {
        "1rem": "1rem",
        "2rem": "2rem",
        "3rem": "3rem",
        "4rem": "4rem",
        "5rem": "5rem",
      },
    },
  },

  plugins: [nextui()],

  darkMode: "class",
};
export default config;
