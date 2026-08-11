/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fdf2f2",
          100: "#fce4e4",
          200: "#f8cdcd",
          300: "#f0a8a8",
          400: "#e37777",
          500: "#d14e4e",
          600: "#b83535",
          700: "#9a2a2a",
          800: "#7f2323",
          900: "#6F1D1B",
          950: "#3f100f",
        },
        gold: {
          50: "#fbf6e8",
          100: "#f5edc9",
          200: "#ecdba4",
          300: "#e1c77a",
          400: "#d6b354",
          500: "#C9A02C",
          600: "#b8942f",
          700: "#9c7a27",
          800: "#80601f",
          900: "#644617",
        },
        cream: {
          50: "#fffdf8",
          100: "#fdf8ec",
          200: "#f9efd6",
          300: "#f3e2b8",
        },
        leaf: {
          50: "#f2f7f0",
          100: "#dfece1",
          400: "#5f8d64",
          500: "#3f6b46",
          600: "#325738",
        },
        ink: {
          900: "#231916",
          950: "#160f0d",
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', "serif"],
        sans: ["Poppins", '"Inter"', "sans-serif"],
        sinhala: ['"Noto Sans Sinhala"', "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(35, 25, 22, 0.12)",
        card: "0 4px 24px -10px rgba(35, 25, 22, 0.10)",
        gold: "0 8px 30px -8px rgba(201, 160, 44, 0.35)",
      },
      backgroundImage: {
        "gradient-maroon":
          "linear-gradient(135deg, #7f2323 0%, #6F1D1B 45%, #3f100f 100%)",
        "gradient-gold":
          "linear-gradient(135deg, #e1c77a 0%, #C9A02C 50%, #9c7a27 100%)",
        "gradient-hero":
          "radial-gradient(1200px 600px at 15% -10%, rgba(201,160,44,0.25) 0%, transparent 55%), linear-gradient(160deg, #3f100f 0%, #6F1D1B 55%, #231916 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: 0, transform: "translateY(24px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        kenburns: {
          "0%": { transform: "scale(1.04) translate(0, 0)" },
          "50%": { transform: "scale(1.12) translate(-1%, -1%)" },
          "100%": { transform: "scale(1.04) translate(0, 0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out both",
        float: "float 6s ease-in-out infinite",
        kenburns: "kenburns 22s ease-in-out infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
