import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
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
  plugins: [require("daisyui")],

  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#f1a400",
          secondary: "#ffc94e",
          accent: "#d97706",
          neutral: "#ff8c00",
          "base-100": "#ffffff",
          info: "#ff964f",
          success: "#77dd77",
          warning: "#fdfd96",
          error: "#ff6961",
        },
      },
    ],
    darkTheme: "dark", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
};
export default config;
