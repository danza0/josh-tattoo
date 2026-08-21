import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // Portfolio tile shapes come from data (defaults + Sanity), so these classes
  // never appear literally in the source for Tailwind's JIT to find. Without
  // this safelist they aren't generated and the tiles collapse to height 0.
  safelist: [
    "aspect-square",
    "aspect-[3/4]",
    "aspect-[4/5]",
    "aspect-[2/3]",
  ],
  theme: {
    extend: {
      colors: {
        // Design system colors
        "bg-light": "#f5f2ee",   // warm cream
        "bg-dark": "#111111",    // near black
        "bg-stone": "#e8e4e0",   // hero/statue section
        "text-primary": "#111111",
        "text-light": "#f5f2ee",
        "text-muted": "#666666",
        accent: "#c9a96e",       // subtle gold
      },
      fontFamily: {
        headline: ["'Arial Black'", "'Helvetica Neue'", "sans-serif"],
        body: ["'Inter'", "'Helvetica Neue'", "sans-serif"],
        serif: ["'Georgia'", "'Times New Roman'", "serif"],
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "marquee-reverse": "marquee-reverse 30s linear infinite",
        "bounce-slow": "bounce 2s infinite",
        "fade-in": "fadeIn 1s ease forwards",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
