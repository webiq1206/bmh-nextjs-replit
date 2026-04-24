import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // BMH brand color tokens — match the CSS custom properties in globals.css
      colors: {
        bmh: {
          green: "#3d564a",
          "green-dark": "#2c4039",
          red: "#d63637",
          "red-dark": "#b82d2e",
          blue: "#066aab",
          dark: "#32373c",
          gray: "#6b7280",
          "bg-light": "#f9fbfc",
          border: "#e5e7eb",
        },
      },
      fontFamily: {
        // Inter as base sans-serif (loaded via next/font in layout.tsx)
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
