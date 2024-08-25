/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textShadow: {
        sm: "1px 1px 2px rgba(0, 0, 0, 0.5)",
        default: "2px 2px 4px rgba(0, 0, 0, 0.8)",
        lg: "3px 3px 6px rgba(0, 0, 0, 0.8)",
      },
      backgroundImage: {
        "custom-dark-gradient":
          "radial-gradient(at 100% 100%, hsla(240, 100%, 70%, 0.25) 0px, transparent 50%), radial-gradient(at 0% 0%, hsla(239, 100%, 76%, 0.25) 0px, transparent 50%)",
      },
      backgroundImageGreen: {
        "custom-dark-gradient":
          " radial-gradient(at 100% 100%, hsla(0, 100%, 70%, 0.35) 0px, transparent 50%),  radial-gradient(at 100% 100%, hsla(0, 100%, 70%, 0.35) 0px, transparent 50%)",
      },
      backgroundImageRed: {
        "custom-dark-gradient":
          "radial-gradient(at 0% 0%, hsla(120, 100%, 60%, 0.46) 0px, transparent 50%),radial-gradient(at 0% 0%, hsla(120, 100%, 60%, 0.46) 0px, transparent 50%)",
      },
      backgroundColor: {
        "black-full-opacity": "hsla(0, 0%, 0%, 1)",
      },

      fontFamily: {
        inter: ["Inter", "sans-serif"],
        libre: ["Libre Caslon Text", "serif"],
        kalam: ["Kalam", "cursive"],
        baskervville: ["Baskervville SC", "serif"],
        patrick: ["Patrick Hand SC", "cursive"],
        playfair: ["Playfair Display", "serif"],
        crimson: ["Crimson Text", "serif"],
        roboto: ["Roboto Mono", "monospace"],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".text-shadow-sm": {
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
        },
        ".text-shadow": {
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
        },
        ".text-shadow-lg": {
          textShadow: "3px 3px 6px rgba(0, 0, 0, 0.8)",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
