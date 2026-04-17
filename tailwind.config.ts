import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#F97316",
          50:  "#FFF7ED",
          100: "#FFEDD5",
          200: "#FED7AA",
          500: "#F97316",
          600: "#EA6C0A",
          700: "#C2570A",
        },
        sidebar: {
          bg: "#1E1E2E",
          hover: "#2A2A3E",
          active: "#2F2F45",
          text: "#A0A0C0",
          heading: "#5A5A7A",
        },
        surface: {
          base: "#F8F9FA",
          card: "#FFFFFF",
          elevated: "#FFFFFF",
        },
        status: {
          booked:    "#16A34A",
          nurture:   "#2563EB",
          followup:  "#D97706",
          lost:      "#DC2626",
          new:       "#6B7280",
          unclaimed: "#9333EA",
        }
      },
      fontFamily: {
        display: ["'Plus Jakarta Sans'", "sans-serif"],
        body:    ["'Inter'", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
        "card-hover": "0 4px 12px rgba(0,0,0,0.10), 0 8px 32px rgba(0,0,0,0.06)",
        modal: "0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)",
      }
    },
  },
  plugins: [],
};

export default config;
