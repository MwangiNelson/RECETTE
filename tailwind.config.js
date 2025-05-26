const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const flowbite = require("flowbite-react/tailwind");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          orange: "#ff5400",
          yellow: "#ffbd00",
          green: "#008f3b",
          purple: "#4940fd",
          white: "#fff",
          red: "#d84444",
        },
      },
      
      animation: {
        typewriter: "typewriter 2s steps(11) forwards",
        animateCook: "animateCook 6s ease infinite",
        floating: "floating 14s infinite",
        gradient: "gradient 8s linear infinite",
      },
      keyframes: {
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        typewriter: {
          to: {
            left: "100%"
          }
        },
        animateCook:{
          "0%" : {
            transform: "rotate(0deg)"
          },
          "50%" : {
            transform: "rotate(15deg)"
          },
          "100%" : {
            transform: "rotate(0deg)"
          }
        },
        floating:{
          "0%" : {
            transform: "translateY(0)"
          },
          "50%" : {
            transform: "translateY(-20px)"
          },
          "100%" : {
            transform: "translateY(0)"
          }
        }
      }
    },
  },
  plugins: [
    addVariablesForColors,
    flowbite.plugin(),
  ],
}

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}