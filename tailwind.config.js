/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.{js,ts,jsx,tsx,mdx,css}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#FFFFFF",
        foreground: "#000000",
        black: "#111111",
        primary: {
          DEFAULT: "#0070f3",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#7928CA",
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "#FF0000",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#F5F5F5",
          foreground: "#737373",
        },
        accent: {
          DEFAULT: "#FFFF00",
          foreground: "#000000",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#000000",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#000000",
        },
        // Neobrutalist color palette
        "neobrutalist-background": "#FFFAF0", // Soft cream background
        "neobrutalist-foreground": "#111111", // Almost black text
        "neobrutalist-primary": {
          DEFAULT: "#FF5D3A", // Vibrant orange
          foreground: "#FFFFFF",
        },
        "neobrutalist-secondary": {
          DEFAULT: "#FFE03D", // Bright yellow
          foreground: "#111111",
        },
        "neobrutalist-accent": {
          DEFAULT: "#4DCCBD", // Teal accent
          foreground: "#111111",
        },
        "neobrutalist-muted": {
          DEFAULT: "#F0F0F0",
          foreground: "#737373",
        },
        "neobrutalist-border": "#111111", // Black borders
        "neobrutalist-destructive": {
          DEFAULT: "#FF3333",
          foreground: "#FFFFFF",
        },
        fontFamily: {
          sans: ['"Plus Jakarta Sans"', "sans-serif"],
          handwriting: ['"Gloria Hallelujah"', "cursive"],
        },
      },
      fontSize: {
        "2xl": "1.5rem",
        "3xl": "2rem",
        "4xl": "2.5rem",
        "5xl": "3rem",
        "6xl": "3.5rem",
        "7xl": "4rem",
        "8xl": "4.5rem",
        "9xl": "5rem",
        "10xl": "5.5rem",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      borderWidth: {
        3: "3px",
      },
      boxShadow: {
        brutal: "5px 5px 0px 0px rgba(0,0,0,1)",
        "brutal-sm": "3px 3px 0px 0px rgba(0,0,0,1)",
        "brutal-lg": "8px 8px 0px 0px rgba(0,0,0,1)",
        "brutal-xl": "12px 12px 0px 0px rgba(0,0,0,1)",
        "brutal-2xl": "16px 16px 0px 0px rgba(0,0,0,1)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

