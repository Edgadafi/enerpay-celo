import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        latamfi: {
          dark: "#0A1628",
          darkAlt: "#1a2332",
          green: "#35D07F",
          white: "#FFFFFF",
          light: "#FBFFFE",
        },
        celo: {
          green: "#35D07F",
          dark: "#0D2818",
          light: "#FBFFFE",
        },
        primary: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#35D07F",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "tagline": ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "800" }],
        "h2": ["2.25rem", { lineHeight: "1.2", fontWeight: "600" }],
        "body": ["1.125rem", { lineHeight: "1.75", fontWeight: "400" }],
      },
    },
  },
  plugins: [],
};
export default config;

