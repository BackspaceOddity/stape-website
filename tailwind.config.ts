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
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Kleos design system
        primary: "#1A2F2B",
        "primary-foreground": "#FFFFFF",
        accent: "#D4F651",
        "accent-hover": "#C5E744",
        "accent-foreground": "#1A2F2B",
        "background-secondary": "#F5F3EE",
        "background-tertiary": "#FAFAF8",
        "background-dark": "#1A2F2B",
        "background-dark-secondary": "#243D38",
        "background-dark-tertiary": "#2D4A44",
        border: "#E5E5E5",
        "border-dark": "#3D5550",
        "foreground-muted": "#7A8A87",
        "foreground-secondary": "#4A5E5A",
        success: "#00B887",
        error: "#EF4444",
        warning: "#F59E0B",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Outfit", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
        serif: ["Georgia", "serif"],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      fontSize: {
        "display": ["72px", { lineHeight: "1.1" }],
        "display-mobile": ["40px", { lineHeight: "1.1" }],
        "headline": ["48px", { lineHeight: "1.1" }],
        "subhead": ["24px", { lineHeight: "1.5" }],
        "body": ["18px", { lineHeight: "1.6" }],
        "body-sm": ["16px", { lineHeight: "1.6" }],
        "caption": ["14px", { lineHeight: "1.5" }],
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
      spacing: {
        "section": "120px",
        "section-mobile": "80px",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      boxShadow: {
        card: "0 2px 8px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};
export default config;
