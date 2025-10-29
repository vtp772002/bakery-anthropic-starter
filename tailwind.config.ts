import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        lg: "1024px",
        xl: "1200px",
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
        serif: ["var(--font-playfair)", "ui-serif", "Georgia"],
      },
      colors: {
        bg: "var(--bg)",
        fg: "var(--fg)",
        paper: "var(--paper)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        "accent-contrast": "var(--accent-contrast)",
        border: "var(--border)",
      },
      borderRadius: {
        "2xl": "1.25rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.05)",
        cardHover: "0 10px 25px rgba(0,0,0,0.06)",
      },
      transitionTimingFunction: {
        calm: "cubic-bezier(.2,.8,.2,1)",
      },
    },
  },
  plugins: [],
};
export default config;
