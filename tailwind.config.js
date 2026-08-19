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
        "4xl": "2.5rem",
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(35, 25, 22, 0.12)",
        card: "0 4px 24px -10px rgba(35, 25, 22, 0.10)",
        gold: "0 8px 30px -8px rgba(201, 160, 44, 0.35)",
        "gold-lg": "0 16px 50px -10px rgba(201, 160, 44, 0.45)",
        "maroon": "0 8px 30px -8px rgba(111, 29, 27, 0.40)",
        "glow-gold": "0 0 0 1px rgba(201,160,44,0.2), 0 8px 32px -6px rgba(201,160,44,0.4)",
        "glow-maroon": "0 0 0 1px rgba(111,29,27,0.2), 0 8px 32px -6px rgba(111,29,27,0.4)",
        "inner-gold": "inset 0 1px 0 rgba(201,160,44,0.15)",
        "deep": "0 25px 60px -15px rgba(35,25,22,0.25), 0 8px 20px -8px rgba(35,25,22,0.10)",
        "glass": "0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)",
        "glass-dark": "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.07)",
      },
      backgroundImage: {
        "gradient-maroon":
          "linear-gradient(135deg, #7f2323 0%, #6F1D1B 45%, #3f100f 100%)",
        "gradient-gold":
          "linear-gradient(135deg, #e1c77a 0%, #C9A02C 50%, #9c7a27 100%)",
        "gradient-hero":
          "radial-gradient(1200px 600px at 15% -10%, rgba(201,160,44,0.25) 0%, transparent 55%), linear-gradient(160deg, #3f100f 0%, #6F1D1B 55%, #231916 100%)",
        "gradient-section":
          "linear-gradient(180deg, transparent 0%, rgba(201,160,44,0.03) 50%, transparent 100%)",
        "gradient-maroon-light":
          "linear-gradient(135deg, #9a2a2a 0%, #7f2323 50%, #551614 100%)",
        "mesh-warm":
          "radial-gradient(at 40% 20%, rgba(201,160,44,0.08) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(111,29,27,0.06) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(201,160,44,0.04) 0px, transparent 50%)",
        "shimmer":
          "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: 0, transform: "translateY(24px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "float-slow": {
          "0%,100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-16px) rotate(3deg)" },
        },
        kenburns: {
          "0%": { transform: "scale(1.04) translate(0, 0)" },
          "50%": { transform: "scale(1.12) translate(-1%, -1%)" },
          "100%": { transform: "scale(1.04) translate(0, 0)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 8px rgba(201,160,44,0.25)" },
          "50%": { boxShadow: "0 0 24px rgba(201,160,44,0.55), 0 0 48px rgba(201,160,44,0.20)" },
        },
        "slide-down": {
          "0%": { opacity: 0, transform: "translateY(-12px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: 0, transform: "scale(0.92)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "particle-float": {
          "0%, 100%": { transform: "translateY(0) translateX(0) scale(1)", opacity: 0.6 },
          "33%": { transform: "translateY(-20px) translateX(10px) scale(1.1)", opacity: 1 },
          "66%": { transform: "translateY(-10px) translateX(-8px) scale(0.9)", opacity: 0.8 },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out both",
        "fade-in": "fade-in 0.5s ease-out both",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 9s ease-in-out infinite",
        kenburns: "kenburns 22s ease-in-out infinite",
        shimmer: "shimmer 1.8s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "slide-down": "slide-down 0.25s ease-out both",
        "scale-in": "scale-in 0.2s ease-out both",
        "spin-slow": "spin-slow 20s linear infinite",
        "particle-float": "particle-float 8s ease-in-out infinite",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
